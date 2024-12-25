import React, { useState, useEffect } from 'react';
import Card from '../../components/Cards';
import axios from 'axios';

const ClientDash = () => {

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming JWT is stored in localStorage
        const response = await axios.get("http://localhost:5000/dashboard/client", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch data");
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Explore Trainers",
      description: "Find and connect with top trainers",
      path: "/explore-trainers",
      icon: <i className="fas fa-dumbbell"></i>,
    },
    {
      title: "Meeting",
      description: "face to face meeting with your trianer",
      path: "/video-call",
      icon: <i className="fas fa-video"></i>,
    },
    {
      title: "Progress Report",
      description: "See your progress",
      path: "/progress",
      icon: <i className="fas fa-chart-line"></i>,
    },
  ];
  if (error) return <p className="text-red-500">{error}</p>;
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h2 className="text-2xl font-light mb-4">Welcome back, !</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((cards, index) => (
          <Card
            key={index}
            title={cards.title}
            description={cards.description}
            path={cards.path}
            icon={cards.icon}
          />
        ))}
      </div>
    </div>
  )
}


export default ClientDash;
