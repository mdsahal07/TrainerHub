import mongoose from 'mongoose';

const videoCallSchema = new mongoose.Schema({
	roomName: { type: String, required: true },
	clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
	status: { type: String, default: 'pending' },
}, { timestamps: true });

const VideoCall = mongoose.model('VideoCall', videoCallSchema);

export default VideoCall;
