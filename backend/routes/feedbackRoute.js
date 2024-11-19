const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/:username', async (req, res) => {
	const { username } = req.params;
	const { clientId, feedbackText } = req.body;

	try {
		const trainer = await User.findOne({ username, role: 'trainer' });
		if (!trainer) return res.status(404).json({ message: "Trainer not found" });

		trainer.feedback.push({ clientId, feedbackText });
		await trainer.save();

		res.json({ message: "Feedback submitted successfully. " });
	} catch (error) {
		res.status(500).json({ message: "Error submitting feedback." });
	}
});

module.exports = router;

