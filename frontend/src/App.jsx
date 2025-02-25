import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Trainer from "./pages/Trainer";
import ExploreTrainers from "./pages/ExploreTrainers";
import ClientDashboard from "./pages/Dashboard/ClientDash";
import TrainerDashboard from "./pages/Dashboard/TrainerDash";
import AdminDashboard from "./pages/Dashboard/AdminDash";
import VideoCall from "./components/VideoCall";
import PendingReq from "./pages/PendingReq";
import TrainerSchedule from "./pages/TrainerSchedule.jsx";
import Navbar from "./components/Navbar.jsx";
import NotifyBar from "./components/NotifyBar.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleNotificationClick = () => {
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };
  return (
    <Router>
      <Navbar onNotificationClick={handleNotificationClick} />
      <NotifyBar visible={showSidebar} onClose={handleCloseSidebar} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile/update" element={<Profile />} />
        <Route path="/trainer/:id" element={<Trainer />} />
        <Route path="/search/top-trainers" element={<ExploreTrainers />} />
        <Route path="/video-call/:roomId" element={<VideoCall />} />
        <Route path="/dashboard/client" element={<ClientDashboard />} />
        <Route path="/dashboard/trainer" element={<TrainerDashboard />} />
        <Route path="/pending-req" element={<PendingReq />} />
        <Route path="/schedule/:traineId" element={<TrainerSchedule />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
