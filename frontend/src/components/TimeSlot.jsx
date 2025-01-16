import React from 'react';

const TimeSlot = ({ slot }) => {
	return (
		<div className="p-4 border rounded shadow">
			<p>Client: {slot.clientName}</p>
			<p>Time: {new Date(slot.startTime).toLocaleTimeString()} - {new Date(slot.endTime).toLocaleTimeString()}</p>
			<p>Description: {slot.description}</p>
		</div>
	);
};

export default TimeSlot;
