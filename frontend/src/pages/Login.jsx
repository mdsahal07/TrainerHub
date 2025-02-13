import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in both email and password");
      return;
    }

    const userData = { email, password };
    try {
      const response = await axios.post("http://localhost:5000/auth/login", userData);
      const { redirectURL, token } = response.data;
      if (redirectURL) {
        localStorage.setItem("token", token);

        navigate(redirectURL);
      } else {
        alert("Redirection URL not provided.");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      if (error.response && error.response.status === 400) {
        setErrorMessage("Wrong password. Please try again.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
    // Call backend API for login
  };

  return (<div>
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900" style={{ backgroundImage: `url('/equip.jpg')` }}>
      <h1 className="text-3xl font-bold text-white mb-8">Trainer Hub</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-md border shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-white text-center">
          Login
        </h2>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-700 bg-gray-700 text-white p-2 rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoComplete="email"
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-700 bg-gray-700 text-white p-2 rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoComplete="current-password"
        />
        {errorMessage && (
          <p className="text-red-500 mb-4">{errorMessage}</p>
        )}
        <Link to="/forgot-password" className="text-white text-sm hover:underline ">Forgot Password?</Link>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
        >
          Login
        </button>
        <Link to="/register" className="text-white hover:underline">create new account</Link>
      </form>
    </div>
  </div>
  );
}
export default Login;
