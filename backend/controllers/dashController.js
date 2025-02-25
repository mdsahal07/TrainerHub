import Client from '../models/Client.js';
import Trainer from '../models/Trainer.js';

export const getClientDashboard = async (req, res) => {
	try {
		// `req.user` should already be populated by the `verifyToken` middleware
		const clientId = req.user.id;
		// Find the client in the database
		const client = await Client.findById(clientId);

		if (!client) {
			return res.status(404).json({ message: 'Client not found' });
		}

		// Example data for the dashboard
		const dashboardData = {
			name: client.fname,
			email: client.email,
			trainersConnected: client.trainersConnected || 0,
			progressReports: client.progressReports || 0,
		};

		res.status(200).json(dashboardData);
	} catch (error) {
		res.status(500).json({ message: 'Error loading dashboard', error });
	}
};

export const getTrainers = async (req, res) => {
	try {
		const trainers = await Trainer.find({});
		res.status(200).json({ trainers });
	} catch (error) {
		console.error('Error fetching trainers:', error);
		res.status(500).json({ message: 'Server error' });
	}
};

export const startVideoCall = async (req, res) => {
	try {
		const { trainerId } = req.body;
		const roomName = `client-room-${Date.now()}`;

		// Notify the trainer about the video call
		const trainer = await Trainer.findById(trainerId);
		if (trainer) {
			console.log(`Notifying trainer ${trainer.email} about video call in room ${roomName}`);
			io.to(trainer.socketId).emit('receiveNotification', {
				type: 'videoCall',
				roomName,
				description: 'You have an incoming video call',
				startTime: new Date().toISOString(),
				endTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
			});
		}

		res.status(200).json({ roomName });
	} catch (error) {
		console.error('Error starting video call:', error);
		res.status(500).json({ message: 'Server error' });
	}
};

export const getClientVideoCallRoom = async (req, res) => {
	try {
		const clientId = req.user.id; // Assuming you have a middleware to set req.user
		const client = await Client.findById(clientId);

		if (!client) {
			return res.status(404).json({ message: 'Client not found' });
		}

		const videoCallRoom = client.videoCallRoom; // Assuming you store the room name in the client model
		res.status(200).json({ roomName: videoCallRoom });
	} catch (error) {
		console.error('Error fetching video call room:', error);
		res.status(500).json({ message: 'Server error' });
	}
};
