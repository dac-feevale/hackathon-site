GLOBAL.config = {
	app: {
		port: (process.env.PORT || 3000)
	},
	mongo: {
		url: (process.env.MONGO_URL || "mongodb://localhost:27017/hackathon")
	}
};

module.exports = config;