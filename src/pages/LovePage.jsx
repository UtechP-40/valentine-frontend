import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Typewriter from "typewriter-effect";
import { Mail, CalendarHeart, Menu, X } from "lucide-react"; // Import icons

const LovePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [loveData, setLoveData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loveDuration, setLoveDuration] = useState("");
  const [quote, setQuote] = useState("");
  const [message, setMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // Toggle state for menu

  // Romantic Quotes Array
  const romanticQuotes = [
    "Love is not about how many days, months, or years you've been together. Love is about how much you love each other every single day.",
    "Every love story is beautiful, but ours is my favorite. 💖",
    "I have found the one whom my soul loves. ❤️",
    "You are my today and all of my tomorrows. 🌹",
    "I wish I could turn back the clock to find you sooner and love you longer. 💕",
    "When I look into your eyes, I see the universe smiling back at me. ✨",
  ];

  // Romantic Messages Array
  const romanticMessages = [
    "You are my sunshine ☀️, my moonlight 🌙, and my everything 💖",
    "Every heartbeat is for you ❤️",
    "Forever and always, my love 💘",
    "My heart belongs to you, now and forever 💞",
    "Love is when the happiness of your partner is more important than your own ❤️",
    "You are the dream I never want to wake up from 💫",
  ];

  // Fetch Love Data
  useEffect(() => {
    const fetchLoveData = async () => {
      try {
        const response = await axios.get(`https://valentine-backend-phi.vercel.app/get-love/${id}`);
        setLoveData(response.data.data);
      } catch (err) {
        setError("Failed to fetch data or invalid response format");
      } finally {
        setLoading(false);
      }
    };

    fetchLoveData();
  }, [id]);

  // Update Love Duration
  useEffect(() => {
    if (loveData?.firstMet) {
      const updateLoveDuration = () => {
        const startLove = moment(loveData.firstMet);
        const duration = moment.duration(moment().diff(startLove));
        setLoveDuration(`${duration.years()} years, ${duration.months()} months, ${duration.days()} days`);
      };

      const interval = setInterval(updateLoveDuration, 1000);
      return () => clearInterval(interval);
    }
  }, [loveData]);

  // Change Romantic Quote every 30 seconds
  useEffect(() => {
    const updateQuote = () => {
      const randomIndex = Math.floor(Math.random() * romanticQuotes.length);
      setQuote(romanticQuotes[randomIndex]);
    };

    updateQuote(); // Set initial quote
    const interval = setInterval(updateQuote, 30000); // Change every 30 sec

    return () => clearInterval(interval);
  }, []);

  // Change Romantic Message every 30 seconds
  useEffect(() => {
    const updateMessage = () => {
      const randomIndex = Math.floor(Math.random() * romanticMessages.length);
      setMessage(romanticMessages[randomIndex]);
    };

    updateMessage(); // Set initial message
    const interval = setInterval(updateMessage, 30000); // Change every 30 sec

    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-600 to-red-500 p-6">
      
      {/* Floating Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-5 right-5 bg-white text-red-500 p-3 rounded-full shadow-lg transition-transform hover:scale-110 z-50"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Floating Menu */}
      {menuOpen && (
        <div className="fixed top-16 right-5 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-3 z-50">
          <button
            onClick={() => navigate(`/letters/${id}`)}
            className="flex items-center gap-2 text-red-500 hover:text-red-600"
          >
            <Mail size={20} /> Check Love Letters
          </button>
          <button
            onClick={() => navigate(`/dates/${id}`)}
            className="flex items-center gap-2 text-red-500 hover:text-red-600"
          >
            <CalendarHeart size={20} /> Check Scheduled Dates
          </button>
        </div>
      )}

      {/* ❤️ Love Greeting */}
      <h1 className="text-6xl font-extrabold text-white drop-shadow-lg text-center">
        Happy Valentine’s Day, {loveData?.name} & {loveData?.partnerName} ❤️
      </h1>

      {/* 💌 Romantic Message */}
      <div className="mt-6 text-2xl text-white text-center font-semibold max-w-2xl">
        <Typewriter options={{ strings: [message], autoStart: true, loop: true }} />
      </div>

      {/* ⏳ Love Duration */}
      <p className="mt-6 text-3xl font-bold text-white bg-white/20 px-6 py-2 rounded-lg shadow-lg">
        Together for: <span className="font-extrabold">{loveDuration || "Just started!"}</span>
      </p>

      {/* 📅 First Met Date */}
      <p className="mt-2 text-lg text-white italic">
        First Met on:{" "}
        <span className="font-semibold">
          {loveData.firstMet ? moment(loveData.firstMet).format("MMMM DD, YYYY") : "Unknown Date"}
        </span>
      </p>

      {/* 💕 Couple's Image */}
      <div className="mt-8 relative flex items-center justify-center">
        <div className="relative w-64 h-64 p-2 border-8 border-white rounded-2xl shadow-xl transform rotate-6 animate-float">
          <img
            src={loveData?.image}
            alt="Valentine"
            className="w-full h-full object-cover rounded-xl transition-transform duration-500 hover:rotate-12 hover:scale-110"
          />
        </div>
      </div>

      {/* ✨ Animated Hearts */}
      <div className="mt-10 flex gap-6">
        <span className="text-6xl animate-bounce text-white">❤️</span>
        <span className="text-6xl animate-pulse text-white">💖</span>
        <span className="text-6xl animate-bounce text-white">❤️</span>
      </div>

      {/* 💬 Romantic Quote */}
      <p className="mt-6 text-white text-lg italic text-center max-w-xl bg-white/20 px-4 py-3 rounded-lg shadow-md">
        {quote}
      </p>
    </div>
  );
};

export default LovePage;
