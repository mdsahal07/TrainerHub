import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const clientSchema = new Schema({
	profilePic: { type: String },
	fname: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	goals: { type: String, default: "" },
	bio: { type: String, default: "" },
	subscribedTrainers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' }],
	resetPasswordToken: String,
	resetPasswordExpires: Date,
	status: { type: String, default: "" },
	role: { type: String, default: "client" },
}, { timestamps: true });

const Client = model("Client", clientSchema);

export default Client;
