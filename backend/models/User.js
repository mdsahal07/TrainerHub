const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
	clientId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
	rating: { type: Number, required: true, min: 1, max: 5 },
	comment: { type: String }
});

const userSchema = new mongoose.Schema({
	profilePic: { type: String },
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, enum: ["client", "trainer"], required: true },
	profileInfo: { type: String },
	goals: { type: String },
	availableSlots: [{
		date: { type: Date },
		startTime: { type: String },
		endTime: { type: String }
	}],
	ratings: [ratingSchema]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
