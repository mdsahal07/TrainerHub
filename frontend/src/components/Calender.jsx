import React from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = ({ selectedDate, setSelectedDate }) => {
	return (
		<div className="flex justify-center p-4">
			<Calendar
				onChange={setSelectedDate}
				value={selectedDate}
				className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl"
				tileClassName="h-16 bg-blue-100 hover:bg-blue-200"
			/>
		</div>
	);
};

export default CalendarComponent;
