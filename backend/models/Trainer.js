const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
	profilePic: { type: String },
	fname: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	rating: { type: Number, default: 0 },
	experience: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Trainer", trainerSchema);
