const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Registering a new user
const register = async (req, res) => {
	const { username, firstname, lastname, email, password, role } = req.body;

	try {
		const hashPassword = await bcrypt.hash(password, 10);
		const user = new User({ username, firstname, lastname, email, password: hashPassword, role });
		await user.save();

		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Error registerign user", error });
	}
};

//Login an existing user
const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ message: "User not found" });

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) return res.status(400).json({ message: "Incorrect password" });

		const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_TOKEN, { expiresIn: "7d" });
		res.json({ token });
	} catch (error) {
		res.status(500).json({ message: "Error login", error });
	}
};

module.exports = { register, login };

