import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/admin/clients', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClients(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch clients');
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleSuspend = async (clientId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/admin/users/suspend/${clientId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients(clients.map(client => client._id === clientId ? { ...client, status: 'suspended' } : client));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to suspend client');
    }
  };

  const handleDelete = async (clientId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/admin/users/${clientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients(clients.filter(client => client._id !== clientId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete client');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><p className="text-xl">Loading...</p></div>;
  if (error) return <div className="flex justify-center items-center h-screen"><p className="text-xl text-red-500">{error}</p></div>;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen p-8">
      <h2 className="flex justify-center text-4xl font-semibold text-gray-800 mb-8">Registered Clients</h2>
      <div className="bg-gray-300 shadow-md rounded-lg p-6">
        <ul>
          {clients.map((client) => (
            <li key={client._id} className="rounded-xl border-b border-gray-200 py-4 flex justify-between items-center">
              <div>
                <p className="text-lg font-medium text-gray-800">{client.name}</p>
                <p className="text-gray-600">{client.email}</p>
              </div>
              <div>
                <button
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition duration-200 mr-2"
                  onClick={() => handleSuspend(client._id)}
                  disabled={client.status === 'suspended'}
                >
                  {client.status === 'suspended' ? 'Suspended' : 'Suspend'}
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-200"
                  onClick={() => handleDelete(client._id)}
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

export default ClientsList;
