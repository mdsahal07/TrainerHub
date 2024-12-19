const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
	clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	feedbackText: { type: String },
	submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
