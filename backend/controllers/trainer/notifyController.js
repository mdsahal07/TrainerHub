import Notification from '../../models/Notify.js';

export const sendNotification = async (req, res) => {
	const { clientUsername, message } = req.body;

	try {
		const newNotification = new Notification({
			clientUsername,
			message,
		});

		await newNotification.save();
		res.status(201).json(newNotification);
	} catch (error) {
		res.status(500).json({ message: 'Error sending notification', error });
	}
};
