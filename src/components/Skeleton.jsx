import React from "react";

const Skeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-6 w-full max-w-lg mx-auto bg-white/60 backdrop-blur-lg rounded-xl shadow-lg animate-fadeIn border border-red-100">
      {/* Floating Heart Animation */}
      <div className="absolute -top-5 right-5 animate-float">
        <span className="text-red-400 text-4xl">❤️</span>
      </div>

      {/* Title Placeholder */}
      <div className="h-8 w-3/4 bg-gradient-to-r from-red-300 via-red-200 to-red-300 rounded-lg animate-pulse"></div>

      {/* Sender Placeholder */}
      <div className="h-5 w-1/3 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 rounded-md animate-pulse"></div>

      {/* Message Placeholder */}
      <div className="space-y-3">
        <div className="h-4 w-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-md animate-shimmer"></div>
        <div className="h-4 w-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-md animate-shimmer"></div>
        <div className="h-4 w-2/3 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-md animate-shimmer"></div>
      </div>

      {/* Decorative Heart Animation */}
      <div className="flex justify-center mt-6 animate-heartBeat">
        <span className="text-red-500 text-5xl drop-shadow-lg">💖</span>
      </div>
    </div>
  );
};

export default Skeleton;
