import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import AdminDashboard from "../pages/AdminDashboard";
import LeaderboardPage from "../pages/LeaderboardPage";
import ContributionCard from "../components/contribution/ContributionCard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/contributioncard" element={<ContributionCard/>} />
    </Routes>
  );
};

export default AppRoutes;
