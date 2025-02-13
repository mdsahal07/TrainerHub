import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import Client from '../models/Client.js';
import Trainer from '../models/Trainer.js';
import sendEmail from '../sendEmail.js';

const findUserByEmail = async (email) => {
	return await Client.findOne({ email }) || await Trainer.findOne({ email });
};

const findUserByResetToken = async (resetToken) => {
	return await Client.findOne({ resetPasswordToken: resetToken, resetPasswordExpires: { $gt: Date.now() } }) ||
		await Trainer.findOne({ resetPasswordToken: resetToken, resetPasswordExpires: { $gt: Date.now() } });
};

export const getUserDetails = async (req, res) => {
	try {
		const user = await Client.findById(req.user.userId) || await Trainer.findById(req.user.userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.json(user);
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
};
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
		const user = await findUserByEmail(email);
		if (!user) {
			return res.status(400).json({ message: 'User not found' });
		}

		const resetToken = crypto.randomBytes(32).toString('hex');
		user.resetPasswordToken = resetToken;
		user.resetPasswordExpires = Date.now() + 3600000;
		await user.save();

		const resetURL = `http://localhost:3000/reset-password/${resetToken}`;
		const emailText = `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                       Please click on the following link, or paste this into your browser to complete the process:\n\n
                       ${resetURL}\n\n
                       If you did not request this, please ignore this email and your password will remain unchanged.\n`;

		await sendEmail(user.email, 'Password Reset', emailText);

		res.status(200).json({ success: 'Reset link sent to your email' });
	} catch (error) {
		res.status(500).json({ message: 'Error requesting password reset', error });
	}
};

export const resetPassword = async (req, res) => {
	const { token } = req.params;
	const { password } = req.body;
	try {
		const user = await findUserByResetToken(token);

		if (!user) {
			return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
		}

		user.password = await bcrypt.hash(password, 10);
		user.resetPasswordToken = undefined;
		user.resetPasswordExpires = undefined;
		await user.save();

		res.status(200).json({ message: 'Password reset successful' });
	} catch (error) {
		res.status(500).json({ message: 'Error while reset password' });
	}
};
