var nodemailer = require("nodemailer");

module.exports = {
	send: function(sendOptions, callback) {
		var smtpTransport = nodemailer.createTransport("SMTP", config.mail);
		smtpTransport.sendMail(sendOptions, function(error, response) {
			if (error) {
				throw error;
			} else {
				console.log("Email enviado: " + response.message);
			}
		});
	}
};