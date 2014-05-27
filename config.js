GLOBAL.config = {
	app: {
		port: (process.env.PORT || 3000)
	},
	mongo: {
		url: (process.env.MONGO_URL || "mongodb://localhost:27017/hackathon")
	},
	mail: {
		service: (process.env.MAIL_SERVICE || "Gmail"),
		auth: {
			user: (process.env.MAIL_USER || "user@gmail.com"),
			pass: (process.env.MAIL_PASSWORD || "")
		}
	},
	bank: {
		name: (process.env.BANK_NAME|| "Banco"),
		agency: (process.env.BANK_AGENCY || "Agência"),
		account: (process.env.BANK_ACCOUNT || "Conta")
	},
	analytics: {
		id: (process.env.ANALYTICS_ID || null),
		site: (process.env.ANALYTICS_SITE || null)
	}
};

module.exports = config;