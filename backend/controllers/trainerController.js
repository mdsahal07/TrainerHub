import Trainer from '../models/Trainer.js';

export const getTrainerById = async (req, res) => {
	const { id } = req.params;
	try {
		const trainer = await Trainer.findById(id);
		if (!trainer) {
			return res.status(404).json({ message: "Trainer not found" });
		}
		console.log("trainer")
		res.status(200).json(trainer);

	} catch (error) {
		res.status(500).json({ message: "Error fetching trainer details" });
	}
};

