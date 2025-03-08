import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Sidebar from "../components/Sidebar";
import TopSearchBar from "../components/TopSearchBar";
import themeStore from "../store/themeStore";
import { FiBold, FiItalic, FiUnderline, FiImage, FiSend, FiLoader } from "react-icons/fi";

const AddPost = () => {
  const { theme } = themeStore((state) => state);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for caption generation

  // Handle Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Generate Caption using Gemini API
  const generateCaption = async () => {
    if (content.trim() === "") return;
  
    setLoading(true); // Show loading state
  
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyDCA7inJDI-b8SlCA0aUXN2X8sZlzbfRSk"); // Replace with actual API key
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
      const prompt = `Generate a short, engaging, and creative caption for a social media post based on this content. 
      Keep it within 100 characters and make it catchy.
  
      Content: "${content}"`;
  
      const result = await model.generateContent(prompt);
      const response = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "Couldn't generate a caption.";
  
      // Remove unnecessary prefixes like "Option 1:" or bullet points
      const cleanCaption = response.replace(/^(\*\*Option.*?:\*\*|\d+\.|[-•])\s*/, "").trim();
  
      setCaption(cleanCaption);
    } catch (error) {
      console.error("Error generating caption:", error);
      setCaption("Error generating caption. Try again.");
    }
  
    setLoading(false); // Hide loading state
  };
  

  return (
    <div className={`min-h-screen w-screen flex ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col w-full">
        <TopSearchBar />

        {/* Post Form */}
        <div className="flex justify-center p-6">
          <div className={`w-full max-w-3xl p-8 rounded-xl shadow-xl ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-3xl font-bold mb-6 text-center">Create a New Post</h2>

            {/* Title Input */}
            <input
              type="text"
              placeholder="Enter post title..."
              className={`w-full p-4 text-lg rounded-md border focus:ring-2 outline-none mb-5 transition-all ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500"
                  : "bg-gray-100 border-gray-300 focus:ring-blue-500"
              }`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* Toolbar */}
            <div className="flex items-center gap-3 mb-4">
              {[
                { icon: FiBold, command: "bold" },
                { icon: FiItalic, command: "italic" },
                { icon: FiUnderline, command: "underline" },
              ].map(({ icon: Icon, command }, index) => (
                <button
                  key={index}
                  className="p-3 rounded-md bg-gray-200 dark:bg-gray-700 text-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                  onClick={() => document.execCommand(command)}
                >
                  <Icon />
                </button>
              ))}
            </div>

            {/* Content Editor */}
            <div
              contentEditable
              className={`w-full min-h-[180px] p-4 text-lg rounded-md border focus:ring-2 outline-none mb-5 transition-all ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500"
                  : "bg-gray-100 border-gray-300 focus:ring-blue-500"
              }`}
              onInput={(e) => setContent(e.currentTarget.textContent)}
              placeholder="Write something amazing..."
            ></div>

            {/* Image Upload */}
            <label className="flex items-center gap-3 cursor-pointer mb-4 text-lg font-semibold text-blue-500 hover:text-blue-600">
              <FiImage className="text-2xl" />
              <span>Upload Image</span>
              <input type="file" className="hidden" onChange={handleImageUpload} />
            </label>

            {image && (
              <div className="w-full flex justify-center mb-4">
                <img
                  src={image}
                  alt="Uploaded"
                  className="w-full max-h-72 object-cover rounded-lg shadow-md border-2 border-blue-400"
                />
              </div>
            )}

            {/* Caption Generation */}
            <button
              className="w-full p-3 text-lg text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all mb-4 flex items-center justify-center"
              onClick={generateCaption}
              disabled={loading}
            >
              {loading ? <FiLoader className="animate-spin mr-2" /> : "Generate Caption"}
            </button>

            {/* Display Caption */}
            {caption && (
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md text-center shadow-md">
                <p className="text-lg italic font-semibold text-gray-800 dark:text-gray-300">
                  "{caption}"
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button className="w-full flex items-center justify-center p-4 text-lg text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all">
              <FiSend className="mr-2" /> Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
