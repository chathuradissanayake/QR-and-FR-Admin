import React from "react";
import {
  FaCog,
  FaDoorOpen,
  FaHome,
  FaSignOutAlt,
  FaUser,
  FaUserFriends,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing tokens or session)
    console.log("Logging out...");
    navigate("/logout"); // Redirect to the logout page
  };

  return (
    <aside className="w-64 bg-slate-200 dark:bg-slate-800 min-h-screen p-6 flex flex-col  ">
      <div className="flex justify-center mb-6">
        <NavLink to="/">
          <img src={logo} alt="Logo" className="w-24 h-24" />
        </NavLink>
      </div>
      <nav className="flex-1">
        <ul className="space-y-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? " text-blue-600 flex items-center gap-4 dark:text-cyan-500"
                  : "text-gray-600 flex items-center gap-2 dark:text-slate-400"
              }
            >
              <FaHome /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive
                  ? " text-blue-600 flex items-center gap-4 dark:text-cyan-500"
                  : "text-gray-600 flex items-center gap-2 dark:text-slate-400"
              }
            >
              <FaUserFriends /> Users List
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/doors"
              className={({ isActive }) =>
                isActive
                  ? " text-blue-600 flex items-center gap-4 dark:text-cyan-500"
                  : "text-gray-600 flex items-center gap-2 dark:text-slate-400"
              }
            >
              <FaDoorOpen /> Doors
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive
                  ? " text-blue-600 flex items-center gap-4 dark:text-cyan-500"
                  : "text-gray-600 flex items-center gap-2 dark:text-slate-400"
              }
            >
              <FaCog /> Settings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? " text-blue-600 flex items-center gap-4 dark:text-cyan-500"
                  : "text-gray-600 flex items-center gap-2 dark:text-slate-400"
              }
            >
              <FaUser /> Profile
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="text-gray-600 dark:text-slate-400 flex items-center gap-2 w-full text-left"
            >
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
