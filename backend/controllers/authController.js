const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Registering a new user
const register = async (req, res) => {
	const { fname, username, email, password, role } = req.body;
	console.log("controller One");

	const existingUserByUsername = await User.findOne({ username });
	if (existingUserByUsername) {
		return res.status(400).json({ message: "Username is already taken" });
	}
	console.log("Reached the controller");
	const hashPassword = await bcrypt.hash(password, 10);
	const user = new User({ fname, username, email, password: hashPassword, role });
	await user.save();

	res.status(201).json({ message: "User registered successfully" });
}
//Login an existing user
const login = async (req, res) => {
	const { email, password } = req.body;
	console.log("login controller");
	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ message: "User not found" });

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) return res.status(400).json({ message: "Incorrect password" });

		const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_TOKEN, { expiresIn: "7d" });
		res.json({ message: "login successfully", token });
	} catch (error) {
		res.status(500).json({ message: "Error login", error });
	}
};

module.exports = { register, login };

