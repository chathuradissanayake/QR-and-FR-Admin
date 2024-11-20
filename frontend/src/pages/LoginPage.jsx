import React from "react";
import { FaGoogle, FaPhone, FaThumbsUp } from "react-icons/fa";
import logo from "../assets/logo.png";

const LoginPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-800">
      {/* Main Container */}
      <div className="h-full w-full flex bg-white overflow-hidden">
        {/* Left Section */}
        <div className="w-1/2 bg-gray-100 flex flex-col justify-center items-center p-6">
          {/* Logo */}
          <img src={logo} alt="Logo" className="w-16 h-16 mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500 mb-6">Login into your account</p>

          {/* Social Login Buttons */}
          <div className="flex gap-4 mb-4">
            <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-200 transition">
              <FaGoogle className="mr-2 text-lg text-red-500" />
              Google
            </button>

            <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-200 transition">
              <FaPhone className="mr-2 text-lg text-blue-500" />
              Phone
            </button>
          </div>

          {/* Divider */}
          <div className="w-full max-w-[350px] flex items-center mb-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-gray-500 text-sm">Or continue with</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="w-full max-w-md px-4 py-2 border rounded-lg mb-4 mx-auto focus:ring-2 focus:ring-green-500 outline-none"
          />

          {/* Password Input */}
          <div className="w-full max-w-md mx-auto relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              👁️
            </button>
          </div>

          {/* Remember Me and Recover Password */}
          <div className="flex justify-between items-center w-full max-w-md mx-auto mt-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-600 text-sm">Remember me</span>
            </label>
            <a href="/recover" className="text-red-500 text-sm hover:underline">
              Recover Password
            </a>
          </div>

          {/* Login Button */}
          <button className="w-full max-w-md mx-auto mt-6 px-4 py-2 bg-green-500 text-white text-lg rounded-lg hover:bg-green-600 transition">
            Log In
          </button>
        </div>

        {/* Right Section */}
        <div className="w-1/2 relative">
          {/* Background Image */}
          <img
            src="/login.png"
            alt="Smart Door"
            className="w-full h-full object-cover"
          />
          {/* Floating Card */}
          <div className="absolute bottom-8 left-8 bg-white/60 backdrop-blur-lg rounded-lg p-4 flex items-center shadow-lg">
            <FaThumbsUp className="text-green-500 text-2xl mr-2" />
            <div>
              <h3 className="font-bold text-green-500">
                Smart Door Access System
              </h3>
              <p className="text-gray-600 text-sm">
                Today, we create innovative solutions to the challenges that
                consumers face in both their everyday lives and events.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;