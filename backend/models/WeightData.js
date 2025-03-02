import mongoose from 'mongoose';

const weightDataSchema = new mongoose.Schema({
	clientId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Client',
	},
	goal: {
		type: String,
		required: true,
		enum: ['loss weight', 'gain weight'],
	},
	height: {
		type: Number,
		required: true,
	},
	startingWeight: {
		type: Number,
		required: true,
	},
	currentWeight: {
		type: Number,
		required: true,
	},
	goalWeight: {
		type: Number,
		required: true,
	},
	weightHistory: [
		{
			date: { type: Date, default: Date.now },
			weight: { type: Number, required: true },
		},
	],
});

const WeightData = mongoose.model('WeightData', weightDataSchema);

export default WeightData;
