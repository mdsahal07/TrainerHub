import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileComponent = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fname: '',
    username: '',
    bio: '',
    goals: '',
    rating: '',
    qualifications: '', // Only for trainer
    experience: '', // Only for trainer
    availability: '', // Only for trainer
  });

  useEffect(() => {
    // Fetch user profile data (either Client or Trainer)
    const fetchProfile = async () => {
      try {

        const token = localStorage.getItem('token'); // Ensure the token is stored in localStorage
        const response = await axios.get("http://localhost:5000/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        console.log("Fetched response data", response.data);
        setUser(response.data);
        setFormData({
          ...response.data,
        });
      } catch (error) {
        console.error('Error fetching profile data', error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const token = localStorage.getItem('token'); // Ensure the token is stored in localStorage
      if (!token) {
        console.error("No token found. User is not authorized.");
        return;
      }
      await axios.put('http://localhost:5000/user/profile', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(formData);
      setEditMode(false); // Turn off edit mode
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-component">
      <h1>{editMode ? 'Edit Profile' : 'View Profile'}</h1>
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            placeholder="Name"
          />

          <label htmlFor="username">username</label>
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />

          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Bio"
          />

          <label htmlFor="goals">Goals</label>
          <textarea
            id="goals"
            name="goals"
            value={formData.goals}
            onChange={handleChange}
            placeholder="Goals"
          />

          {user.role === 'trainer' && (
            <>

              <label htmlFor="qualification">Qualification</label>
              <textarea
                id="qualification"
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                placeholder="Qualifications"
              />
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Experience"
              />
              <textarea
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                placeholder="Availability"
              />
            </>
          )}
          <button type="submit">Save Changes</button>
        </form>
      ) : (
        <div>
          <p>{user.fname}</p>
          <p>{user.username}</p>
          <p>{user.bio}</p>
          <p>{user.goals}</p>
          {user.role === 'trainer' && (
            <>
              {user.qualifications && <p>{user.qualifications}</p>}
              {user.experience && <p>{user.experience}</p>}
              {user.availability && <p>{user.availability}</p>}
            </>
          )}
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
