import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2(
	process.env.CLIENT_ID,
	process.env.CLIENT_SECRET,
	process.env.REDIRECT_URI
);

console.log("Start ");

const rToken = process.env.REFRESH_TOKEN;


oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const sendEmail = async (to, subject, text) => {

	try {
		console.log("Try function : ");
		const accessToken = await oAuth2Client.getAccessToken();

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: process.env.EMAIL_USER,
				clientId: process.env.CLIENT_ID,
				clientSecret: process.env.CLIENT_SECRET,
				refreshToken: process.env.REFRESH_TOKEN,
				accessToken: accessToken.token,
			},
		});

		const mailOptions = {
			from: process.env.EMAIL_USER,
			to,
			subject,
			text,
		};

		const info = await transporter.sendMail(mailOptions);
		console.log('Email sent:', info.response);
	} catch (error) {
		console.error('Error sending email:', error);
	}
};

export default sendEmail;
