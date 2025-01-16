import React, { useState, useEffect } from 'react';
import Card from '../../components/Cards';
import ProgressChart from '../../components/ProgressChart';
import axios from 'axios';
import ClientList from '../../components/YourClients.jsx';

const TrainerDashboard = () => {
  const [stats, setStats] = useState(null); // Trainer's stats (name, progress, etc.)
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [chartData, setChartData] = useState(null); // Chart data

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const response = await axios.get('http://localhost:5000/trainerDash/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { name, progress, totalClients, pendingRequests } = response.data;

        // Set data for dashboard
        setStats({ name, totalClients, pendingRequests });
        setChartData({
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [
            {
              label: 'Client Progress Over Time',
              data: progress || [5, 15, 25, 35],
              borderColor: '#FFA726',
              backgroundColor: 'rgba(255, 167, 38, 0.2)',
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
      title: 'Your Clients',
      description: 'View and manage your clients',
      path: '#client-list-section',
      icon: <i className="fas fa-users"></i>,
    },
    {
      title: 'Pending Requests',
      description: `You have ${stats?.pendingRequests || 0} new requests`,
      path: '/pending-req',
      icon: <i className="fas fa-envelope"></i>,
    },
    {
      title: 'Schedule',
      description: 'Manage your schedule and meetings',
      path: '/schedule/:trainerId',
      icon: <i className="fas fa-calendar-alt"></i>,
    },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-gray-100 min-h-screen p-8 relative">
      {/* Header */}
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-light">
          Welcome back, {stats?.name || 'Trainer'}!
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
          <Card
            key={index}
            title={card.title}
            description={card.description}
            path={card.path}
            icon={card.icon}
          />
        ))}
      </div>

      {/* Progress Chart */}
      <div className="mt-8 bg-white p-4 shadow rounded">
        <h3 className="text-lg font-semibold mb-4">Client Progress Overview</h3>
        <div className="h-64 flex justify-center items-center border rounded">
          <ProgressChart data={chartData} title="Progress of Your Clients" />
        </div>
      </div>

      {/*Your Clients */}
      <div id="client-list-section" className="mt-8 bg-white p-4 shadow rounded">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Your Clients</h3>
        </div>
        <ClientList trainerId={stats?.trainerId} />
      </div>
    </div>
  );
};

export default TrainerDashboard;
