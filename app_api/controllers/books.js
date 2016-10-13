var mongoose = require('mongoose').set('debug', true);
var Book = mongoose.model('Book');

var sendJSONresponse = function (res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.booksList = function (req, res) {
	Book
		.find()
		.exec(function(err, books) {
			if (!books) {
          		sendJSONresponse(res, 404, {
            		"message": req.params.bookid  + " not found"
          		});
          		return;
        	} else if (err) {
          		console.log(err);
          		sendJSONresponse(res, 404, err);
          		return;
        	}
        	console.log(books);
        	sendJSONresponse(res, 200, books);
      	});
};

module.exports.booksCreate = function (req, res) {
	Book.create({
		title: req.body.title
	}, function (err, book) {
		if (err) {
			console.log(err);
			sendJSONresponse(res, 400, err);
		} else {
			res.redirect('/');
		}
	});
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

module.exports.booksDeleteOne = function(req, res) {
  var bookid = req.params.bookid;
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
};