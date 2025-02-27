import Trainer from '../../models/Trainer.js';
import Client from '../../models/Client.js';
import Request from '../../models/Request.js';

export const getTrainerDashboard = async (req, res) => {
	const trainerId = req.user.id;
	try {
		// Fetch trainer's name and profile picture
		const trainer = await Trainer.findById(trainerId).select('fname');
		if (!trainer) {
			return res.status(404).json({ message: 'Trainer not found' });
		}

		// Count total clients connected to the trainer
		const totalClients = await Client.countDocuments({ trainer: trainerId });

		// Fetch pending requests count
		const pendingRequests = await Request.countDocuments({
			trainerId,
			status: 'pending',
		});

		// Simulate client progress data (real implementation would vary)
		const progress = [5, 15, 25, 35]; // Example: Progress over weeks

		res.status(200).json({
			name: trainer.fname,
			totalClients,
			pendingRequests,
			progress,
		});
	} catch (error) {
		console.error('Error fetching trainer dashboard data:', error);
		res.status(500).json({ message: 'Server error' });
	}
};
