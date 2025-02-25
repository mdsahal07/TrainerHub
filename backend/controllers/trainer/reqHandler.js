import Request from '../../models/Request.js';
import Client from '../../models/Client.js'

export const getPendingRequests = async (req, res) => {
	try {
		const { trainerId } = req.params;
		const requests = await Request.find({ trainerId, status: 'pending' }).populate('clientId');
		console.log("Requests pending : ", requests);
		res.json(requests);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch requests' });
	}
};

// Update request status (accept/decline)
export const updateRequestStatus = async (req, res) => {
	try {
		const { requestId } = req.params;
		const { status } = req.body; // 'accepted' or 'declined'
		await Request.findByIdAndUpdate(requestId, { status });
		res.json({ message: 'Request updated successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Failed to update request status' });
	}
};

// Get client profile
export const getClientProfile = async (req, res) => {
	try {
		const { clientId } = req.params;
		const client = await Client.findById(clientId);
		res.json(client);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch client profile' });
	}
};
