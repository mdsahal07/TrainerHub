import { v4 as uuidv4 } from 'uuid';
import VideoCall from '../models/VideoCall.js';

// Start a new call
export const startCall = async (req, res) => {
	try {
		const { role } = req.user; // Assume `req.user` exists
		if (role !== 'trainer' && role !== 'client') {
			return res.status(403).json({ message: 'Unauthorized role for starting a call.' });
		}

		const roomId = uuidv4(); // Generate unique room ID

		const newCall = await VideoCall.create({
			trainerId: role === 'trainer' ? req.user.id : null,
			clientId: role === 'client' ? req.user.id : null,
			roomId,
			createdBy: req.user.id,
			participants: [req.user.id],
			scheduledTime: new Date(), // Example timestamp;
		});

		res.status(200).json({ roomId: newCall.roomId, message: 'Call started successfully.' });
	} catch (error) {
		console.error('Error starting call:', error);
		res.status(500).json({ message: 'Error starting call.' });
	}
};

// Join an existing call
export const joinCall = async (req, res) => {

	try {
		const { roomId } = req.body;
		const call = await VideoCall.findOne({ roomId, active: true });

		if (!call) {
			return res.status(404).json({ message: "Room not found or call inactive" });
		}


		if (!call.participants.includes(req.user.id)) {
			call.participants.push(req.user.id);
			await call.save(); // Save changes to DB
		}

		res.status(200).json({
			roomId: call.roomId,
			participants: call.participants,
			message: 'Joined the call successfully.',
		});
	} catch (error) {

		console.error('Error joining call:', error);
		res.status(500).json({ message: 'Error joining call.' });
	}
};

//End the call
export const endCall = async (req, res) => {
	try {
		const { roomId } = req.body;

		// Find the call by roomId
		const call = await VideoCall.findOne({ roomId });

		if (!call) {
			return res.status(404).json({ message: 'Room not found.' });
		}

		// Mark the call as inactive
		call.active = false;
		await call.save();

		res.status(200).json({ message: 'Call ended successfully.' });
	} catch (error) {
		console.error('Error ending call:', error);
		res.status(500).json({ message: 'Error ending call.' });
	}
};
