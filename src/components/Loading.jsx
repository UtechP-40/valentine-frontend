import React from "react";
import  Heart  from "./Heart";

const LoadingScreen = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-red-100 to-pink-200 relative overflow-hidden">
            {/* Floating Hearts Animation */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-1/4 animate-floating opacity-50">
                    <Heart className="text-red-300" size={24} />
                </div>
                <div className="absolute top-20 right-10 animate-floating opacity-60">
                    <Heart className="text-red-400" size={28} />
                </div>
                <div className="absolute bottom-10 left-10 animate-floating opacity-40">
                    <Heart className="text-pink-400" size={32} />
                </div>
            </div>

            {/* 🩷 Hearts (Fix: No <p> Wrap) */}
            <div className="flex space-x-2 animate-fadeIn">
                <Heart className="text-red-400 animate-bounce" size={36} />
                <Heart className="text-red-500 animate-pulse" size={44} />
                <Heart className="text-red-400 animate-bounce" size={36} />
            </div>

            {/* ✅ Fix: Use <span> Instead of <p> */}
            <span className="mt-4 text-xl font-bold text-red-600 animate-scale">
                Taking you to your love... 💖
            </span>
        </div>
    );
    };

export default LoadingScreen;
