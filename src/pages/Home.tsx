import React from "react";
import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-400 flex items-center justify-center">
      <div className="text-center p-10 bg-white/20 backdrop-blur-md rounded-3xl shadow-xl max-w-md w-full">
        
        {/* Logo / Title */}
        <h1 className="text-5xl font-extrabold text-white drop-shadow-md mb-6">
          Quiz Quest
        </h1>
        <p className="text-white text-lg mb-10">
          Test your knowledge across categories, climb the leaderboard, and challenge yourself!
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <Link
            to="/register"
            className="px-6 py-3 rounded-xl bg-white text-purple-700 font-semibold text-lg shadow-md hover:scale-105 transition transform"
          >
            Sign Up
          </Link>

          <Link
            to="/login"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-700 to-pink-600 text-white font-semibold text-lg shadow-md hover:scale-105 transition transform"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};
