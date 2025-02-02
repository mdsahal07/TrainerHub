import React, { useState } from 'react';
import TimeSlot from './TimeSlot';
import TimeSlotForm from './TimeSlotForm';

const TimeSlotsTable = ({ selectedDate, timeSlots, trainerId, addNewSlot, deleteSlot, showForm, setShowForm }) => {

	return (
		<div>
			<h3 className="text-xl font-bold mb-2">Time Slots for {selectedDate.toDateString()}</h3>
			{timeSlots.length > 0 ? (
				<table className="w-full border-collapse">
					<thead>
						<tr>
							<th className="border p-2">Start Time</th>
							<th className="border p-2">End Time</th>
							<th className="border p-2">Client</th>
							<th className="border p-2">Description</th>
							<th className="border p-2">Actions</th>
						</tr>
					</thead>
					<tbody>
						{timeSlots.map(slot => (
							<tr key={slot._id}>
								<td className="border p-2">{new Date(slot.startTime).toLocaleTimeString()}</td>
								<td className="border p-2">{new Date(slot.endTime).toLocaleTimeString()}</td>
								<td className="border p-2">{slot.clientId.name}</td>
								<td className="border p-2">{slot.description}</td>
								<td className="border p-2">
									<button onClick={() => deleteSlot(slot._id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<div>
					<p>No slots booked for this date.</p>
					<button onClick={() => setShowForm(true)} className="bg-green-500 text-white p-2 rounded">+</button>
				</div>
			)}
			{showForm && (
				<TimeSlotForm
					trainerId={trainerId}
					selectedDate={selectedDate}
					onClose={() => setShowForm(false)}
					addNewSlot={addNewSlot}
				/>
			)}
		</div>
	);
};

export default TimeSlotsTable;
