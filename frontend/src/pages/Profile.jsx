import React from 'react';
import Sidebar from '../components/Sidebar';
import ProfileComponent from '../components/Profile';

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <Sidebar />
      <div className="profile-content">
        <ProfileComponent />
      </div>
    </div>
  );
};

export default ProfilePage;
