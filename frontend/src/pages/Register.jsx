import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
  const [fname, setfname] = useState("");
  const [username, setUName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Reg: ", { fname, username, email, password, role });

    const userData = { fname, username, email, password, role };
    try {
      const response = await axios.post("http://localhost:5000/auth/register", userData);
      console.log("First section");
      alert(response.data.message);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert(error.response?.data.message || "An error occurred while registering");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('/equip.jpg')` }}>
      <h1 className="text-4xl font-bold text-white mb-6">TrainerHub</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 border border-gray-700 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-white text-center">Register</h2>

        <label htmlFor="fname" className="block text-white mb-1">Name</label>
        <input
          type="text"
          id="fname"
          placeholder="Enter your name"
          value={fname}
          onChange={(e) => setfname(e.target.value)}
          className="w-full p-2 mb-3 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="username" className="block text-white mb-1">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUName(e.target.value)}
          className="w-full p-2 mb-3 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="email" className="block text-white mb-1">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="password" className="block text-white mb-1">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="role" className="block text-white mb-1">Role</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="client">Client</option>
          <option value="trainer">Trainer</option>
        </select>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
        <Link to="/login" className="text-white hover:underline" >Already have an account?</Link>
      </form>
    </div>
  );
}

export default Register;
