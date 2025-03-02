import Rating from '../models/Rating.js';

export const getRatings = async (req, res) => {
	try {
		const { trainerId } = req.params;
		console.log("Trainer Id : ", trainerId)
		const ratings = await Rating.find({ trainerId });
		res.status(200).json(ratings);
	} catch (error) {
		res.status(500).json({ message: 'Failed to fetch ratings', error });
	}
};

export const submitRating = async (req, res) => {
	try {
		const { trainerId, clientId, rating, review } = req.body;
		const newRating = new Rating({ trainerId, clientId, rating, review });
		await newRating.save();
		res.status(200).json(newRating);
	} catch (error) {
		res.status(500).json({ message: 'Failed to submit rating', error });
	}
};
