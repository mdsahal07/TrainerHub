import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
	clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
	trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' },
	status: { type: String, enum: ['requested', 'accepted', 'declined'], default: 'requested' },
	requestId: { type: String, unique: true }
});

const Request = mongoose.model('Request', requestSchema);

export default Request;
