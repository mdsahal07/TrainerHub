import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
	trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true },
	clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
	startTime: { type: Date, require: true },
	endTime: { type: Date, require: true },
	status: { type: String, default: "Scheduled" },
	description: { type: String, default: "Workout time" }
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule;
