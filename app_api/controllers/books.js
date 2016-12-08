var mongoose = require('mongoose').set('debug', true);
var Book = mongoose.model('Book');
var User = mongoose.model('User');
var requ = require('request');
var parseString = require('xml2js').parseString;

var sendJSONresponse = function (res, status, content) {
	res.status(status);
	res.json(content);
};

var toProperCase = function (name) {
  var words = name.split(' ');
  var results = [];
  for (var i=0; i < words.length; i++) {
      var letter = words[i].charAt(0).toUpperCase();
      results.push(letter + words[i].slice(1));
  }
  return name = results.join(' ');
}

//  validate that user exists & get email
var getAccount = function (req, res, callback) {
  if (req.payload.email) {
    User
      .findOne({ email: req.payload.email })
      .exec(function (err, user) {
        if (!user) {
          sendJSONresponse(res, 404, {
            'message': 'User not found'
          });
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        callback(req, res, user);
      });
  } else {
      sendJSONresponse(res, 404, {
      'message': 'User not found'
    });
  }
};

module.exports.booksList = function (req, res) {
  getAccount(req, res, function (req, res, user) {
    if (!user.bookshelf) {
      sendJSONresponse(res, 404, {
        "message": "Books not found"
      });
      return;
    }
    sendJSONresponse(res, 200, user.bookshelf);
  });
};

module.exports.booksCreateOne = function (req, res) {
  getAccount(req, res, function (req, res, user) {
    requ.get('https://www.goodreads.com/search/index.xml?key=S2DDCAJNNZgPUhQwkjCA&q=' + req.body.title,
    function (error, body) {
      if (error) { sendJSONresponse(res, 400, error); return; }
      // parse obtained XML
      parseString(body.body, function (error, result) {
        if (error) { sendJSONresponse(res, 400, error); return; }
        if (result.GoodreadsResponse.search[0]['total-results'][0] == 0) {
          sendJSONresponse(res, 400, {
            "message": "Book not found"
          });
          return;
        }
        var best_auth = result.GoodreadsResponse.search[0].results[0].work[0].best_book[0].author[0].name[0];
        var work_list = result.GoodreadsResponse.search[0].results[0].work;
        // if an author was precised and isn't the first one returned by API
        if (req.body.author && toProperCase(req.body.author) !== best_auth) {
          // look for requested author inside obtained results
          var author = toProperCase(req.body.author);
          for (var auth in work_list) {
            if (work_list[auth].best_book[0].author[0].name[0] === author) {
              var cover = work_list[auth].best_book[0].image_url[0];
              var rating = work_list[auth].average_rating[0];
              var title = work_list[auth].best_book[0].title[0];
              // look for a parenthesis in title and cut it out
              title = title.split('(')[0];
              console.log(title);
              // get description for the right book
              requ.get('https://www.goodreads.com/book/title.xml?author=' + author + '&key=S2DDCAJNNZgPUhQwkjCA&title=' + title, 
              function (error, body) {
                if (error) { sendJSONresponse(res, 400, error); return; }
                // parse obtained XML
                parseString(body.body, function (error, result) {
                  if (error) { sendJSONresponse(res, 400, error); return; }
                  else {
                    var description = result.GoodreadsResponse.book[0].description[0];
                    // add new book to bookshelf
                    user.bookshelf.push({
                      title: title,
                      author: author,
                      cover: cover,
                      rating: rating,
                      description: description
                    });
                    // update user in DB
                    user.save(function (err, updatedUser) {
                      if (err) {
                        sendJSONresponse(res, 400, err);
                      } else {
                        sendJSONresponse(res, 201, updatedUser.bookshelf);
                      }
                    });
                  }
                });
              });
              return;
            }
          }
          sendJSONresponse(res, 400, {
            "message": "Book not found for this author"
          });
          return;
        }
        // if no author was precised
        var parsedResult = result.GoodreadsResponse.search[0].results[0].work[0];
        var author = parsedResult.best_book[0].author[0].name[0];
        var cover = parsedResult.best_book[0].image_url[0];
        var rating = parsedResult.average_rating[0];
        var title = parsedResult.best_book[0].title[0];
        // look for a parenthesis in title and cut it out
        title = title.split('(')[0];
        console.log(title);
        // 2nd request, for the book description
        requ.get('https://www.goodreads.com/book/title.xml?author=' + author + '&key=S2DDCAJNNZgPUhQwkjCA&title=' + title, 
        function (error, body) {
          if (error) { sendJSONresponse(res, 400, error); return; }
          // parse obtained XML
          parseString(body.body, function (error, result) {
            if (error) { sendJSONresponse(res, 400, error); return; }
            else {
              var description = 'No description available.';
              if(result.GoodreadsResponse && result.GoodreadsResponse.book[0].description[0].length > 3) {
                var description = result.GoodreadsResponse.book[0].description[0];
              }
              // add new book to bookshelf
              user.bookshelf.push({
                title: title,
                author: author,
                cover: cover,
                rating: rating,
                description: description
              });
              // update user in DB
              user.save(function (err, updatedUser) {
                if (err) {
                  sendJSONresponse(res, 400, err);
                } else {
                  sendJSONresponse(res, 201, updatedUser.bookshelf);
                }
              });
            }
          });
        });

      });
    });
  });
};

module.exports.booksDeleteOne = function(req, res) {
  getAccount(req, res, function (req, res, user) {
    var i = 0;
    user.bookshelf.forEach(function(book) {
      if (book.title === req.body.bookToDelete) {
        // delete book from shelf
        user.bookshelf.splice(i, 1);
      }
      i++;
    });
    // update user in DB
    user.save(function (err, updatedUser) {
      if (err) {
        sendJSONresponse(res, 400, err);
      } else {
        sendJSONresponse(res, 200, updatedUser.bookshelf);
      }
    });
  });
};

module.exports.booksUpdateBookshelf = function(req, res) {
  getAccount(req, res, function (req, res, user) {
    user.bookshelf = req.body.updatedBookshelf;
    // update user in DB
    user.save(function (err) {
      if (err) {
        sendJSONresponse(res, 400, err);
      } else {
        sendJSONresponse(res, 200, null);
      }
    });
  });
};