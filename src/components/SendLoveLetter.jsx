import { useState } from "react";
import axios from "axios";
import { X, Heart } from "lucide-react";

const API_BASE_URL = "https://3p36t0gw-80.inc1.devtunnels.ms";

const SendLoveLetter = ({ onClose, loveEntryId }) => {
  // State for form data
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    title: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await axios.post(`${API_BASE_URL}/save-love-letter/${loveEntryId}`, formData);

      console.log(response.data)
      setSuccess(true);
      setFormData({ from: "", to: "", title: "", message: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send love letter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-pink-100 to-red-100 p-6 rounded-xl shadow-2xl max-w-md w-full relative border-4 border-white">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-transform transform hover:scale-110">
          <X size={28} />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-red-600 text-center drop-shadow-lg">
          💌 Send a Love Letter
        </h2>

        {/* Heart Decorations */}
        <div className="flex justify-center gap-2 mt-2">
          <Heart className="text-red-400 animate-bounce" size={24} />
          <Heart className="text-red-500 animate-pulse" size={28} />
          <Heart className="text-red-400 animate-bounce" size={24} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4">
          <input 
            type="text" 
            name="from"
            value={formData.from}
            onChange={handleChange}
            className="w-full p-3 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition-shadow shadow-md"
            placeholder="Your Name"
            required
          />

          <input 
            type="text" 
            name="to"
            value={formData.to}
            onChange={handleChange}
            className="mt-3 w-full p-3 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition-shadow shadow-md"
            placeholder="Recipient's Name"
            required
          />

          <input 
            type="text" 
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-3 w-full p-3 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition-shadow shadow-md"
            placeholder="Message Title (e.g., My Forever Love ❤️)"
            required
          />

          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="mt-3 w-full p-3 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition-shadow shadow-md"
            rows="5"
            placeholder="Write your heartfelt message..."
            required
          ></textarea>

          {/* Error Message */}
          {error && <p className="mt-3 text-red-600 font-semibold">{error}</p>}

          {/* Success Message */}
          {success && <p className="mt-3 text-green-600 font-semibold">💖 Love Letter Sent Successfully! 💖</p>}

          {/* Send Button */}
          <button 
            type="submit"
            disabled={loading}
            className={`mt-5 w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-md font-semibold text-lg shadow-lg transition-transform transform hover:scale-105 
              ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Sending..." : "💖 Send with Love 💖"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default SendLoveLetter;
