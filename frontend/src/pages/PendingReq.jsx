import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/request/pending-req', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(response.data);
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
        { clientId, action }, // 'accept' or 'decline'
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Pending Requests</h1>
      <ul className="space-y-4">
        {requests.map((req) => (
          <li key={req._id} className="p-4 bg-white shadow rounded flex justify-between items-center">
            <div>
              <p className="font-semibold">
                <button
                  onClick={() => navigate(`/clients/${req.clientId._id}`)}
                  className="text-blue-500 underline"
                >
                  {req.clientId.fname} {req.clientId.lname}
                </button>
              </p>
              <p>Email: {req.clientId.email}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleResponse(req.clientId._id, 'accept')}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Accept
              </button>
              <button
                onClick={() => handleResponse(req.clientId._id, 'decline')}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Decline
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingRequests;
