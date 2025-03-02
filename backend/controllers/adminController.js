import Trainer from '../models/Trainer.js';
import Client from '../models/Client.js';
import Feedback from '../models/Feedback.js';
import Admin from '../models/Admin.js';

export const getAdminDash = async (req, res) => {

	try {
		const adminId = req.user.id;
		console.log("Data in Dashboard : ", adminId);
		const admin = await Admin.findById(adminId).select("fname");
		if (!admin) {
			res.status(40).json({ message: "Admin not found" });
		}
		res.status(200).json({ name: admin.fname });
	} catch (error) {
		res.status(500).json({ message: "Failed to fetch Dashboard" });
	}
}

export const getAllTrainers = async (req, res) => {
	try {
		const trainer = await Trainer.find({});
		res.json(trainer);
	} catch (error) {
		res.status(500).json({ message: 'Failed to fetch trainers' });
	}
};


export const getAllClients = async (req, res) => {
	try {
		const clients = await Client.find({});
		res.json(clients);
	} catch (error) {
		res.status(500).json({ message: 'Failed to fetch clients' });
	}
};

export const verifyTrainer = async (req, res) => {
	try {
		const { trainerId } = req.params;
		console.log("TrainerId in admin : ", trainerId);
		await Trainer.findByIdAndUpdate(trainerId, { verified: true });
		res.status(200).json({ message: 'Trainer verified successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Failed to verify trainer', error });
	}
};


export const suspendUser = async (req, res) => {
	const { userId } = req.params;
	console.log("User ID: ", userId);
	try {
		let user = await Trainer.findById(userId);
		if (!user) {
			user = await Client.findById(userId);
		}

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const suspendUntil = new Date();
		suspendUntil.setDate(suspendUntil.getDate() + 7);

		user.status = "suspended";
		user.suspendUntil = suspendUntil;
		await user.save();
		res.json({ message: 'User suspended successfully', user });
	} catch (error) {
		console.error('Error suspending user:', error);
		res.status(500).json({ message: 'Failed to suspend user', error });
	}
};

// Delete a user
export const deleteUser = async (req, res) => {
	const { userId } = req.params;
	try {
		let user = await Trainer.findByIdAndDelete(userId);
		if (!user) {
			user = await Client.findByIdAndDelete(userId);
		}
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}
		res.json({ message: 'User deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Failed to delete user' });
	}
};

// Get all feedbacks
export const getFeedbacks = async (req, res) => {
	try {
		const feedbacks = await Feedback.find({});
		res.json(feedbacks);
	} catch (error) {
		res.status(500).json({ message: 'Failed to fetch feedbacks' });
	}
};
