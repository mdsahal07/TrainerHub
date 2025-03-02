import WeightData from '../models/WeightData.js';

export const getWeightData = async (req, res) => {
	try {
		const { clientId } = req.params;
		const weightData = await WeightData.findOne({ clientId });
		res.status(200).json(weightData);
	} catch (error) {
		res.status(500).json({ message: 'Failed to fetch weight data', error });
	}
};

export const updateWeightData = async (req, res) => {
	try {

		const { clientId, goal, height, startingWeight, currentWeight, goalWeight } = req.body;
		console.log("Data : ", req.body);
		console.log("Client Id : ", clientId);
		console.log("Goal : ", goal);

		let weightData = await WeightData.findOne({ clientId });

		if (!weightData) {
			weightData = new WeightData({
				clientId,
				goal,
				height,
				startingWeight,
				currentWeight,
				goalWeight,
				weightHistory: [{ weight: startingWeight }],
			});
		} else {
			weightData.goal = goal;
			weightData.height = height;
			weightData.startingWeight = startingWeight;
			weightData.currentWeight = currentWeight;
			weightData.goalWeight = goalWeight;
			weightData.weightHistory.push({ weight: currentWeight });
		}
		console.log("weight Data : ", weightData);
		await weightData.save();
		res.status(200).json(weightData);
	} catch (error) {
		res.status(500).json({ message: 'Failed to update weight data', error });
	}
};
