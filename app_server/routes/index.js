var express = require('express');
var router = express.Router();
var ctrlOthers = require('../controllers/others')

/* GET home page. */
router.get('/', ctrlOthers.nextreadApp);

module.exports = router;
