var express = require('express');
var router = express.Router();
var database = require(__dirname + "/../database.js");

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Teste' });
});

router.get("/pudim", function(req, res) {
	database.do(function(err, db) {
		var registers = db.collection("registers");

		registers.find().toArray(function(error, result) {
			res.render("teste", {title: "blabla", registers: result});
		});
	});
});

module.exports = router;
