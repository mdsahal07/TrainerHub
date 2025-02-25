import React, { useState } from 'react';
import axios from 'axios';

const TimeSlotForm = ({ trainerId, selectedDate, onClose, addNewSlot }) => {
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');
	const [clientName, setClientName] = useState('');
	const [description, setDescription] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const start = new Date(selectedDate);
			start.setHours(startTime.split(':')[0], startTime.split(':')[1]);
			const end = new Date(selectedDate);
			end.setHours(endTime.split(':')[0], endTime.split(':')[1]);
			const clientResponse = await axios.get(`http://localhost:5000/schedule/finduser?username=${clientName}`);
			const clientId = clientResponse.data._id;
			console.log("clientId : ", clientId);
			const username = clientResponse.data.username;
			const newSlot = await axios.post(`http://localhost:5000/schedule/create`, {
				trainerId,
				clientId,
				username,
				startTime: start.toISOString(),
				endTime: end.toISOString(),
				description
			});
			console.log(newSlot.data);
			addNewSlot(newSlot.data);
			onClose();
		} catch (error) {
			console.error("Error creating slot:", error);
		}
	};

	return (
		<div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
			<h3 className="text-xl font-semibold mb-4">Add New Time Slot</h3>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label className="block text-gray-700 mb-2">Start Time</label>
					<input
						type="time"
						value={startTime}
						onChange={(e) => setStartTime(e.target.value)}
						className="w-full p-2 border rounded-md"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 mb-2">End Time</label>
					<input
						type="time"
						value={endTime}
						onChange={(e) => setEndTime(e.target.value)}
						className="w-full p-2 border rounded-md"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 mb-2">Client Name</label>
					<input
						type="text"
						value={clientName}
						onChange={(e) => setClientName(e.target.value)}
						className="w-full p-2 border rounded-md"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 mb-2">Description</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="w-full p-2 border rounded-md"
						required
					/>
				</div>
				<div className="flex justify-end space-x-2">
					<button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
						Cancel
					</button>
					<button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
						Save Slot
					</button>
				</div>
			</form>
		</div>
	);
};

export default TimeSlotForm;
