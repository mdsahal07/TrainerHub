import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cards = ({ title, description, path, icon }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition-transform transform hover:scale-105"
      onClick={() => navigate(path)}>

      <div className="flex items-center space-x-4">
        <div className="text-blue-500 text-3xl">{icon}</div>
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-gray-600">{description}</p>

        </div>
      </div>

    </div>
  );
}

export default Cards;
