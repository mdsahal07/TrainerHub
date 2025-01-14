import Request from '../models/Request.js';
import { v4 as uuidv4 } from 'uuid';

// Check connection status
export const reqStatus = async (req, res) => {
	const clientId = req.user.id;
	console.log("clientId : ", clientId);
	const trainerId = req.params.trainerId;

	try {
		const connection = await Request.findOne({ clientId, trainerId });

		if (connection) {
			return res.json({ status: connection.status });
		}

		return res.json({ status: 'request' }); // Default status if no connection exists
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Failed to fetch connection status' });
	}
};

// Send a connection request
export const sendReq = async (req, res) => {
	const clientId = req.user.id;
	const { trainerId } = req.body;

	try {
		let connection = await Request.findOne({ clientId, trainerId });

		if (connection) {
			return res.status(400).json({ message: 'Request already exists' });
		}

		connection = new Request({ requestId: uuidv4(), clientId, trainerId, status: 'requested' });
		await connection.save();

		res.json({ message: 'Request sent successfully', status: 'requested' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Failed to send connection request' });
	}
};

// Cancel a connection request
export const cancelReq = async (req, res) => {
	const clientId = req.user.id;
	const { trainerId } = req.body;

	try {
		const connection = await Request.findOneAndDelete({ clientId, trainerId, status: 'requested' });

		if (!connection) {
			return res.status(404).json({ message: 'No request to cancel' });
		}

		res.json({ message: 'Request cancelled successfully', status: 'request' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Failed to cancel connection request' });
	}
};

// Accept or Decline a connection request
export const respondReq = async (req, res) => {
	const trainerId = req.user.id; // Trainer should be authenticated here
	const { clientId, action } = req.body; // action can be 'accept' or 'decline'

	try {
		const connection = await Request.findOne({ clientId, trainerId, status: 'requested' });

		if (!connection) {
			return res.status(404).json({ message: 'No request found' });
		}

		if (action === 'accept') {
			connection.status = 'accepted';
			await connection.save();
			return res.json({ message: 'Request accepted', status: 'accepted' });
		} else if (action === 'decline') {
			connection.status = 'declined';
			await connection.save();
			return res.json({ message: 'Request declined', status: 'declined' });
		} else {
			return res.status(400).json({ message: 'Invalid action' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Failed to respond to connection request' });
	}
};


// Fetch all connection requests for the trainer
export const trainerReq = async (req, res) => {
	const trainerId = req.user.id; // Trainer must be authenticated
	console.log("Trainer id : ", trainerId);
	try {
		const requests = await Request.find({ trainerId, status: 'requested' })
			.populate('clientId', 'fname lname email') // Populate client details
			.sort({ createdAt: -1 });

		res.json(requests);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Failed to fetch requests' });
	}
};
