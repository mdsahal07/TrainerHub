import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
	trainerId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Trainer',
	},
	clientId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Client',
	},
	rating: {
		type: Number,
		required: true,
		min: 1,
		max: 5,
	},
	review: {
		type: String,
		required: true,
		maxLength: 120,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
