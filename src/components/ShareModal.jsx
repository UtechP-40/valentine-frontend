import React from "react";
import { X } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaFacebook, FaTelegram } from "react-icons/fa";

const ShareModal = ({ isOpen, onClose, shareUrl }) => {
  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
      onClick={onClose} // Click outside to close
    >
      {/* X Close Button - Fixed on Screen */}
      <button
        onClick={onClose}
        className="fixed top-5 right-5 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80 transition-all"
      >
        <X size={30} />
      </button>

      <div
        className="bg-white p-6 rounded-2xl shadow-2xl w-80 text-center animate-fadeIn relative"
        onClick={(e) => e.stopPropagation()} // Prevent click inside from closing modal
      >
        {/* Modal Content */}
        <h2 className="text-2xl font-bold text-gray-800">Share This Page</h2>
        <p className="text-gray-500 text-sm mt-1">Share the love with your partner! 💖</p>

        {/* Share Buttons */}
        <div className="flex justify-center gap-4 mt-5">
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-green-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <FaWhatsapp size={24} />
          </a>
          <a
            href={`https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-blue-400 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <FaTelegram size={24} />
          </a>
        </div>

        {/* Copy Link */}
        <div className="mt-5">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="w-full p-2 text-gray-700 border rounded-lg text-center bg-gray-100"
          />
          <button
            onClick={handleCopyLink}
            className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all"
          >
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
