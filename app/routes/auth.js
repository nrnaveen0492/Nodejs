var express = require('express');
var index = require('../controllers/index');
var router = express.Router();

// GET home page
router.get('/', function(req, res, next) {
	res.send("auth");
});
module.exports = router;