import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import CalendarComponent from '../components/Calender.jsx';
import TimeSlot from '../components/TimeSlot.jsx';
import TimeSlotForm from '../components/TimeSlotForm.jsx';

const TrainerSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [trainerId, setTrainerId] = useState(null);
  const [showForm, setShowForm] = useState(false);

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
      fetchSchedule();
    }
  }, [trainerId, selectedDate]);

  const fetchSchedule = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/schedule/${trainerId}/date/${selectedDate.toISOString()}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTimeSlots(data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  const addNewSlot = (newSlot) => {
    setTimeSlots((prevSlots) => [...prevSlots, newSlot]);
    setShowForm(false)
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowForm(false);
  };

  const deleteSlot = async (slotId) => {
    try {
      await axios.delete(`http://localhost:5000/schedule/delete/${slotId}`);
      setTimeSlots((prevSlots) => prevSlots.filter(slot => slot._id !== slotId));
    } catch (error) {
      console.error("Error deleting slot:", error);
    }
  };
  return (
    <div className="bg-gray-300">
      <div className="p-4">
        <h2 className="flex justify-center text-4xl font-bold font-extrabold mb-4">Manage Schedule</h2>
        <CalendarComponent selectedDate={selectedDate} setSelectedDate={handleDateClick} />
        <h3 className=" text-2xl font-bold mb-2">Time Slots for {selectedDate.toDateString()}</h3>
        <button onClick={() => setShowForm(true)} className="bg-green-500 text-white p-2 rounded-lg">Add Slot +</button>
        <div className="mt-4 flex ">
          {timeSlots.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">

              {timeSlots.map(slot => (
                < TimeSlot key={slot._id} slot={slot} deleteSlot={deleteSlot} />
              ))}
            </div>
          ) : (
            <div>
              <p>No slots booked for this date.</p>
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

      </div>
    </div>
  );
};

export default TrainerSchedule;
