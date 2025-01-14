
const trainers = {};
export default (io) => {
	io.on("connection", (socket) => {
		console.log("A user connected:", socket.id);

		// Register a trainer when they join
		socket.on("registerTrainer", (trainerId) => {
			trainers[trainerId] = socket.id; // Map trainerId to socket.id
			console.log("Trainer registered:", trainers);
		});

		// Handle disconnection
		socket.on("disconnect", () => {
			console.log("A user disconnected:", socket.id);
			// Remove trainer from the list
			for (const [id, sid] of Object.entries(trainers)) {
				if (sid === socket.id) delete trainers[id];
			}
		});
	});
};
export { trainers };
