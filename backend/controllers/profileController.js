import Client from '../models/Client.js';
import Trainer from '../models/Trainer.js';

export const getProfile = async (req, res) => {

	try {
		let user;
		// Check if user is a client or a trainer
		if (req.user.role === 'client') {
			user = await Client.findById(req.user.id);
		} else if (req.user.role === 'trainer') {
			user = await Trainer.findById(req.user.id);
		}
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.json(user);
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
};

export const updateProfile = async (req, res) => {

	const { fname, username, bio, goals, qualifications, experience, availability, specialization, profilePic } = req.body;

	try {
		let user;
		// Check if user is a client or a trainer and fetch the user
		if (req.user.role === 'client') {
			user = await Client.findById(req.user.id);
		} else if (req.user.role === 'trainer') {
			user = await Trainer.findById(req.user.id);
		}

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Update fields based on user type
		user.fname = fname || user.fname
		user.username = username || user.username;
		user.bio = bio || user.bio;
		user.profilePic = profilePic || user.profilePic;

		if (req.user.role === 'client') {
			user.goals = goals || user.goals;
		} else if (req.user.role === 'trainer') {
			user.specialization = specialization || user.specialization;
			user.qualifications = qualifications || user.qualifications;
			user.experience = experience || user.experience;
			user.availability = availability || user.availability;
		}

		await user.save();
		res.json(user); // Return the updated user object
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
};


