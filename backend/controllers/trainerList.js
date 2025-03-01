import Request from '../models/Request.js';

export const acceptedTrainers = async (req, res) => {
	try {
		const clientId = req.user.id;
		console.log("client Id : ", clientId);
		const acceptedRequests = await Request.find({
			clientId,
			status: 'accepted',
		}).populate('trainerId');

		if (!acceptedRequests.length) {
			return res.status(404).json({ message: 'No accepted clients found' });
		}
		const trainers = acceptedRequests.map((request) => request.trainerId);
		console.log("Trainers : ", trainers);
		res.status(200).json({ trainers });
	} catch (error) {
		console.error('Error fetching accepted trainers:', error);
		res.status(500).json({ message: 'Server error' });
	}
};

