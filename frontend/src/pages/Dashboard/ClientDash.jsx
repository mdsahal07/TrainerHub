import React, { useState, useEffect } from 'react';
import Card from '../../components/Cards';
import axios from 'axios';

const ClientDashboard = () => {
  const [stats, setStats] = useState();
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const response = await axios.get('http://localhost:5000/clientDash/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { name, progress } = response.data;

        // Set data for dashboard
        setStats(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch dashboard data');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: 'Explore Trainers',
      description: 'Find and connect with top trainers',
      path: '/search/top-trainers',
      icon: <i className="fas fa-users"></i>,
    },
    {
      title: 'Your Trainer',
      description: 'Trainer profile (Rate & feedback)',
      path: '/trainer',
      icon: <i className="fas fa-dumbbell"></i>,
    },
    {
      title: 'Meeting',
      description: 'Face-to-face meeting with your trainer',
      path: '/video-call',
      icon: <i className="fas fa-video"></i>,
    },
  ];

  if (loading) return <div className="flex justify-center items-center h-screen"><p className="text-xl">Loading...</p></div>;
  if (error) return <div className="flex justify-center items-center h-screen"><p className="text-xl text-red-500">{error}</p></div>;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">
          Welcome back, {stats?.name || 'User'}!
        </h2>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200">
          Update Profile
        </button>
      </header>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <Card key={index} title={card.title} description={card.description} path={card.path} icon={card.icon} />
        ))}
      </div>

      {/* Progress Chart */}
      <div className="mt-12 p-8 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">Your Progress</h3>
        {/* You can add a progress chart component or visualization here */}
        <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Progress chart will be displayed here.</p>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
