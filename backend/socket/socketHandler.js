const clients = {};
import meetingNotif from '../models/Notify.js';

const sendNotification = (io, clientId, message) => {
	console.log("clientId : ", clientId);
	const socketId = clients[clientId];
	if (socketId) {
		console.log('Emitting receiveNotification event');
		io.to(socketId).emit('receiveNotification', message);
	} else {
		console.log(`No data found for the socketId ${clientId}`);
	}
};

const socketHandler = (io) => {
	io.on('connection', (socket) => {
		console.log('A user connected:', socket.id);
		// Register a client when they join
		socket.on('registerClient', (clientId) => {
			clients[clientId] = socket.id; // Map clientId to socket.id
		});

		socket.on('sendNotification', async (notification) => {
			console.log('Notification received on socket.js:', notification);
			try {
				const savedNotification = await meetingNotif.create({
					userId: notification.clientId,
					trainer: notification.trainerName,
					message: notification.description,
					startTime: notification.startTime,
					endTime: notification.endTime,
					timestamp: notification.timestamp
				});
				sendNotification(io, notification.clientId, notification, savedNotification);
			} catch (error) {
				console.error('Error saving notification:', error);
			}
		});

		socket.on('disconnect', () => {
			console.log('A user disconnected:', socket.id);
			// Remove client from the list
			for (const [id, sid] of Object.entries(clients)) {
				if (sid === socket.id) delete clients[id];
			}
			console.log("Updated clients:", clients);
		});
	});
};

export { clients, sendNotification };
export default socketHandler;
