import VideoCall from '../models/VideoCall.js';
import Notification from '../models/VcNotif.js';

export const startVideoCall = async (req, res) => {
	const { clientIds } = req.body;

	if (!clientIds || !Array.isArray(clientIds)) {
		return res.status(400).json({ message: 'Invalid client IDs' });
	}

	const roomName = `trainer-room-${Date.now()}`;
	try {
		const videoCall = new VideoCall({ roomName, clients: clientIds });
		await videoCall.save();

		clientIds.forEach(async (clientId) => {
			const notification = new Notification({
				clientId,
				message: `You have been invited to a video call. Room: ${roomName}`,
				roomName,
			});
			await notification.save();
		});

		res.status(200).json({ roomName });
	} catch (err) {
		res.status(500).json({ message: 'Failed to start video call', error: err.message });
	}
};

export const getNotifications = async (req, res) => {
	const { clientId } = req.params;
	try {
		const notifications = await Notification.find({ clientId });
		res.status(200).json(notifications);
	} catch (err) {
		res.status(500).json({ message: 'Failed to fetch notifications', error: err.message });
	}
};

export const handleResponse = async (req, res) => {
	const { clientId, roomName, response } = req.body;

	if (!clientId || !roomName || !response) {
		return res.status(400).json({ message: 'Invalid data' });
	}

	try {
		const videoCall = await VideoCall.findOne({ roomName });
		if (!videoCall) {
			return res.status(404).json({ message: 'Room not found' });
		}

		if (response === 'accept') {
			videoCall.status = 'accepted';
		}

		await Notification.deleteOne({ clientId, roomName });
		res.status(200).json({ message: 'Response recorded' });
	} catch (err) {
		res.status(500).json({ message: 'Failed to handle response', error: err.message });
	}
};
