import VideoCall from '../models/VideoCall.js';
import Trainer from '../models/Trainer.js';
import Client from '../models/Client.js';
import VcNotif from '../models/VcNotif.js';

export const startVideoCall = async (req, res) => {
	try {
		const { clientIds } = req.body;
		const trainerId = req.user.id;
		console.log("Clients ID : ", clientIds);
		console.log("TrainerID : ", trainerId);
		const trainer = await Trainer.findById(trainerId);
		if (!trainer) {
			return res.status(404).json({ message: 'Trainer not found' });
		}

		const roomName = `trainer-room-${Date.now()}`;

		const newCall = new VideoCall({ trainerId, clientIds, roomName });
		await newCall.save();

		for (const clientId of clientIds) {
			const client = await Client.findById(clientId);
			if (client) {
				const newVcNotif = new VcNotif({
					recipientId: clientId,
					recipientModel: 'Client',
					message: `Join the call at ${roomName}`,
				});
				await newVcNotif.save();
			}
		}

		res.status(200).json({ roomName });
	} catch (error) {
		res.status(500).json({ message: 'Failed to start video call', error });
	}
};

export const getNotifications = async (req, res) => {
	try {
		const { userId, userModel } = req.params;
		console.log("User Id : ", userId);
		console.log("userModel :", userModel);
		const notifications = await VcNotif.find({ recipientId: userId }).sort({ created: -1 }).limit(1);
		console.log("Notificaitons : ", notifications);
		res.status(200).json(notifications);
	} catch (error) {
		res.status(500).json({ message: 'Failed to fetch notifications', error });
	}
};
