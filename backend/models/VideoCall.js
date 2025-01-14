import mongoose from 'mongoose';

const VideoCallSchema = new mongoose.Schema({
	trainerId: { type: mongoose.Schema.Types.ObjectId, ref: "Trainer", required: true },
	clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
	roomId: { type: String, required: true },
	createdBy: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true
		},
		role: {
			type: String,
			enum: ['trainer', 'client'],
			required: true
		}
	},
	scheduledTime: { type: Date, required: true },
	participants: [
		{
			userId: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
			},
			userType: {
				type: String,
				required: true,
				enum: ['Trainer', 'Client'], // Specify user type
			},
		},
	],
	active: {
		type: Boolean,
		default: true
	}
}, {
	timestamps: true
});

const VideoCall = mongoose.model("VideoCall", VideoCallSchema);

export default VideoCall;
