import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const ProfileUpdate = ({ isOpen, onClose }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({
    fname: '',
    username: '',
    bio: '',
    goals: '',
    qualifications: '', // Only for trainer
    experience: '', // Only for trainer
    availability: '', // Only for trainer
    specialization: '',
  });

  useEffect(() => {
    if (isOpen) {
      const fetchProfile = async () => {
        try {
          const token = localStorage.getItem('token');
          const decodedToken = jwtDecode(token);
          setRole(decodedToken.role);
          const response = await axios.get("http://localhost:5000/user/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
          setFormData({
            ...response.data,
          });
        } catch (error) {
          console.error('Error fetching profile data', error);
        }
      };
      fetchProfile();
    }
  }, [isOpen]);
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
      onClose(); // Close modal after saving changes
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-white text-3xl font-semibold mb-6 text-center">Edit Profile</h1>
        {user ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-white font-medium">Name</label>
              <input
                id="name"
                type="text"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                placeholder="Name"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="username" className="block text-white font-medium">Username (cannot be changed)</label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                readOnly
                className="w-full text-gray-500 px-3 py-2 border rounded-md bg-gray-100"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="bio" className="block text-white font-medium">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Bio"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="goals" className="block text-white font-medium">Goals</label>
              <textarea
                id="goals"
                name="goals"
                value={formData.goals}
                onChange={handleChange}
                placeholder="Goals"
                className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {role === 'trainer' && (
              <>
                <div className="mb-4">
                  <label htmlFor="qualifications" className="block text-white font-medium">Qualifications</label>
                  <textarea
                    id="qualifications"
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleChange}
                    placeholder="Qualifications"
                    className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label htmlFor="experience" className="block text-white font-medium">Experience</label>
                  <textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Experience"
                    className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label htmlFor="specialization" className="block text-white font-medium">Specialization</label>
                  <select
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Specialization</option>
                    <option value="calisthenics">Calisthenics</option>
                    <option value="bodybuilding">Bodybuilding</option>
                    <option value="yoga">Yoga</option>
                    <option value="crossfit">Crossfit</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="availability" className="block text-white font-medium">Availability :</label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        id="Available"
                        type="radio"
                        name="availability"
                        value="available"
                        checked={formData.availability == "available"}
                        onChange={handleChange}
                        placeholder="Availability"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <label htmlFor="Available" className="text-white font-medium">Available</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="NotAvailable"
                        type="radio"
                        name="availability"
                        value="notAvailable"
                        checked={formData.availability == "notAvailable"}
                        onChange={handleChange}
                        placeholder="Availability"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <label htmlFor="NotAvailable" className="text-white font-medium" >NotAvailable</label>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default ProfileUpdate;
