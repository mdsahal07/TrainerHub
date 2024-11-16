const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/:username/ratings', async (req, res) => {
	const { username } = req.params;
	const { clientId, rating, comment } = req.body;

	try {
		// Find the trainer
		const trainer = await User.findOne({ username, role: "trainer" });
		if (!trainer) return res.status(404).json({ message: "Trainer not found" });

		// Check if the client has already rated
		const existingRating = trainer.ratings.find(r => r.clientId.toString() === clientId);
		if (existingRating) {
			// Update existing rating
			existingRating.rating = rating;
			existingRating.comment = comment || existingRating.comment;
		} else {
			// Add a new rating
			trainer.ratings.push({ clientId, rating, comment });
		}

		await trainer.save();

		res.json({ message: "Rating added/updated successfully", ratings: trainer.ratings });
	} catch (error) {
		res.status(500).json({ message: "Error adding/updating rating", error });
	}
});


router.get('/:username/ratings', async (req, res) => {
	const { username } = req.params;

	try {
		// Find the trainer
		const trainer = await User.findOne({ username, role: "trainer" }).select("ratings");
		if (!trainer) return res.status(404).json({ message: "Trainer not found" });

		// Calculate average rating
		const totalRatings = trainer.ratings.length;
		const averageRating = totalRatings
			? trainer.ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings
			: 0;

		res.json({
			ratings: trainer.ratings,
			averageRating: averageRating.toFixed(2),
			totalRatings
		});
	} catch (error) {
		res.status(500).json({ message: "Error fetching ratings", error });
	}
});

module.exports = router;
