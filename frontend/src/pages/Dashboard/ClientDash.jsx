import React, { useState, useEffect } from 'react';
import Card from '../../components/Cards';
import ProgressChart from '../../components/ProgressChart';
import axios from 'axios';

const ClientDashboard = () => {
  const [stats, setStats] = useState(null); // Client's stats (name, progress)
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [chartData, setChartData] = useState(null); // Chart data

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
        setChartData({
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [
            {
              label: 'Progress Over Time',
              data: progress || [10, 20, 30, 40],
              borderColor: '#42A5F5',
              backgroundColor: 'rgba(66, 165, 245, 0.2)',
            },
          ],
        });
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
      description: 'Trainer profile(Rate & feedback)',
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-gray-100 min-h-screen p-8 relative z-10">
      {/* Header */}
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-light">
          Welcome back, {stats?.name || 'User'}!
        </h2>
        {stats?.profilePicture ? (
          <img
            src={stats.profilePicture}
            alt="Profile"
            className="h-10 w-10 rounded-full cursor-pointer"
            onClick={() => (window.location.href = '/profile')} // Navigate to profile page
          />
        ) : (
          <div
            className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer"
            onClick={() => (window.location.href = '/profile')} // Navigate to profile page
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="h-6 w-6"
            >
              <path
                d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 1.2c-2.7 0-8.4 1.4-8.4 4.2v1.2c0 .6.6 1.2 1.2 1.2h14.4c.6 0 1.2-.6 1.2-1.2v-1.2c0-2.8-5.7-4.2-8.4-4.2z"
              />
            </svg>
          </div>
        )}
      </header>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Card key={index} title={card.title} description={card.description} path={card.path} icon={card.icon} />
        ))}
      </div>

      {/* Progress Chart */}
      <div className="mt-8 bg-white p-4 shadow rounded">
        <h3 className="text-lg font-semibold mb-4">Your Progress Chart</h3>
        <div className="h-64 flex justify-center items-center border rounded">
          <ProgressChart data={chartData} title="Your Progress Chart" />
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
