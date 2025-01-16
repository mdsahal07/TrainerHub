import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import CalendarComponent from '../components/Calender.jsx';
import TimeSlotsTable from '../components/TimeSlotTable.jsx';

const TrainerSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [trainerId, setTrainerId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setTrainerId(decoded.userId);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (trainerId) {
      const fetchSchedule = async () => {
        try {
          const { data } = await axios.get(`http://localhost:5000/schedule/${trainerId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          setTimeSlots(data);
        } catch (error) {
          console.error("Error fetching schedules:", error);
        }
      };
      fetchSchedule();
    }
  }, [trainerId, selectedDate]);
  const addNewSlot = (newSlot) => {
    setTimeSlots((prevSlots) => [...prevSlots, newSlot]);
  };
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Schedule</h2>
      <CalendarComponent selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <TimeSlotsTable selectedDate={selectedDate} timeSlots={timeSlots} trainerId={trainerId} addNewSlot={addNewSlot} />
    </div>
  );
};

export default TrainerSchedule;
