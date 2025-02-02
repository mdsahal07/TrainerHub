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
		}
		socket.emit('sendNotification', notification);
	}

	return (
		<div className="p-4 border rounded shadow">
			<h4 className="font-bold">Date: {new Date(slot.startTime).toDateString()}</h4>
			<p>Start Time: {new Date(slot.startTime).toLocaleTimeString()}</p>
			<p>End Time: {new Date(slot.endTime).toLocaleTimeString()}</p>
			<p>Client: {slot.username}</p>
			<p>Description: {slot.description}</p>
			<button onClick={() => deleteSlot(slot._id)} className="bg-red-500 text-white p-2 rounded mt-2">Delete</button>
			<button onClick={handleSendClick} className="bg-blue-500 text-white rounded mt-2">Send</button>
		</div>
	);
};

export default TimeSlot;
