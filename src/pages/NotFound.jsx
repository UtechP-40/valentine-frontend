import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 text-white">
      <h1 className="text-6xl font-bold">💔 Oops!</h1>
      <p className="text-2xl mt-4">Maybe your Valentine doesn't exist... 😢</p>
      <p className="text-lg mt-2">Or perhaps you've taken a wrong turn? 🛤️</p>
      
      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-white text-red-500 font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-red-200 transition-all"
      >
        🔙 Find Your Valentine
      </button>
    </div>
  );
}

export default NotFound;
