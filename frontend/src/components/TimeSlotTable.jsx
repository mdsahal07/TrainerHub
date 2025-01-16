import React, { useState } from 'react';
import TimeSlot from './TimeSlot';
import TimeSlotForm from './TimeSlotForm';

const TimeSlotsTable = ({ selectedDate, timeSlots, trainerId, addNewSlot }) => {
	const [showForm, setShowForm] = useState(false);

	const handleAddSlot = () => {
		setShowForm(true);
	};

	const handleCloseForm = () => {
		setShowForm(false);
	};

	return (
		<div className="mt-4">
			<h2 className="text-xl font-semibold">Available Slots for {selectedDate.toDateString()}</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{timeSlots.length === 0 ? (
					<h4>You didn't schedule any meeting for {selectedDate.toDateString()}</h4>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{timeSlots.map((slot) => (
							<TimeSlot key={slot._id} slot={slot} />
						))}
					</div>
				)}
				{showForm ? (
					<TimeSlotForm trainerId={trainerId} selectedDate={selectedDate} onClose={handleCloseForm} addNewSlot={addNewSlot} />
				) : (
					<button onClick={handleAddSlot} className="mt-4 bg-blue-500 text-white p-2 rounded">+ Add Slot</button>
				)}
			</div>
		</div>
	);
};

export default TimeSlotsTable;
