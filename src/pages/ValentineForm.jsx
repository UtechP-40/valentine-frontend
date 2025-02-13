import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import axios from "axios";
import Heart from "../components/Heart";

export default function ValentineForm() {
  const [name, setName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [message, setMessage] = useState("");
  const [firstMet, setFirstMet] = useState(""); // New State for First Met Date
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image to continue! 📸");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("partnerName", partnerName);
      formData.append("message", message);
      formData.append("firstMet", firstMet); // Include First Met Date
      formData.append("image", image);
// url = https://valentine-backend-phi.vercel.app
      const response = await axios.post("https://3p36t0gw-80.inc1.devtunnels.ms/save-valentine", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Redirect user to their unique love page
      navigate(`/${response.data.data.partnerName}/${response.data.data._id}`);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-600 to-red-500 p-6 overflow-hidden h-screen">
      
      {/* 🎇 3D Animated Background */}
      <Canvas className="fixed top-0 left-0 w-full h-full z-0">
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 5, 2]} intensity={1.5} />
        <Stars radius={100} depth={50} count={2000} factor={4} fade />
        <Heart />
      </Canvas>

      {/* 💖 Main Card */}
      <motion.div
        className="relative z-10 bg-white shadow-2xl rounded-3xl p-10 max-w-lg w-full text-center opacity-95 backdrop-blur-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1 
          className="text-5xl font-extrabold text-pink-600 mb-4 drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          💖 Valentine’s Special 💖
        </motion.h1>
        
        <motion.p 
          className="text-gray-600 mb-6 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Create a personalized love page for your special one! 🌹
        </motion.p>

        {/* 🎀 Form */}
        <motion.form 
          onSubmit={handleSubmit} 
          className="flex flex-col gap-5"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg"
            required
          />

          <input
            type="text"
            placeholder="Partner's Name"
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg"
            required
          />

          <textarea
            placeholder="Write your love message... 💌"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg resize-none"
            rows="3"
            required
          ></textarea>

          {/* 📅 First Met Date Field */}
          <input
            type="date"
            value={firstMet}
            onChange={(e) => setFirstMet(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg"
            required
          />

          <motion.label 
            className="cursor-pointer bg-pink-500 text-white py-3 px-6 rounded-lg hover:bg-pink-600 text-lg font-semibold shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            Upload Image
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} required />
          </motion.label>

          {preview && (
            <motion.img 
              src={preview} 
              alt="Preview" 
              className="w-32 h-32 rounded-full mx-auto border-4 border-pink-500 shadow-lg"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            />
          )}

          <motion.button
            type="submit"
            className="bg-red-500 text-white py-3 rounded-lg font-bold hover:bg-red-600 text-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Generate My Page 💕
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}
