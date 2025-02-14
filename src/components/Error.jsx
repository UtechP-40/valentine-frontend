import React from "react";
import {  Frown, Home } from "lucide-react"; // Importing fun icons
import { useNavigate } from "react-router-dom";
import HeartBroken from "../components/HeartBroken";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-black text-white p-6">
      {/* ❌ Broken Heart Icon */}
      <HeartBroken size={80} className="text-red-500 animate-pulse mb-4" />

      {/* 🥲 Sad Love Message */}
      <h1 className="text-4xl font-extrabold text-red-400 drop-shadow-lg text-center">
        Oops! Cupid missed his shot 💘💔
      </h1>

      <p className="mt-4 text-lg text-center text-gray-300 max-w-lg">
        We tried our best, but the love data couldn't be found. Maybe the universe is testing your love? Or maybe... someone forgot to save it! 😢
      </p>

      {/* 🏡 Go Home Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-red-600 text-white font-semibold rounded-full text-xl shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2"
      >
        <Home size={24} /> Go Back Home
      </button>

      {/* ❤️ Romantic Emojis Floating */}
      <div className="mt-10 flex gap-6">
        <span className="text-6xl animate-bounce">💔</span>
        <span className="text-6xl animate-pulse">🥀</span>
        <span className="text-6xl animate-bounce">💔</span>
      </div>

      {/* Funny Extra Line */}
      <p className="mt-6 italic text-gray-400 text-sm text-center">
        "If love was easy, Romeo & Juliet would still be alive." 😭
      </p>
    </div>
  );
};

export default Error;
