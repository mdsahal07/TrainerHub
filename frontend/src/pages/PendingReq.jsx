import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ClientProf from '../components/ClientProf';

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClient, setSelectedClient] = useState();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/request/pending-req', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(response.data);
        console.log("Requests : ", requests);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch requests');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [token]);

  const handleResponse = async (clientId, action) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/request/respond-req',
        { clientId, action },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message);

      // Remove the processed request from the list
      setRequests((prev) => prev.filter((req) => req.clientId._id !== clientId));
    } catch (err) {
      alert('Failed to process request');
      console.error(err);
    }
  };

  const handleClientClick = async (clientId) => {
    try {
      const response = await axios.get(`http://localhost:5000/clients/${clientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedClient(response.data);
    } catch (err) {
      alert('Failed to fetch client details');
      console.error(err);
    }
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-8 bg-gray-200 min-h-screen">
      <h1 className="flex justify-center text-4xl font-semibold mb-4">Pending Requests</h1>
      <ul className="space-y-4 rounded-xl">
        {requests.map((req) => (
          <li key={req._id} className="p-4 bg-gray-700 shadow rounded flex justify-between items-center rounded-xl">
            <div className="">
              <p className="font-semibold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                >
                  <path
                    d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 1.2c-2.7 0-8.4 1.4-8.4 4.2v1.2c0 .6.6 1.2 1.2 1.2h14.4c.6 0 1.2-.6 1.2-1.2v-1.2c0-2.8-5.7-4.2-8.4-4.2z"
                  />
                </svg>
                <button
                  onClick={() => handleClientClick(req.clientId._id)}
                  className="text-white"
                >
                  {req.clientId.fname}
                </button>
              </p>
              <p className="text-gray-300">Email: {req.clientId.email}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleResponse(req.clientId._id, 'accept')}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl"
              >
                Accept
              </button>
              <button
                onClick={() => handleResponse(req.clientId._id, 'decline')}
                className="bg-gray-900 text-white px-4 py-2 rounded-xl"
              >
                Decline
              </button>
            </div>
          </li>
        ))}
      </ul>
      {selectedClient && (
        <ClientProf client={selectedClient} onClose={() => setSelectedClient(null)} />
      )}
    </div>
  );
};

export default PendingRequests;
