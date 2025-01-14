import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/user/profile">Profile</Link></li>
        <li><Link to="/payment-history">Payment History</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><button onClick={() => { /* handle logout */ }}>Logout</button></li>
        <li><button onClick={() => { /* handle account deletion */ }}>Delete Account</button></li>
      </ul>
    </div>
  );
};

export default Sidebar;
