require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

app.post('/send-email', (req, res) => {
	const { fullName, email_id, subject, message } = req.body;

	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL_USER, 
			pass: process.env.EMAIL_PASS
		},
	});

	let mailOptions = {
		from: email_id,
		to: 'annisanye99@gmail.com',
		subject: subject,
		text: `Name: ${fullName}\nEmail: ${email_id}\n\nMessage:\n${message}`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
			res.status(500).send('Error sending email');
		} else {
			console.log('Email sent: ' + info.response);
			res.status(200).send('Email sent successfully');
		}
	});
});

app.listen(port, () => console.log(`Server running on port ${port}`));
