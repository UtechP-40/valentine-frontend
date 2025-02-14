import React from "react";
import Confetti from "react-confetti";

const LoveLetterPreview = ({ selectedLetter }) => {
  if (!selectedLetter) return null;

  return (
    <div className="relative flex justify-center items-center p-8 max-32">
      {/* Confetti Effect for Romantic Touch */}
      <Confetti numberOfPieces={40} recycle={false} />

      {/* Love Letter Container with Handmade Paper-Like Styling */}
      <div
        className="relative p-10 max-w-lg w-full border border-yellow-500 animate-fadeIn"
        style={{
          background: "linear-gradient(145deg, #f8e8c8, #f2dbb2)",
          boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "15px",
          padding: "2rem",
          fontFamily: "serif",
        }}
      >
        {/* Gold Peacock Feather (SVG) */}
        <div className="absolute -top-6 right-2 w-12 h-12">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="gold"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full animate-bounce"
          >
            <path d="M12 2C14.7 4.3 16 7.5 16 10c0 2.2-.5 3.7-1.5 5-1 1.2-2.3 1.5-3.5 2l-1 3 1.5-2.5c1.5-.7 2.8-1.3 4-3s1.5-3.5 1.5-5c0-2.5-1.3-5.7-4-8z"></path>
          </svg>
        </div>

        {/* Love Letter Content */}
        <h2 className="text-3xl font-bold text-red-600 drop-shadow-lg italic">
          {selectedLetter.title}
        </h2>
        <p className="text-gray-600 mt-2 text-lg font-medium">
          💕 From: {selectedLetter.from}
        </p>
        <hr className="my-4 border-yellow-500" />
        <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap italic">
          {selectedLetter.message}
        </p>
      </div>
      
    </div>
  );
};

export default LoveLetterPreview;


