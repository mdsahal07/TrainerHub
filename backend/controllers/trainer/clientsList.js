import Request from '../../models/Request.js'; // Import the Request model

// Route to get accepted clients for the logged-in trainer
export const acceptedClients = async (req, res) => {
	try {
		const trainerId = req.user.id; // Trainer ID from authenticated user

		// Find all requests where the trainer has accepted the client
		const acceptedRequests = await Request.find({
			trainerId,
			status: 'accepted',
		}).populate('clientId'); // Populate client details

		if (!acceptedRequests.length) {
			return res.status(404).json({ message: 'No accepted clients found' });
		}

		// Extract client details from the populated `clientId`
		const clients = acceptedRequests.map((request) => request.clientId);
		console.log("clients : ", clients);

		res.status(200).json({ clients });
	} catch (error) {
		console.error('Error fetching accepted clients:', error);
		res.status(500).json({ message: 'Server error' });
	}
};

