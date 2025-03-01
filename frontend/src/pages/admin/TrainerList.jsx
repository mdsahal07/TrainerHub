import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrainerList = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/admin/trainers', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTrainers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch trainers');
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  const handleSuspend = async (trainerId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/admin/users/suspend/${trainerId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrainers(trainers.map(trainer => trainer._id === trainerId ? { ...trainer, status: 'suspended' } : trainer));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to suspend trainer');
    }
  };

  const handleDelete = async (trainerId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/admin/users/${trainerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrainers(trainers.filter(trainer => trainer._id !== trainerId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete trainer');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><p className="text-xl">Loading...</p></div>;
  if (error) return <div className="flex justify-center items-center h-screen"><p className="text-xl text-red-500">{error}</p></div>;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen p-8">
      <h2 className="flex justify-center text-4xl font-semibold text-gray-800 mb-8">Registered Trainers</h2>
      <div className="bg-gray-300 shadow-md rounded-lg p-6">
        <ul>
          {trainers.map((trainer) => (
            <li key={trainer._id} className="rounded-xl border-b border-gray-200 py-4 flex justify-between items-center">
              <div>
                <p className="text-lg font-medium text-gray-800">{trainer.fname}</p>
                <p className="text-gray-600">{trainer.email}</p>
              </div>
              <div>
                <button
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition duration-200 mr-2"
                  onClick={() => handleSuspend(trainer._id)}
                  disabled={trainer.status === 'suspended'}
                >
                  {trainer.status === 'suspended' ? 'Suspended' : 'Suspend'}
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-200"
                  onClick={() => handleDelete(trainer._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrainerList;
