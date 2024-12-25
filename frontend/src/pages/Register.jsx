import { useState } from 'react';
import axios from 'axios';

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
      alert(error.response?.data.message || "An error occured while registering");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900" >
      <h1 className="text-3xl font-bold text-white mb-8">Trainer Hub</h1>
      <form onSubmit={handleSubmit}
        className=" bg-gray-800 p-6 border rounded-lg shadow-md max-w-md ">

        <h2 className="text-2xl font-bold mb-4 text-white text-center">Register</h2>

        <label htmlFor="fname" className="text-white">Name</label>
        <input type="text" id="fname" placeholder="Enter your name" value={fname} name="fname" onChange={(e) => setfname(e.target.value)}
          className="border border-gray-700 bg-gray-700 text-white p-2 rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <label htmlFor="name" className="text-white">username</label>
        <input type="text" id="name" placeholder="Enter username" value={username} name="UName" onChange={(e) => setUName(e.target.value)}
          className="border border-gray-700 bg-gray-700 text-white p-2 rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <label htmlFor="email" className="text-white">Email</label>
        <input type="email" id="email" placeholder="Enter your email" value={email} name="email" onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-700 bg-gray-700 text-white p-2 rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <label htmlFor="password" className="text-white">Password</label>
        <input type="password" id="password" placeholder="Enter password" value={password} name="password" onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-700 bg-gray-700 text-white p-2 rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <label id="role" className="text-white">Role</label>
        <select id="role" value={role} onChange={(e) => setRole(e.target.value)}
          className="border border-gray-700 bg-gray-700 text-white p-2 rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="client">Client</option>
          <option value="trainer">Trainer</option>
        </select>
        <button type="submit" className="bg-blue-700 rounded text-white flex item-center px-4 py-2 hover:bg-blue-900">Submit</button>
      </form>
    </div>)
}

export default Register;
