import React, { useState, useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";
import axios from "axios";
import avatar from "../assets/avatar.png";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('/api/admin/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { firstName, lastName, email } = response.data;
        setProfile({ firstName, lastName, email });
      } catch (err) {
        setError("Failed to fetch profile information");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        '/api/admin/me',
        {
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setError("");
      alert("Profile updated successfully");
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setError("Super Admins are not allowed to update their profile");
      } else {
        setError("Failed to update profile");
      }
    }
  };

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 p-4">
        <Header />
        <div className="p-6 space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Profile</h2>

          {error && <p className="text-red-500">{error}</p>}

          {/* Profile Image and Edit Button */}
          <div className="flex items-center justify-center mb-8 relative">
            <div className="relative">
              {/* Profile Image */}
              <img
                src={avatar}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
              />

              {/* Edit Button */}
              <button className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 shadow-lg">
                <FaPencilAlt className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Profile Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <label className="block text-gray-700 font-semibold">First Name</label>
              <input
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />

              <label className="block text-gray-700 font-semibold mt-6">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Right Column */}
            <div>
              <label className="block text-gray-700 font-semibold">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;