import React from "react";
import { Link } from "react-router-dom";
import chatbotGif from '../assets/original-400827bdf243931c8ffd26a268a837ce.gif';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content */}
        <div className="text-center lg:text-left space-y-8 animate-fade-in">
          <div className="flex justify-center lg:justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-blue-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L15 8H9L12 2Z M12 22L9 16H15L12 22Z M2 12L8 15V9L2 12Z M22 12L16 9V15L22 12Z" />
            </svg>
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-blue-300 tracking-tight">
            Explore H.ai
          </h1>
          <p className="text-xl text-gray-300 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Powered by sheikhhaad, dive into a universe of knowledge with intelligent, seamless AI conversations. Ask anything, discover everything!
          </p>
          <Link
            to="/bot"
            className="inline-block px-12 py-5 bg-blue-500 text-white rounded-full text-xl font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/60"
          >
            Launch Chat
          </Link>
        </div>

        {/* Right: Chatbot GIF */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md">
            <img
              src={chatbotGif}
              alt="GrokChat Animation"
              className="rounded-3xl shadow-2xl border border-gray-700/50 animate-pulse-glow object-cover"
            />
            {/* Glowing Overlay Effect */}
            <div className="absolute inset-0 bg-blue-500/15 rounded-3xl pointer-events-none animate-pulse" />
          </div>
        </div>
      </div>

      {/* Tailwind CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-glow {
          0% {
            box-shadow: 0 0 12px rgba(59, 130, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 24px rgba(59, 130, 246, 0.9);
          }
          100% {
            box-shadow: 0 0 12px rgba(59, 130, 246, 0.5);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;