const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Feedback = require('../models/Feedback');

router.post('/:username', async (req, res) => {
	const { username } = req.params;
	const { clientId, feedbackText } = req.body;

	try {
		const trainer = await User.findOne({ username, role: 'trainer' });
		if (!trainer) return res.status(404).json({ message: "Trainer not found" });

		const feedback = await Feedback.create({ clientId, feedbackText });
		console.log("feedback:", feedback);
		trainer.feedback.push(feedback._id);
		await trainer.save();

		res.json({ message: "Feedback submitted successfully. " });
	} catch (error) {
		res.status(500).json({ message: "Error submitting feedback." });
	}
});

router.get('/:username', async (req, res) => {
	const { username } = req.params;

	try {
		const trainer = await User.findOne({ username }).populate('feedback');
		console.log(trainer);
		if (!trainer) return res.status(404).json({ message: "Trainer not found" });

		const feedbackData = trainer.feedback.map(fb => ({
			feedbackText: fb.feedbackText,
			submittedAt: fb.submittedAt
		}));
		res.json({ feedback: feedbackData });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error fetching feedback" });
	}
});

module.exports = router;

