import React from 'react';
import socket from '../socket.js';

const TimeSlot = ({ slot, deleteSlot }) => {

	const fetchTrainerName = async (trainerId) => {
		console.log("Trainer Id in timeslot : ", trainerId);
		try {
			const response = await fetch(`http://localhost:5000/schedule/trainer/${trainerId}`);
			const trainer = await response.json();
			console.log("Trainer : ", trainer);
			return trainer;
		} catch (error) {
			console.error('Error fetching trainer name:', error);
			return null;
		}
	};

	const handleSendClick = async () => {
		const trainerName = await fetchTrainerName(slot.trainerId);
		const notification = {
			clientId: slot.clientId,
			trainerName: trainerName,
			startTime: new Date(slot.startTime).toLocaleTimeString(),
			endTime: new Date(slot.endTime).toLocaleTimeString(),
			description: slot.description,
		};
		socket.emit('sendNotification', notification);
	};

	return (
		<div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
			<h4 className="text-lg font-semibold mb-2">Date: {new Date(slot.startTime).toDateString()}</h4>
			<p className="mb-1"><span className="font-medium">Start Time:</span> {new Date(slot.startTime).toLocaleTimeString()}</p>
			<p className="mb-1"><span className="font-medium">End Time:</span> {new Date(slot.endTime).toLocaleTimeString()}</p>
			<p className="mb-1"><span className="font-medium">Client:</span> {slot.username}</p>
			<p className="mb-4"><span className="font-medium">Description:</span> {slot.description}</p>
			<div className="flex space-x-2">
				<button onClick={() => deleteSlot(slot._id)} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200">
					Delete
				</button>
				<button onClick={handleSendClick} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
					Send
				</button>
			</div>
		</div>
	);
};

export default TimeSlot;
