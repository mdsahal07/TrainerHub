const Client = require('../models/Client');


const getClientDashboard = async (req, res) => {
	try {
		// `req.user` should already be populated by the `verifyToken` middleware
		const clientId = req.user.userId;
		console.log("clientId", clientId);
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
		console.error('Error in getClientDashboard:', error);
		res.status(500).json({ message: 'Error loading dashboard', error });
	}
};

module.exports = { getClientDashboard };
