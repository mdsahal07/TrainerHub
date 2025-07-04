import mongoose from 'mongoose';

const videoCallSchema = new mongoose.Schema({
	trainerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Trainer',
		required: true,
	},
	clientIds: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Client',
		required: true,
	}],
	roomName: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const VideoCall = mongoose.model('VideoCall', videoCallSchema);

export default VideoCall;
