import Trainer from '../models/Trainer.js';

export const getTopTrainers = async (req, res) => {
	try {
		const topTrainers = await Trainer.find()
			.sort({ rating: -1 })
			.limit(10);
		res.status(200).json(topTrainers);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch top trainers" });
	}
};

export const getFilteredTrainers = async (req, res) => {
	const { searchQuery, specialization, minRating } = req.query;

	// Build the query object dynamically based on provided filters
	const query = {};

	if (searchQuery) {
		query.username = { $regex: searchQuery, $options: 'i' };
	}

	if (specialization) {
		query.specialization = specialization;
	}
	if (minRating) {
		query.rating = { $gte: parseFloat(minRating) };
	}


	try {
		const filteredTrainers = await Trainer.find(query).sort({ rating: -1 });
		res.status(200).json(filteredTrainers);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch filtered trainers' });
	}
};


