const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get('/:username', async (req, res) => {
	try {
		const user = await User.findOne({ username: req.params.username }, "-password");
		if (!user) return res.status(404).json({ message: "User not found" });
		console.log("user data fetch", user);
		res.json(user);
	} catch (error) {
		res.status(500).json({ message: "Error fetching profile data", error });
	}
});

router.put('/:username', async (req, res) => {
	const { username } = req.params;
	const { firstname, lastname, profileInfo } = req.body;

	try {
		const user = await User.findOne({ username: username });
		if (!user) return res.status(404).json({ message: "User not found" });

		//Update fields
		user.firstname = firstname || user.firstname;
		user.lastname = lastname || user.lastname;
		user.profileInfo = profileInfo || user.profileInfo;

		await user.save();
		res.json({ message: "Profile updated successfully", user });
	} catch (error) {
		res.status(500).json({ message: "Error updating profile", error });
	}
});

module.exports = router;
