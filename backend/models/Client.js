const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
	profilePic: { type: String },
	fname: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	goals: [{ type: String }],
	subscribedTrainers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' }],
}, { timestamps: true });

module.exports = mongoose.model("Client", clientSchema);
