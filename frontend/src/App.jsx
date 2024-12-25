import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ExploreTrainers from "./pages/ExploreTrainers";
import ForgotPassword from "./pages/ForgotPassword";
import ClientDashboard from "./pages/Dashboard/ClientDash";
import TrainerDashboard from "./pages/Dashboard/TrainerDash";
import AdminDashboard from "./pages/Dashboard/AdminDash";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/explore-trainers" element={<ExploreTrainers />} />
        <Route path="/dashboard/client" element={<ClientDashboard />} />
        <Route path="/dashboard/trainer" element={<TrainerDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
