import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
	who: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Trainer',
		required: true,
	},
	client: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Client',
		required: true,
	},
	reason: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Report = mongoose.model('Report', reportSchema);

export default Report;
