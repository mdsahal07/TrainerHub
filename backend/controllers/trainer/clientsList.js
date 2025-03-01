import Request from '../../models/Request.js'; // Import the Request model

export const acceptedClients = async (req, res) => {
	try {
		const trainerId = req.user.id;

		const acceptedRequests = await Request.find({
			trainerId,
			status: 'accepted',
		}).populate('clientId');

		if (!acceptedRequests.length) {
			return res.status(404).json({ message: 'No accepted clients found' });
		}
		const clients = acceptedRequests.map((request) => request.clientId);
		res.status(200).json({ clients });
	} catch (error) {
		console.error('Error fetching accepted clients:', error);
		res.status(500).json({ message: 'Server error' });
	}
};

