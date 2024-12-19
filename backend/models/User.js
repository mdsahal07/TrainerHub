const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	profilePic: { type: String },
	fname: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, enum: ["client", "trainer"], required: true },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
