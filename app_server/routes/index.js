var express = require('express');
var router = express.Router();
var ctrlBooks = require('../controllers/books');

/* GET home page. */
router.get('/', ctrlBooks.list);

module.exports = router;
