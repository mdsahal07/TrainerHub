import React, { useState, useEffect } from 'react';
import Card from '../../components/Cards';
import axios from 'axios';
import NotifyBar from '../../components/NotifyBar.jsx';
import socket from '../../socket.js';
import ProfileUpdate from '../../components/Profile.jsx';
import TrainerList from '../../components/YourTrainer.jsx';
import { jwtDecode } from 'jwt-decode';
import VcNotif from '../../components/VcNotif.jsx';
import VideoCall from '../../components/VideoCall.jsx';
import NotificationModal from '../../components/VcNotification.jsx';
import WeightForm from '../../components/WeightForm.jsx';
import WeightChart from '../../components/WeightChart.jsx';


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
  const [notifications, setNotifications] = useState([]);
  const [weightData, setWeightData] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const response = await axios.get('http://localhost:5000/clientDash/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { name, progress } = response.data;

        setStats(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch dashboard data');
        setLoading(false);
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


    const fetchWeightData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/weight/${decodeToken.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWeightData(response.data);
        console.log("Weight : ", weightData);
      } catch (err) {
        console.error('Failed to fetch weight data:', err);
      }
    };

    fetchStats();
    fetchTrainers();
    fetchWeightData();
  }, []);

  const token = localStorage.getItem('token');
  const decodeToken = jwtDecode(token);
  const userId = decodeToken.userId;
  const userModel = decodeToken.role;

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/videocall/${userId}/${userModel}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(response.data);
      console.log("notifications : ", notifications);
      setIsModalOpen(true);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    }
  };

  useEffect(() => {

    const handleReceiveNotification = (notification) => {
      console.log("Live Notification: ", notification);
      if (notification.type === 'videoCall') {
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
    fetchNotifications();
  };

  const handleWeightUpdate = (updatedWeightData) => {
    setWeightData(updatedWeightData);
  };

  const handleJoinCall = (roomName) => {
    setVideoCallRoom(roomName);
    setIsModalOpen(false);
  };

  const handleUpdateProfile = () => {
    setProfileModalOpen(true);
  };

  const handleTrainerSelection = (trainerId) => {
    setSelectedTrainer((prev) =>

      prev.includes(trainerId) ? prev.filter((id) => id !== trainerId) : [...prev, trainerId]
    );
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
      path: '#trainerList',
      icon: <i className="fas fa-dumbbell"></i>,
    },
    {
      title: 'Meeting',
      description: videoCallRoom ? 'Join the ongoing meeting' : 'Face-to-face meeting with your trainer',
      path: videoCallRoom ? `/video-call/${videoCallRoom}` : '#',
      icon: <i className="fas fa-video"></i>,
      onClick: handleMeetingClick,
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
          <Card key={index}
            title={card.title}
            description={card.description}
            path={card.path}
            icon={card.icon}
            onClick={card.onClick} />
        ))}
      </div>
      {isModalOpen && (
        <NotificationModal
          notifications={notifications}
          onClose={() => setIsModalOpen(false)}
          onJoinCall={handleJoinCall}
        />
      )}

      {/* Weight Chart Section */}
      <div className="flex flex-row">
        <div className="mt-12 mr-9 p-8 bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Update Your Weight</h3>
          <WeightForm clientId={userId} onUpdate={handleWeightUpdate} />
        </div>
        <div className="ml-9 mt-12 p-8 bg-white rounded-lg shadow-lg">
          <h3 className="flex justify-center text-3xl font-semibold mb-4 mr-10">Your Progress</h3>
          {weightData ? (
            <WeightChart weightData={weightData} />
          ) : (
            <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Progress chart will be displayed here.</p>
            </div>
          )}
        </div>
      </div>

      {/* Trainer List */}
      <div id="trainerList" className="mt-12 p-8 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold">Your Trainers</h3>
        </div>
        <TrainerList clientId={stats?.clientId} />
      </div>

      {selectedTrainer && (
        <TrainerProfile trainer={selectedTrainer} onClose={() => setSelectedTrainer(null)} />
      )}
      {videoCallRoom && <VideoCall roomName={videoCallRoom} />}

      <VcNotif notifications={notifications} onJoinCall={handleJoinCall} />

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
