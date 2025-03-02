import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="bg-gray-400 p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center text-black border-b pb-4">About Trainer Hub</h1>
        <div className="space-y-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            Trainer Hub is a platform designed to connect trainers with clients, providing a comprehensive solution for
            managing training sessions, tracking progress, and fostering communication between trainers and their clients.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our mission is to empower trainers with the tools they need to deliver exceptional training experiences and help
            clients achieve their fitness goals. Whether you are a personal trainer, fitness coach, or wellness expert,
            Trainer Hub is here to support you every step of the way.
          </p>
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Team</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Trainer Hub was created by a dedicated team of fitness enthusiasts and technology experts who are passionate
              about making a positive impact on the fitness industry. Our team is committed to continuously improving the
              platform and providing the best possible experience for our users.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Contact Us</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              If you have any questions, feedback, or suggestions, please feel free to reach out to us at
              <a href="mailto:support@trainerhub.com" className="text-blue-500 hover:underline ml-1">support@trainerhub.com</a>.
              We would love to hear from you!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
