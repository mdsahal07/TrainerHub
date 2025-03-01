import Report from '../models/Report.js';

export const createReport = async (req, res) => {
	try {
		const { trainerId, clientId, reportText } = req.body;
		console.log("TrainerId : ", trainerId);
		console.log("ClientId : ", clientId);
		console.log("Report text : ", reportText);
		const newReport = new Report({
			who: trainerId,
			client: clientId,
			reason: reportText,
		});

		await newReport.save();

		res.status(201).json({ message: 'Report created successfully.' });
	} catch (error) {
		res.status(500).json({ message: 'Failed to create report', error });
	}
};
