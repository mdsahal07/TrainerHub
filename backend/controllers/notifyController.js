import meetingNotif from '../models/Notify.js';

export const createNotification = async (userId, trainer, message) => {
	console.log("User Id : ", userId);
	try {
		console.log("UserId : ", userId);
		const notification = new Notification({ userId, trainer, message, timestamp });
		await notification.save();
		res.status(201).json(notification);
	} catch (error) {
		res.status(500).json({ error: 'Error creating notification' });
	}
};

export const getNotifications = async (req, res) => {
	console.log("req : ", req.body);
	try {
		const notifications = await meetingNotif.find({ userId: req.params.userId }).sort({ timestamp: -1 });
		console.log(" GET notifications ; ", notifications);
		res.status(200).json(notifications);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching notifications', error });
	}
};
