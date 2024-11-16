const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.put('/:username/available-slots', async (req, res) => {
	const { username } = req.params;
	const { date, startTime, endTime } = req.body;

	try {
		const trainer = await User.findOne({ username, role: "trainer" });
		if (!trainer) return res.status(404).json({ message: "Trainer not found" });

		const newSlot = { date, startTime, endTime };

		trainer.availableSlots.push({ newSlot });
		await trainer.save();
		res.json({ message: "Slot added successfully", trainer });
	} catch (error) {
		res.status(500).json({ message: "Error adding slot", error });
	}
});

router.get('/:username/available-slots', async (req, res) => {
	const { username } = req.params;

	try {
		const trainer = await User.findOne({ username, role: "trainer" });
		if (!trainer) return res.status(400).json({ message: "Trainer not found" });

		const slotsWithoutId = trainer.availableSlots.map(slot => {
			date: slot.date,
				time: slot.time,
		});
		res.json({ availableSlots: slotsWithoutId });
	} catch (error) {
		res.status(500).json({ messages: "Error fetching slots" });
	}
});

module.exports = router;
