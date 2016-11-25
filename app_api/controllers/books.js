var mongoose = require('mongoose').set('debug', true);
var Book = mongoose.model('Book');
var requ = require('request');
var parseString = require('xml2js').parseString;

var sendJSONresponse = function (res, status, content) {
	res.status(status);
	res.json(content);
};

// validate that user exists
var User = mongoose.model('User');
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
        callback(req, res);
      });
  } else {
      sendJSONresponse(res, 404, {
      'message': 'User not found'
    });
  }
};

module.exports.booksList = function (req, res) {
  getAccount(req, res, function (req, res) {
    Book
    .find()
    .exec(function(err, books) {
      if (!books) {
        sendJSONresponse(res, 404, {
          "message": "Books not found"
        });
        return;
      } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
      }
      sendJSONresponse(res, 200, books);
    });
  });
};

module.exports.booksCreate = function (req, res) {
  getAccount(req, res, function (req, res) {
    requ.get('https://www.goodreads.com/search/index.xml?key=S2DDCAJNNZgPUhQwkjCA&q=' + req.body.title,
      function (error, body) {
      //error handling goes here!
      parseString(body.body, function (err, result) {
        //error handling goes here, too!
        var author = result.GoodreadsResponse.search[0].results[0].work[0].best_book[0].author[0].name[0];

        //write book to DB
        Book.create({
          title: req.body.title,
          author: author
        }, function (err, book) {
          if (err) {
            sendJSONresponse(res, 400, err);
          } else {
            sendJSONresponse(res, 201, book);
          }
        });
      });
    });
  });
};

module.exports.booksDeleteOne = function(req, res) {
  getAccount(req, res, function (req, res) {
    var bookid = req.body.id;
    if (bookid) {
      Book
        .findByIdAndRemove(bookid)
        .exec(
          function(err, book) {
            if (err) {
              console.log(err);
              sendJSONresponse(res, 404, err);
              return;
            }
            console.log("book id " + bookid + " deleted");
            sendJSONresponse(res, 204, null);
          }
      );
    } else {
      sendJSONresponse(res, 404, {
        "message": "No bookid"
      });
    }
  });
};

module.exports.booksUpdateOne = function(req, res) {
  if (!req.params.bookid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, bookid is required"
    });
    return;
  }
  Book
    .findById(req.params.bookid)
    .exec(
      function(err, book) {
        if (!book) {
          sendJSONresponse(res, 404, {
            "message": "bookid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        book.title = req.body.title;
        book.save(function(err, book) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, book);
          }
        });
      }
  );
};

module.exports.booksReadOne = function(req, res) {
  console.log('Finding book details', req.params);
  if (req.params && req.params.bookid) {
    Book
      .findById(req.params.bookid)
      .exec(function(err, book) {
        if (!book) {
          sendJSONresponse(res, 404, {
            "message": req.params.bookid  + " not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(book);
        sendJSONresponse(res, 200, book);
      });
  } else {
    console.log('No bookid specified');
    sendJSONresponse(res, 404, {
      "message": "No bookid in request"
    });
  }
};