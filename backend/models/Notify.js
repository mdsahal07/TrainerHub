import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
	trainer: { type: String, required: true },
	message: { type: String, required: true },
	startTime: { type: String, require: true },
	endTime: { type: String, require: true },
	timestamp: { type: Date, default: Date.now },
	read: { type: Boolean, default: false }
});

const meetingNotif = mongoose.model('Notification', meetingSchema);

export default meetingNotif;
