import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
	recipientId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		refPath: 'recipientModel',
	},
	recipientModel: {
		type: String,
		required: true,
		enum: ['Trainer', 'Client'],
	},
	message: {
		type: String,
		required: true,
	},
	read: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const VcNotif = mongoose.model('VcNotif', notificationSchema);

export default VcNotif;
