import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Cards';
import ClientProf from './ClientProf.jsx';

const ClientList = ({ trainerId }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClient, setSelectedClient] = useState();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchClients = async () => {
      try {
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
  }, [trainerId]);

  const handleClientClick = async (clientId) => {
    try {
      console.log("Running : ", clientId)
      const response = await axios.get(`http://localhost:5000/clients/${clientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedClient(response.data);
      console.log("Selected Client : ", selectedClient);
    } catch (err) {
      alert('Failed to fetch client details');
      console.error(err);
    }
  };
  if (loading) return <p>Loading clients...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((client) => (
          <Card
            key={client._id}
            title={client.fname}
            description={client.goals || 'No goals set'}
            path={`#`}
            onClick={() => handleClientClick(client._id)}
            icon={<i className="fas fa-user"></i>}
          />

        ))}
      </div>
      {selectedClient && (
        <ClientProf client={selectedClient} onClose={() => setSelectedClient(null)} />
      )}

    </div>
  );
};

export default ClientList;
