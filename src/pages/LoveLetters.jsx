import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "../components/Skeleton"; 
import { useLove } from "../context/love.context";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for mobile menu

const LoveLetters = () => {
  const { id } = useParams();
  const { loveData, loading, fetchLoveData } = useLove();
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // Sidebar toggle state

  useEffect(() => {
    fetchLoveData(id);
  }, [id]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-red-50 to-pink-100">
      
      {/* Mobile Menu Button */}
      <button
        className="absolute top-4 left-4 z-20 text-red-600 md:hidden"
        onClick={() => setMenuOpen(true)}
      >
        <FiMenu size={28} />
      </button>

      {/* Left Panel - Love Letters List */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-2/3 max-w-xs bg-white p-6 shadow-lg border-r border-gray-300 rounded-r-2xl transition-transform duration-300 ease-in-out md:relative md:w-1/3 md:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button for Mobile */}
        <button
          className="absolute top-4 right-4 md:hidden text-red-600"
          onClick={() => setMenuOpen(false)}
        >
          <FiX size={28} />
        </button>

        <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-2">
          📜 Love Letters
        </h2>

        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : loveData.loveLetters.length > 0 ? (
          loveData.loveLetters.map((letter) => (
            <div
              key={letter._id}
              className={`p-4 my-2 rounded-xl cursor-pointer transition duration-300 shadow-sm border ${
                selectedLetter?._id === letter._id
                  ? "bg-gradient-to-r from-red-500 to-pink-400 text-white shadow-lg scale-105"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => {
                setSelectedLetter(letter);
                setMenuOpen(false); // Close menu when a letter is selected
              }}
            >
              <h3 className="font-semibold text-lg">{letter.title}</h3>
              <p className="text-sm opacity-70">💌 Sent by: {letter.from}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center italic">No love letters found 💔</p>
        )}
      </div>

      {/* Backdrop for Mobile Menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Right Panel - Letter Preview */}
      <div className="flex-1 p-8 flex items-center justify-center">
        {selectedLetter ? (
          <div className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-xl max-w-lg w-full border border-red-300 animate-fadeIn">
            <h2 className="text-3xl font-bold text-red-600">{selectedLetter.title}</h2>
            <p className="text-gray-600 mt-2 text-lg font-medium">
              💕 From: {selectedLetter.from}
            </p>
            <hr className="my-4 border-red-400" />
            <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
              {selectedLetter.message}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full max-w-lg">
            <Skeleton className="h-10 w-2/3" />
            {/* <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoveLetters;
