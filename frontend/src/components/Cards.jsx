import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cards = ({ title, description, path, icon, onClick, specialization }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (path) {
      navigate(path);
    }
  };
  return (
    <div className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition-transform transform hover:scale-105 h-48"
      onClick={handleClick}>
      <div className="flex justify-center items-center space-x-4">
        <div>
          <div className="flex justify-center text-blue-500 text-3xl">{icon}</div>
          <h3 className="flex justify-center text-xl font-bold m-4">{title}</h3>
          <p className="text-gray-600">{description}</p>
          <p className="text-gray-600 font-bold">{specialization}</p>
        </div>
      </div>

    </div>
  );
}

export default Cards;
