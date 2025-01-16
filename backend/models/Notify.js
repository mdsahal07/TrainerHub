import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
	clientName: { type: String, required: true },
	message: { type: String, required: true },
	date: { type: Date, default: Date.now },
});


const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
