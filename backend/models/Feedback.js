import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const feedbackSchema = new Schema({
	clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	feedbackText: { type: String },
	submittedAt: { type: Date, default: Date.now }
});

const Feedback = model('Feedback', feedbackSchema);

export default Feedback;
