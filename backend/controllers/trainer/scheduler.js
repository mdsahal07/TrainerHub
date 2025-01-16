import Schedule from '../../models/Schedule.js';
import Client from '../../models/Client.js';

export const createSchedule = async (req, res) => {
	const { trainerId, clientId, startTime, endTime, description } = req.body;

	try {
		const newSchedule = new Schedule({
			trainerId,
			clientId,
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

export const getTrainerSchedule = async (req, res) => {
	const { trainerId } = req.params;
	try {
		const schedules = await Schedule.find({ trainerId }).populate('clientId', 'fname email');
		if (!schedules.length) {
			return res.status(404).json({ message: 'No schedules found for the given trainer ID' });
		}
		res.status(200).json(schedules);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching schedules', error });
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
