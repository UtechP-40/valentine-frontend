import React, { useEffect, useState,useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Typewriter from "typewriter-effect";
import { Mail, CalendarHeart, Menu, X, Share, LogOut } from "lucide-react"; // Import icons
import SendLoveLetter from "../components/SendLoveLetter";
import ScheduleDate from "../components/ScheduleDate";
import { useLove } from "../context/love.context";
import LoadingScreen from "../components/Loading";
import Error from "../components/Error"
import HeartBroken from "../components/HeartBroken";
import ShareModal from "../components/ShareModal";
const LovePage = () => {
  const { id,name } = useParams();
  const navigate = useNavigate();
  
  // const [loveData, setLoveData] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const { loveData, loading, error,fetchLoveData } = useLove();
  const [loveDuration, setLoveDuration] = useState("");
  const [quote, setQuote] = useState("");
  const [message, setMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // Toggle state for menu
  const [showLetterForm, setShowLetterForm] = useState(false);
  const [showDateForm, setShowDateForm] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);



  const menuRef = useRef(null);
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
    // const fetchLoveData = async () => {
    //   try {
    //     const response = await axios.get(`https://3p36t0gw-80.inc1.devtunnels.ms/get-love/${id}`);
    //     setLoveData(response.data.data);
    //   } catch (err) {
    //     setError("Failed to fetch data or invalid response format");
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    fetchLoveData(id);
  }, [id]);
  useEffect(() => {
    if (id && name) {
      localStorage.setItem("loveId", id);
      localStorage.setItem("loveName", name);
    }
  }, [id, loveData]);
  
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleShare = () => {
    const lovePageUrl = window.location.href;
    navigator.clipboard.writeText(lovePageUrl);
    alert("Love Page URL copied to clipboard! Share it with your partner 💖");
  };

  const [showUnbreakableModal, setShowUnbreakableModal] = useState(false);

const handleBreakUp = async () => {
  const confirmBreakup = window.confirm("Are you sure you want to break up? This action cannot be undone.");
  if (confirmBreakup) {
    try {
      await axios.delete(`https://your-api.com/delete-love/${id}`);
      alert("Love entry deleted successfully 💔");
      navigate("/");
    } catch (error) {
      // If deletion fails, show the "Unbreakable Bond" modal
      setShowUnbreakableModal(true);
    }
  }
};

    // const confirmBreakup = window.confirm("Are you sure you want to break up?");
    // if (confirmBreakup) {
    //   localStorage.removeItem("loveId");
    //   localStorage.removeItem("loveName");
    //   navigate("/");
    // }
  // };

  if (loading) return <LoadingScreen />;
  if (error) return <Error/>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-600 to-red-500 p-6">
      
      {/* Floating Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-5 right-5 bg-white text-red-500 p-3 rounded-full shadow-lg transition-transform hover:scale-110 z-50"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {menuOpen && (
        <div ref={menuRef} className="fixed top-16 right-5 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-3 z-50">
          <button onClick={() => navigate(`/letters/${id}`)} className="flex items-center gap-2 text-red-500 hover:text-red-600">
            <Mail size={20} /> Check Love Letters
          </button>
          <button onClick={() => navigate(`/dates/${id}`)} className="flex items-center gap-2 text-red-500 hover:text-red-600">
            <CalendarHeart size={20} /> Check Scheduled Dates
          </button>
          <button onClick={() => setShowShareModal(true)} className="flex items-center gap-2 text-blue-500 hover:text-blue-600">
            <Share size={20} /> Share Love Page
          </button>
          <button onClick={handleBreakUp} className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
             Break Up 💔
          </button>
          <button onClick={() => {
            localStorage.removeItem("loveId");
            localStorage.removeItem("loveName");
            navigate("/")}} className="flex items-center gap-2 text-red-700 hover:text-red-900">
            <LogOut size={20} /> Exit Love 🚪
          </button>
        </div>
      )}

{showUnbreakableModal && (
  <div
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
    onClick={() => setShowUnbreakableModal(false)} // Close when clicking outside
  >
    <div
      className="bg-white p-8 rounded-2xl shadow-2xl w-96 text-center relative animate-[wiggle_0.3s_ease-in-out] border-4 border-pink-500"
      // Prevent close on modal click onClick={(e) => e.stopPropagation()} 
    >
      {/* Glowing Background Effect */}
      <div className="absolute inset-0 bg-pink-400 blur-2xl opacity-30 rounded-2xl"></div>

      <h2 className="text-3xl font-extrabold text-red-500 drop-shadow-lg">
        Not Even God Can Break Your Bond! ❤️
      </h2>
      <p className="text-gray-700 mt-4 italic">
        Your love is truly unbreakable. The universe has spoken! 💫
      </p>

      {/* Cosmic Animated Background */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-300 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-red-400 rounded-full opacity-30 animate-pulse"></div>
      </div>

      {/* Action Button */}
      <button
  onClick={() => {
    setShowUnbreakableModal(false);
    console.log("Modal Closed! New state:", showUnbreakableModal);
  }}
  className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold rounded-lg shadow-md 
  transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg hover:shadow-pink-500/50 
  cursor-pointer"
>
  Accept Your Fate 💖
</button>



    </div>
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
      {showShareModal && <ShareModal shareUrl={window.location.href} onClose={() => setShowShareModal(false)} isOpen={showShareModal} />}
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
      {showLetterForm && <SendLoveLetter onClose={() => setShowLetterForm(false)} loveEntryId={id} />}
{showDateForm && <ScheduleDate onClose={() => setShowDateForm(false)}  />}

{/* Buttons to open overlays */}


      {/* 🎁 Special Call to Action */}
        <div className="mt-10 flex flex-col items-center space-y-4">
        <button onClick={() => setShowLetterForm(true)} className="px-6 py-3 bg-white text-red-500 font-semibold rounded-full text-xl shadow-lg transition-transform transform hover:scale-105">
  Send a Love Letter 💌
</button>
<button onClick={() => setShowDateForm(true)} className="px-6 py-3 bg-red-600 text-white font-semibold rounded-full text-xl shadow-lg transition-transform transform hover:scale-105">
  Plan a Romantic Date 💕
</button>
      </div>
    </div>
  );
};

export default LovePage;
