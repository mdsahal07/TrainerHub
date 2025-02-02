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
		<div className="p-4 border rounded shadow">
			<form onSubmit={handleSubmit}>
				<div>
					<label>Start Time:</label>
					<input
						type="time"
						value={startTime}
						onChange={(e) => setStartTime(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>End Time:</label>
					<input
						type="time"
						value={endTime}
						onChange={(e) => setEndTime(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Client Name:</label>
					<input
						type="text"
						value={clientName}
						onChange={(e) => setClientName(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Description:</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
				</div>
				<button type="submit">Save Slot</button>
				<button type="button" onClick={onClose}>Cancel</button>
			</form>
		</div>
	);
};

export default TimeSlotForm;
