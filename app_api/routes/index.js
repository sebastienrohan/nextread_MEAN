var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});
var ctrlBooks = require('../controllers/books');
var ctrlAuth = require('../controllers/authentication');

router.get('/books', auth, ctrlBooks.booksList);
router.post('/books', auth, ctrlBooks.booksCreateOne);
router.post('/bookshelf', auth, ctrlBooks.booksUpdateBookshelf);
router.delete('/books', auth, ctrlBooks.booksDeleteOne);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
