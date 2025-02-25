import mongoose from 'mongoose';

const trainerSchema = new mongoose.Schema({
	profilePic: { type: String },
	fname: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	rating: { type: Number, default: 0 },
	bio: { type: String, default: " " },
	specialization: { type: String, default: " " },
	qualifications: { type: String, default: " " },
	experience: { type: String, default: "" },
	availability: { type: String },
	connection: [
		{
			clientId: mongoose.Schema.Types.ObjectId,
			clientName: String,
			status: { type: String, default: 'pending' }, // Default status is 'pending'
		}],

	resetPasswordToken: String,
	resetPasswordExpires: Date,
}, { timestamps: true });

const Trainer = mongoose.model("Trainer", trainerSchema);

export default Trainer;
