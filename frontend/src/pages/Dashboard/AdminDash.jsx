import React, { useState, useEffect } from 'react';
import Card from '../../components/Cards';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/admin/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
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
      title: 'Registered Clients',
      description: 'View registered clients and take actions',
      path: '/clients',
      icon: <i className="fas fa-users"></i>,
    },
    {
      title: 'Registered Trainers',
      description: "View registered trainers and take actions",
      path: '/trainers',
      icon: <i className="fas fa-users"></i>,
    },
    {
      title: 'Feedback and Reports',
      description: 'Feedbacks / reports from users(clients & trainers)',
      path: '',
      icon: <i className="fas fa-envelope"></i>,
    },
    {
      title: 'App Feedback',
      description: 'Feedback in got for the app',
      path: '',
      icon: <i className="fas fa-users"></i>,
    },
  ];

  if (loading) return <div className="flex jusify-center items-center h-screen">< p className="text-xl" > Loading...</p ></div >;
  if (error) return <div className="flex justify-center items-center h-screen"><p className="text-xl text-red-500">{error}</p></div>;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen p-8">

      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">
          Welcome back, {stats?.name || 'Admin'}!
        </h2>
      </header>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </div>
  );
};

export default AdminDashboard;
