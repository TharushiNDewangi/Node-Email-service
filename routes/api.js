const express = require("express");

const router = express.Router();

const nodemailer = require("nodemailer"); // import nodemailer module for send  emails

// create the endpoint(URL) for send emails for send alert messages when sensor levels up

router.post("/sendEmail", async (req, res, next) => {
	const receiverEmail = req.body.receiverEmail; // get the reciver email address from body of the  request
	const senderMail = "edexonlineconferencemanagement@gmail.com"; // set emailmaddress of sender
	const password = "asdqwe@123"; // set password of sender

	/*
    before send emails using node/express app need to allow low security features in google account
    allow less secure feature on in google
    link - https://myaccount.google.com/lesssecureapps
*/

	try {
		/*
       create reusable transporter object using the default SMTP transport
      */
		let transporter = nodemailer.createTransport({
			service: "gmail", // use gmail as the email service
			port: 25, // port number
			secure: false, // true for 465, false for other ports
			auth: {
				// autnetication details
				user: senderMail,
				pass: password,
			},
			tls: {
				rejectUnauthorized: false,
			},
		});
//our pass details
		let HelperOptions = {
			from: senderMail, // sender address
			to: receiverEmail, // list of receivers
			subject: "Your salary pass your account", // Subject line
			text: "", // plain text body
			html: ` 
				  <h3>This is an automatically generated email, please do not reply </h3>
				  <li>Your salary pass your account check </li>
				  <li>status: Successuly  </li>
				  <li>amount: ${amount}</li>
				  <li>amount: ${month}</li>
				  <li>amount: ${year}</li>
				  
				  <h3>Best regards,</h3>
				  <p>Sipni Higher Education center</p>`,
		};

		// HTML version of the message

		transporter.sendMail(HelperOptions, (error, info) => {
			// send mail with defined transport object
			if (error) {
				return console.log(error);
			}

			console.log("The message was sent!");

			console.log(info);

			res.json(info); // send the json response
		});
	} catch (e) {
		console.log(e);
	}
});

module.exports = router;
