var config = require("./config.js");

var mongo = require("mongodb").MongoClient;

module.exports = {
	do: function(callback) {
		//check connection
		mongo.connect(config.mongo.url, function(err, db) {
			if (err) {
				console.log("Erro ao conectar ao servidor do mongo: " + config.mongo.url);
				console.dir(err);
				return;
			}

			if (typeof(callback) == "function") {
				callback(err, db);
			}
		});
	}
};