import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/auth/forgot-password', { email });

      if (response.data.success) {
        setMessage("Check your email for a reset link");
        setTimeout(() => {
          navigate('/login');
        }, 5000);
      } else {
        setMessage("Email not found")
      }
    } catch (error) {
      console.error("Error during password reset request", error);
      setMessage("An error occured");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="Submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPassword;


