import React, { useState, useEffect } from 'react';
import Card from '../../components/Cards';
import axios from 'axios';
import ClientList from '../../components/YourClients.jsx';
import Modal from '../../components/Modal.jsx';
import VideoCall from '../../components/VideoCall.jsx';
import ProfileUpdate from '../../components/Profile.jsx';
import { useNavigate } from 'react-router-dom';

const TrainerDashboard = () => {
  const [stats, setStats] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activities, setActivities] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [goals, setGoals] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);
  const [videoCallRoom, setVideoCallRoom] = useState('');
  const [isProfileModal, setProfileUpdateModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/trainerDash/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { name, totalClients, pendingRequests, recentActivities, notifications, goals, upcomingSessions } = response.data;

        // Set data for dashboard
        setStats({ name, totalClients, pendingRequests });
        setActivities(recentActivities || []);
        setNotifications(notifications || []);
        setGoals(goals || []);
        setUpcomingSessions(upcomingSessions || []);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch dashboard data');
        setLoading(false);
      }
    };
    const fetchAcceptedClients = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/trainerDash/your-clients', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Response data : ", response.data.clients);
        setClients(response.data.clients || []);
        console.log("Check clients : ", clients);
      } catch (err) {
        console.error('Failed to fetch clients:', err);
      }
    };

    fetchStats();
    fetchAcceptedClients();
  }, []);

  const handleAddClientClick = () => {
    setIsModalOpen(true);
  };

  const handleClientSelection = (clientId) => {
    setSelectedClients((prev) =>

      prev.includes(clientId) ? prev.filter((id) => id !== clientId) : [...prev, clientId]
    );
  };

  const handleStartVideoCall = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/videoCall/start',
        { clientIds: selectedClients },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Response data :", response.data);
      const { roomName } = response.data;
      console.log("Roomname : ", roomName);
      setIsModalOpen(false);
      setSelectedClients([]);
      setVideoCallRoom(roomName);
      console.log("Video call room : ", videoCallRoom);
    } catch (err) {
      console.error('Failed to start video call:', err);
    }
  };

  const handleProfileUpdate = () => {
    setProfileUpdateModal(true);
  }

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

  if (loading) return <div className="flex justify-center items-center h-screen">< p className="text-xl" > Loading...</p ></div >;
  if (error) return <div className="flex justify-center items-center h-screen"><p className="text-xl text-red-500">{error}</p></div>;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">
          Welcome back, {stats?.name || 'Trainerr'}!
        </h2>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          onClick={handleProfileUpdate}>
          Update Profile
        </button>
      </header>

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

      {selectedClient && (
        <ClientProf client={selectedClient} onClose={() => setSelectedClient(null)} />
      )}

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Sessions This Week</h3>
          <p className="text-3xl">{stats?.sessionsThisWeek || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <i className="fas fa-video text-3xl text-blue-500"></i>
              <h3 className="text-xl font-semibold">Video Call</h3>
            </div>
            <button className="bg-blue-500 text-white px-2 py-1 rounded-full shadow-md hover:bg-blue-600 transition duration-200"
              onClick={handleAddClientClick}
            >
              + Add Client
            </button>
          </div>
          <p className="text-gray-600">Schedule and manage video calls with your clients.</p>
        </div>
      </div>


      <div id="client-list-section" className="mt-12 p-8 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold">Your Clients</h3>
        </div>
        <ClientList trainerId={stats?.trainerId} />
      </div>


      {/* Recent Activities */}
      <div className="mt-12 p-8 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">Recent Activities</h3>
        <ul className="list-disc pl-5">
          {activities.map((activity, index) => (
            <li key={index} className="mb-2">{activity}</li>
          ))}
        </ul>
      </div>

      {videoCallRoom && <VideoCall roomName={videoCallRoom} />}

      {/* Upcoming Sessions */}
      <div className="mt-12 p-8 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">Upcoming Sessions</h3>
        <ul className="list-disc pl-5">
          {upcomingSessions.map((session, index) => (
            <li key={index} className="mb-2">{session}</li>
          ))}
        </ul>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-2xl font-semibold mb-4">Select Clients for Video Call</h3>
        <ul className="list-disc pl-5 max-h-64 overflow-y-auto">
          {clients.map((client) => (
            <li key={client._id} className="mb-2 flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedClients.includes(client._id)}
                onChange={() => handleClientSelection(client._id)}
              />
              {client.username}
            </li>
          ))}
        </ul>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          onClick={handleStartVideoCall}
        >
          Start Video Call
        </button>
      </Modal>
      <ProfileUpdate
        isOpen={isProfileModal}
        onClose={() => setProfileUpdateModal(false)}
      />

    </div>

  );
};

export default TrainerDashboard;
