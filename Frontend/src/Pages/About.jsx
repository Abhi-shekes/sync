import React from "react";
import themeStore from "../store/themeStore";
import Sidebar from "../components/Sidebar";
import TopSearchBar from "../components/TopSearchBar";
import { FiUsers, FiHeart, FiShield, FiTrendingUp } from "react-icons/fi";

const About = () => {
  // Theme Switcher (Zustand)
  const { theme } = themeStore((state) => state);

  return (
    <div
      className={`min-h-screen w-screen flex ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col w-full">
        <TopSearchBar />

        {/* About Section */}
        <div className="flex flex-col items-center text-center p-8">
          <h1
            className={`text-4xl font-bold mb-4 ${
              theme === "dark" ? "text-gray-300 hover:text-[#6a4dfa]" : "text-gray-700 hover:text-[#6a4dfa]"
            }`}
          >
            About Us
          </h1>
          <p className="max-w-3xl text-lg opacity-80">
            Welcome to our platform, where you can connect with friends, share your moments, and explore amazing content.
            Our goal is to create a space where everyone can express themselves freely and engage with their community.
          </p>

          {/* Our Mission */}
          <div className="mt-12 max-w-4xl text-center p-6 rounded-lg shadow-lg bg-opacity-90 backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-xl
            ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}">
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p className="text-lg opacity-80">
              We aim to build a safe and creative space for users to share their thoughts, connect with people, and grow their community. 
              Whether you love photography, art, fitness, or travel, we bring everyone together in one place.
            </p>
          </div>

          {/* Why Choose Us Section */}
          <h2 className="text-2xl font-semibold mt-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            {[
              { icon: <FiUsers size={28} />, title: "Community", text: "Join a growing community of like-minded individuals." },
              { icon: <FiHeart size={28} />, title: "Engagement", text: "Share and interact with content that matters to you." },
              { icon: <FiShield size={28} />, title: "Privacy & Security", text: "Your data and privacy are our top priority." },
              { icon: <FiTrendingUp size={28} />, title: "Growth", text: "Expand your audience and grow your online presence." },
            ].map((item, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg shadow-lg flex flex-col items-center transition duration-300 hover:scale-105 hover:shadow-2xl ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="text-[#6a4dfa] mb-2">{item.icon}</div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm opacity-80 text-center">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
