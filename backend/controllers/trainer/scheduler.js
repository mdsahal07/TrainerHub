import Schedule from '../../models/Schedule.js';
import Client from '../../models/Client.js';
import Trainer from '../../models/Trainer.js';

export const createSchedule = async (req, res) => {
	const { trainerId, clientId, username, startTime, endTime, description } = req.body;

	try {
		const newSchedule = new Schedule({
			trainerId,
			clientId,
			username,
			startTime,
			endTime,
			description
		});
		console.log("newSchedule : ", newSchedule);
		await newSchedule.save();
		res.status(201).json(newSchedule);
	} catch (error) {
		console.log("Error : ", error);
		res.status(500).json({ message: 'Error creating schedule', error });
	}
};

export const getSchedulesByDate = async (req, res) => {
	const { trainerId, date } = req.params;
	const startOfDay = new Date(date);
	startOfDay.setUTCHours(0, 0, 0, 0);
	const endOfDay = new Date(date);
	endOfDay.setUTCHours(23, 59, 59, 999);

	try {
		const schedules = await Schedule.find({
			trainerId,
			startTime: { $gte: startOfDay, $lt: endOfDay }
		}).populate('clientId', 'name email');
		res.status(200).json(schedules);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching schedules', error });
	}
};

export const deleteSchedule = async (req, res) => {
	const id = req.params.slotId;
	try {
		await Schedule.findByIdAndDelete(id);
		res.status(200).json({ message: 'Schedule deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Error deleting schedule', error });
	}
};

export const getUserByUsername = async (req, res) => {
	const { username } = req.query;

	try {
		const user = await Client.findOne({ username });
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json(user);
	} catch (error) {
		console.log("Error fetching user");
		res.status(500).json({ message: 'Error fetching user', error });
	}
};

export const getUsernameById = async (req, res) => {
	const { trainerId } = req.query;
	try {
		const user = await Trainer.findOne({ trainerId });

		const userId = user.username;
		console.log("Trainer Id : ", trainerId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json(userId);
	} catch (error) {
		res.status(500).json({ message: "Error fetching user ", error });
	}

}
