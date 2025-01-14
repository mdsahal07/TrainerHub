import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import Client from '../models/Client.js';
import Trainer from '../models/Trainer.js';

//Registering a new user
export const register = async (req, res) => {
	const { fname, username, email, password, role } = req.body;

	const [existingUserByUsernameClient, existingUserByUsernameTrainer] = await Promise.all([
		Client.findOne({ username }),
		Trainer.findOne({ username })
	]);

	const [existingUserByEmailClient, existingUserByEmailTrainer] = await Promise.all([
		Client.findOne({ email }),
		Trainer.findOne({ email })
	]);

	if (existingUserByUsernameClient || existingUserByUsernameTrainer) {
		return res.status(400).json({ message: "Username is already taken" });
	}

	if (existingUserByEmailClient || existingUserByEmailTrainer) {
		return res.status(400).json({ message: "This email is already taken" });
	}

	const hashPassword = await bcrypt.hash(password, 10);
	let newUser;
	if (role === 'trainer') {
		newUser = new Trainer({ fname, username, email, password: hashPassword });
	} else {
		newUser = new Client({ fname, username, email, password: hashPassword })
	}
	await newUser.save();
	res.status(201).json({ message: "User registered successfully" });
}
//Login an existing user
export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const [client, trainer] = await Promise.all([
			Client.findOne({ email }),
			Trainer.findOne({ email })
		]);

		const user = client || trainer;

		if (!user) return res.status(400).json({ message: "User not found" });

		const role = client ? "client" : "trainer";
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) return res.status(400).json({ message: "Incorrect password" });

		const token = jwt.sign({ userId: user._id, role }, process.env.JWT_TOKEN, { expiresIn: "7d" });

		let redirectURL;
		switch (role) {
			case "client":
				redirectURL = "/dashboard/client";
				break;
			case "trainer":
				redirectURL = "/dashboard/trainer";
				break;
			case "admin":
				redirectURL = "/dashboard/admin";
				break;
			default:
				return res.status(400).json({ message: "Invalid user role" });
		}
		res.json({ message: "login successfully", token, redirectURL });
	} catch (error) {
		res.status(500).json({ message: "Error login", error });
	}
};

export const forgotPassword = async (req, res) => {
	const { email } = req.body;

	try {
		const [client, trainer] = await Promise.all([
			Client.findOne({ email }),
			Trainer.findOne({ email })
		]);

		const user = client || trainer;

		if (!user) {
			return res.status(404).json({ success: false, message: "Email not found" });
		}

		const resetToken = crypto.randomBytes(20).toString('hex');

		user.resetPasswordToken = resetToken;
		user.resetPasswordExpires = Date.now() + 3600000;//1hour
		await user.save();

		//send email from 
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
		const mailOptions = {
			to: user.email,
			from: 'your-email@gmail.com',
			subject: 'Password Reset Request',
			text: `You requested a password reset. Click the link to reset your password: ${resetLink}`,
		};
		await transporter.sendMail(mailOptions);
		res.json({ success: true, message: "Email sent successfully" });
	} catch (error) {
		console.error("Error handling forgot password", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};

