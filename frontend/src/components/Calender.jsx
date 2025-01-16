import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = ({ selectedDate, setSelectedDate }) => {
	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	return (
		<Calendar onChange={handleDateChange} value={selectedDate} />
	);
};

export default CalendarComponent;
