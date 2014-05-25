var express = require('express');
var router = express.Router();
var validator = require("validator");
var database = require(__dirname + "/../database.js");

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Teste' });
});

router.post("/register/add", function(req, res) {
	//!req.xhr || 
	if (!req.body || typeof(req.body) != "object") {
		console.log("pudim");
		next(); //404 not found
		return;
	}

	var register = req.body;
	console.log(register);

	var mandatoryFields = ["name", "cpf", "bornDate", "rg", "feevaleCode", "course", "email", "phone"];
	for (var i in mandatoryFields) {
		var field = mandatoryFields[i];

		if (typeof(register[field]) != "string" || register[field].trim().length == 0) {
			res.send("200", {success: false, message: field + " is mandatory"});
			return;
		}
	}

	if (!validator.isEmail(register.email)) {
		res.send("200", {success: false, message: "Email inválido."});
		return;
	}

	register.phone = register.phone.replace(new RegExp("[^0-9]", "g"), "");
	if (register.phone.length < 10) {
		res.send("200", {success: false, message: "Telefone inválido."});
		return;	
	}

	database.do(function(err, db) {
		db.collection("registers").insert(register, function(err) {
			if (err) {
				throw err;
			}

			res.send("200", {success: true})
		});
	});
});

module.exports = router;
