import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center p-10">
      {/* Hero Section */}
      <section className="bg-cover bg-center h-screen" style={{ backgroundImage: `url('/gym.jpg')` }}>
        <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center text-center text-white p-10">
          <h1 className="text-5xl font-bold mb-4">Welcome to TrainerHub</h1>
          <p className="text-xl mb-8">Your platform for fitness and growth.</p>
          <div>
            <Link to="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Get Started</Link>
            <Link to="/about" className="bg-transparent border border-white hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded">Learn More</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="text-center p-10">
        <h2 className="text-4xl font-bold mb-6">Why Choose TrainerHub?</h2>
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <i className="fas fa-dumbbell text-4xl mb-4"></i>
              <h3 className="text-2xl font-bold mb-2">Personalized Training</h3>
              <p>Get customized workout plans tailored to your goals and fitness level.</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <i className="fas fa-heartbeat text-4xl mb-4"></i>
              <h3 className="text-2xl font-bold mb-2">Health Monitoring</h3>
              <p>Track your health metrics and monitor your progress over time.</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <i className="fas fa-users text-4xl mb-4"></i>
              <h3 className="text-2xl font-bold mb-2">Community Support</h3>
              <p>Join a community of fitness enthusiasts and get support from peers.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
