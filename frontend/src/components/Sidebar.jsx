import React, { useState } from "react";
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
import { clearAuthData } from '../utils/auth';

const Sidebar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role'); // Assuming you store the role in localStorage

  const handleLogout = () => {
    // Clear local storage
    clearAuthData();
    // Perform any other logout logic here (e.g., clearing session)
    console.log("Logging out...");
    navigate("/logout"); // Redirect to the logout page
  };

  const confirmLogout = () => {
    setShowLogoutModal(true);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <aside className="w-64 bg-slate-200 min-h-screen p-6 flex flex-col space-y-6">
      <div className="flex justify-center mb-6">
        <NavLink to="/dashboard">
          <img src={logo} alt="Logo" className="w-24 h-24" />
        </NavLink>
      </div>
      <nav className="flex-1">
        <ul className="space-y-6">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? " text-blue-600 flex items-center gap-4"
                  : "text-gray-600 flex items-center gap-2"
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
                  ? "text-blue-600 flex items-center gap-4"
                  : "text-gray-600 flex items-center gap-2"
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
                  ? "text-blue-600 flex items-center gap-4"
                  : "text-gray-600 flex items-center gap-2"
              }
            >
              <FaDoorOpen /> Doors
            </NavLink>
          </li>
          {userRole === 'SuperAdmin' && (
            <>
              <li>
                <NavLink
                  to="/companies"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 flex items-center gap-4"
                      : "text-gray-600 flex items-center gap-2"
                  }
                >
                  <FaUserFriends /> Companies
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin-users"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 flex items-center gap-4"
                      : "text-gray-600 flex items-center gap-2"
                  }
                >
                  <FaUser /> Admin Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/create-admin"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 flex items-center gap-4"
                      : "text-gray-600 flex items-center gap-2"
                  }
                >
                  <FaUser /> Create Admin
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 flex items-center gap-4"
                  : "text-gray-600 flex items-center gap-2"
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
                  ? "text-blue-600 flex items-center gap-4"
                  : "text-gray-600 flex items-center gap-2"
              }
            >
              <FaUser /> Profile
            </NavLink>
          </li>
          <li>
            <button
              onClick={confirmLogout}
              className="text-gray-600 flex items-center gap-2 w-full text-left"
            >
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      </nav>

      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;