import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { FaStar } from 'react-icons/fa';

const RateTrainer = () => {
  const { trainerId } = useParams();
  const [ratings, setRatings] = useState([]);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchRatings();
  }, [trainerId]);

  const fetchRatings = async () => {
    try {
      console.log("Trainer id : ", trainerId);
      const response = await axios.get(`http://localhost:5000/ratings/${trainerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRatings(response.data);
    } catch (err) {
      console.error('Failed to fetch ratings:', err);
    }
  };

  const handleRating = async () => {
    try {
      const decodetoken = jwtDecode(token);
      const clientId = decodetoken.userId;
      await axios.post(
        'http://localhost:5000/ratings',
        { trainerId, clientId, rating, review },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert('Rating submitted successfully.');
      setRating(0);
      setReview('');
      fetchRatings();
    } catch (err) {
      alert('Failed to submit rating.');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Rate Trainer</h1>

      <div className="mb-8">
        {ratings.map((r, index) => (
          <div key={index} className="mb-4 p-6 border rounded-lg bg-white shadow-md">
            <div className="flex items-center mb-2">
              {[...Array(5)].map((star, i) => (
                <FaStar
                  key={i}
                  size={40}
                  className={i < r.rating ? 'text-yellow-500' : 'text-gray-300'}
                />
              ))}
            </div>
            <p className="text-gray-700">{r.review}</p>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Submit Your Rating</h2>
        <div className="flex items-center mb-6">
          {[...Array(5)].map((star, i) => (
            <FaStar
              key={i}
              size={40}
              className={i < rating ? 'text-yellow-500' : 'text-gray-300'}
              onClick={() => setRating(i + 1)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
        <textarea
          className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          rows="4"
          placeholder="Write your review (up to 120 words)..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          maxLength={120}
        ></textarea>
        <div className="mt-4 text-right">
          <button
            onClick={handleRating}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RateTrainer;
