import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ReqButton } from '../components/ReqButton.jsx';

const TrainerProfile = () => {
  const { id } = useParams();
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTrainerDetails = async () => {
      setLoading(true);
      try {
        console.log("id : ", id);
        const trainerRes = await axios.get(`http://localhost:5000/trainer/${id}`);
        setTrainer(trainerRes.data);
      } catch (err) {
        setError('Failed to fetch trainer details');
      }
      setLoading(false);
    };

    fetchTrainerDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    trainer && (
      <div className="trainer-profile">
        <h1>{trainer.fname} {trainer.lname}</h1>
        <p>Specialization: {trainer.specialization}</p>
        <p>Rating: {trainer.rating} ⭐</p>
        <p>Certifications: {trainer.certification}</p>
        <p>Availability: {trainer.availability ? 'Available' : 'Not Available'}</p>

        {/* Conditionally render the ReqButton if the trainer is available */}
        {trainer.availability && <ReqButton trainerId={trainer} />}
      </div>
    )
  );
};

export default TrainerProfile;
