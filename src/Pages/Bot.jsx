import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Bot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hi! I'm H.AI. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(input);
      const text = result.response.text();

      const botMessage = {
        text: text,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage = {
        text: "❌ Sorry, I encountered an error. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center flex-col font-sans">
      {/* Header */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center space-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-blue-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2L15 8H9L12 2Z M12 22L9 16H15L12 22Z M2 12L8 15V9L2 12Z M22 12L16 9V15L22 12Z" />
          </svg>
          <h1 className="text-4xl font-extrabold tracking-tight text-blue-300">H.ai</h1>
        </div>
        <p className="text-sm text-gray-400 mt-2">Powered by sheikhhaad</p>
      </div>

      {/* Chat Section */}
      <div className="w-full max-w-2xl flex flex-col items-center px-4">
        <div className="w-full backdrop-blur-md rounded-3xl p-6 h-[60vh] overflow-y-auto space-y-4 shadow-xl border border-gray-700/50">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-slide-up`}
            >
              <div
                className={`p-4 rounded-2xl max-w-md transition-all duration-300 ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-blue-500 to-blue-700"
                    : "bg-gray-700/80"
                }`}
              >
                <p className="whitespace-pre-wrap text-sm">{message.text}</p>
                <p className="text-xs text-gray-300/70 text-right mt-2">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="p-4 rounded-2xl bg-gray-700/80 max-w-md">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
                  <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse delay-200" />
                  <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse delay-400" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        {!loading && (
          <div className="w-full mt-6">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="w-full p-4 pl-6 pr-14 bg-gray-800/50 text-white placeholder-gray-400 rounded-full border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full disabled:opacity-50 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tailwind Animation */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Bot;
