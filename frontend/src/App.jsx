import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Doors from "./pages/Doors";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import Profile from "./pages/Profile";
import QRGenerator from "./pages/QRGenerator";
import Settings from "./pages/Settings";
import UserProfile from "./pages/UserProfile";
import Users from "./pages/Users";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/doors" element={<Doors />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/qrgenerator" element={<QRGenerator />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
