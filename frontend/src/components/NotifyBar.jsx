import React, { useEffect, useState } from 'react';
import socket from '../socket.js';
import { jwtDecode } from 'jwt-decode';

const NotifyBar = ({ visible, onClose }) => {
  const [liveNotifications, setLiveNotifications] = useState([]);
  const [storedNotifications, setStoredNotifications] = useState([]);
  const [userId, setUserId] = useState('');
  const [showStoredNotifications, setShowStoredNotifications] = useState(false);
  const [vcNotif, setVcNotif] = useState([]);

  const loadNotifications = async () => {
    try {
      const response = await fetch(`http://localhost:5000/notify/${userId}`);
      const data = await response.json();
      setStoredNotifications(data);
    } catch (error) {
      console.error('Error fetching stored notifications:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId);
    }
  }, []);


  useEffect(() => {
    if (userId) {
      console.log("User Id: ", userId);
      loadNotifications();
    }

    const handleReceiveNotification = (notification) => {
      console.log("Live Notification: ", notification);
      setLiveNotifications((prevNotifications) => [notification, ...prevNotifications]);
    };

    socket.on('receiveNotification', handleReceiveNotification);

    // Clean up the event listener on component unmount
    return () => {
      socket.off('receiveNotification', handleReceiveNotification);
    };
  }, [userId]);

  return (
    <div className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform ${visible ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 z-50`}>
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">&times;</button>
      </div>
      <div className="p-4">
        <h3 className="text-md font-semibold">New Notifications</h3>
        {liveNotifications.length > 0 ? (
          liveNotifications.map((notif, index) => (
            <div key={index} className="mb-4 p-2 border rounded">
              <p><strong>Sender:</strong> {notif.trainerName || 'Unknown'}</p>
              <p><strong>Message:</strong> {notif.description || 'No description'}</p>
              <p><strong>Meeting:</strong> {notif.startTime} to {notif.endTime}</p>
            </div>
          ))
        ) : (
          <p>No new notifications</p>
        )}
        <div>
          <button
            onClick={() => setShowStoredNotifications(!showStoredNotifications)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            {showStoredNotifications ? 'All Notifications' : 'All Notifications'}
          </button>
          {showStoredNotifications && (
            <div className="mt-4">
              {storedNotifications.length > 0 ? (
                storedNotifications.map((notif, index) => (
                  <div key={index} className="mb-4 p-2 border rounded">
                    <p><strong>Sender:</strong> {notif.trainer || 'Unknown'}</p>
                    <p><strong>Message:</strong> {notif.message || 'No description'}</p>
                    <p><strong>Meeting:</strong> {notif.startTime} to {notif.endTime}</p>
                  </div>
                ))
              ) : (
                <p>No stored notifications</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotifyBar;
