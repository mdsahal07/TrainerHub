import React, { useState } from "react";
import AuthService from "../services/AuthService"; // assuming AuthService is set up for API calls
import { useNavigate } from "react-router-dom";

function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.register({ firstname, lastname, username, email, password });
      console.log("User registered successfully:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Register;
