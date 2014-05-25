var config = require("./config.js");

var mongo = require("mongodb").MongoClient;

module.exports = {
	_mongoConnection: null,
	do: function(callback) {
		if (!this._mongoConnection) {
			var self = this;
			mongo.connect(config.mongo.url, function(err, db) {
				if (err) {
					console.log("Erro ao conectar ao servidor do mongo: " + config.mongo.url);
					console.dir(err);
					return;
				}

				self._mongoConnection = db;

				if (typeof(callback) == "function") {
					callback(err, db);
				}
			});
		} else {
			if (typeof(callback) == "function") {
				callback(null, this._mongoConnection);
			}
		}
	}
};