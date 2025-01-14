import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Trainer from "./pages/Trainer";
import ExploreTrainers from "./pages/ExploreTrainers";
import ForgotPassword from "./pages/ForgotPassword";
import ClientDashboard from "./pages/Dashboard/ClientDash";
import TrainerDashboard from "./pages/Dashboard/TrainerDash";
import AdminDashboard from "./pages/Dashboard/AdminDash";
import VideoCall from "./components/VideoCall";
import PendingReq from "./pages/PendingReq";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/trainer/:id" element={<Trainer />} />
        <Route path="/search/top-trainers" element={<ExploreTrainers />} />
        <Route path="/video-call/:roomId" element={<VideoCall />} />
        <Route path="/dashboard/client" element={<ClientDashboard />} />
        <Route path="/dashboard/trainer" element={<TrainerDashboard />} />
        <Route path="/pending-req" element={<PendingReq />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
