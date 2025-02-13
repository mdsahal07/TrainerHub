import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Cards';

const ClientList = ({ trainerId }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/trainerDash/your-clients', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClients(response.data.clients);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch clients');
        setLoading(false);
      }
    };

    fetchClients();
  }, [trainerId]); // Re-fetch if trainerId changes

  if (loading) return <p>Loading clients...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {clients.map((client) => (
        <Card
          key={client._id}
          title={client.fname}
          description={client.goals || 'No goals set'}
          path={`#`}
          onClick={() => (window.location.href = `/clients/${client._id}`)}
          icon={<i className="fas fa-user"></i>}
        />

      ))}
    </div>
  );
};

export default ClientList;
