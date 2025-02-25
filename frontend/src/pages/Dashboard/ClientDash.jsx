import React, { useState, useEffect } from 'react';
import Card from '../../components/Cards';
import axios from 'axios';
import Modal from '../../components/Modal.jsx';
import VideoCall from '../../components/VideoCall.jsx';
import NotifyBar from '../../components/NotifyBar.jsx';
import socket from '../../socket.js';
import ProfileUpdate from '../../components/Profile.jsx';

const ClientDashboard = () => {
  const [stats, setStats] = useState();
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [trainers, setTrainers] = useState([]); // Trainers list
  const [selectedTrainer, setSelectedTrainer] = useState(null); // Selected trainer
  const [videoCallRoom, setVideoCallRoom] = useState(null); // State for video call room
  const [notifyBarVisible, setNotifyBarVisible] = useState(false); // State for notification bar
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

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
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch dashboard data');
        setLoading(false);
      }
    };

    const fetchVideoCallRoom = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/clientDash/videoCallRoom', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { roomName } = response.data;
        setVideoCallRoom(roomName);
      } catch (err) {
        console.error('Failed to fetch video call room:', err);
      }
    };

    const fetchTrainers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/clientDash/trainers', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTrainers(response.data.trainers || []);
      } catch (err) {
        console.error('Failed to fetch trainers:', err);
      }
    };

    fetchStats();
    fetchVideoCallRoom();
    fetchTrainers();
  }, []);

  useEffect(() => {
    // Handle incoming notifications
    const handleReceiveNotification = (notification) => {
      console.log("Live Notification: ", notification);
      if (notification.type === 'videoCall') {
        setVideoCallRoom(notification.roomName);
        setNotifyBarVisible(true);
      }
    };

    socket.on('receiveNotification', handleReceiveNotification);

    // Clean up the event listener on component unmount
    return () => {
      socket.off('receiveNotification', handleReceiveNotification);
    };
  }, []);

  const handleMeetingClick = () => {
    setIsModalOpen(true);
  };

  const handleTrainerSelection = (trainerId) => {
    setSelectedTrainer(trainerId);
  };

  const handleStartVideoCall = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/clientDash/startVideoCall',
        { trainerId: selectedTrainer },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { roomName } = response.data;
      setIsModalOpen(false);
      setVideoCallRoom(roomName);
    } catch (err) {
      console.error('Failed to start video call:', err);
    }
  };

  const handleUpdateProfile = () => {
    setProfileModalOpen(true);
  };

  const cards = [
    {
      title: 'Explore Trainers',
      description: 'Find and connect with top trainers',
      path: '/search/top-trainers',
      icon: <i className="fas fa-users"></i>,
    },
    {
      title: 'Your Trainer',
      description: 'Trainer profile (Rate & feedback)',
      path: '/trainer',
      icon: <i className="fas fa-dumbbell"></i>,
    },
    {
      title: 'Meeting',
      description: videoCallRoom ? 'Join the ongoing meeting' : 'Face-to-face meeting with your trainer',
      path: videoCallRoom ? `/video-call/${videoCallRoom}` : '#',
      icon: <i className="fas fa-video"></i>,
      onClick: videoCallRoom ? null : handleMeetingClick,
    },
  ];

  if (loading) return <div className="flex justify-center items-center h-screen"><p className="text-xl">Loading...</p></div>;
  if (error) return <div className="flex justify-center items-center h-screen"><p className="text-xl text-red-500">{error}</p></div>;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">
          Welcome back, {stats?.name || 'User'}!
        </h2>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          onClick={handleUpdateProfile}>
          Update Profile
        </button>
      </header>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <Card key={index} title={card.title} description={card.description} path={card.path} icon={card.icon} onClick={card.onClick} />
        ))}
      </div>

      {/* Progress Chart */}
      <div className="mt-12 p-8 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">Your Progress</h3>
        {/* You can add a progress chart component or visualization here */}
        <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Progress chart will be displayed here.</p>
        </div>
      </div>

      {/* Add Trainer Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-2xl font-semibold mb-4">Select a Trainer for Video Call</h3>
        <ul className="list-disc pl-5 max-h-64 overflow-y-auto">
          {trainers.map((trainer) => (
            <li key={trainer._id} className="mb-2 flex items-center">
              <input
                type="radio"
                name="trainer"
                className="mr-2"
                checked={selectedTrainer === trainer._id}
                onChange={() => handleTrainerSelection(trainer._id)}
              />
              {trainer.name}
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

      {/* Video Call */}
      {videoCallRoom && <VideoCall roomName={videoCallRoom} />}
      <ProfileUpdate
        isOpen={isProfileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
      {/* Notification Bar */}
      <NotifyBar visible={notifyBarVisible} onClose={() => setNotifyBarVisible(false)} />
    </div>
  );
};

export default ClientDashboard;
