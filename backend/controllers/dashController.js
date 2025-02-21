import Client from '../models/Client.js';

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

