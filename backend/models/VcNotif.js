import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
	clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	message: { type: String, required: true },
	roomName: { type: String, required: true },
}, { timestamps: true });

const VcNotif = mongoose.model('VcNotif', notificationSchema);

export default VcNotif;
