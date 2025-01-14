const VideoCall = require('./models/VideoCall');

const socketHandler = (io) => {

	io.on('connection', (socket) => {
		console.log('New client connected:', socket.id);

		socket.on('join-call', async (roomId) => {
			const call = await VideoCall.findOne({ roomId, active: true });
			if (!call) {
				socket.emit('error', { message: 'Call not found or inactive.' });
				return;
			}

			socket.join(roomId);
			socket.to(roomId).emit('user-joined', { userId: socket.id });

			console.log(`Socket ${socket.id} joined room ${roomId}`);
		});

		socket.on('leave-call', async (roomId) => {
			socket.leave(roomId);
			socket.to(roomId).emit('user-left', { userId: socket.id });
			console.log(`Socket ${socket.id} left room ${roomId}`);
		});

		socket.on('disconnect', () => {
			console.log('Client disconnected:', socket.id);
		});
	});
};
module.exports = socketHandler;
