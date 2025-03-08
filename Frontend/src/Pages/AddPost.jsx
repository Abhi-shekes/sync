import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import TopSearchBar from "../components/TopSearchBar";
import themeStore from "../store/themeStore";
import { FiBold, FiItalic, FiUnderline, FiImage, FiSend } from "react-icons/fi";

const AddPost = () => {
  const { theme } = themeStore((state) => state);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  // Handle Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Simulate Caption Generation (Replace with Gemini API)
  const generateCaption = async () => {
    if (content.trim() === "") return;

    
    setCaption(`"${content.substring(0, 50)}..." - AI Generated Caption`);
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
          <div className={`w-full max-w-3xl p-6 rounded-lg shadow-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>

            {/* Title Input */}
            <input
              type="text"
              placeholder="Enter post title..."
              className={`w-full p-3 rounded-md border focus:ring-2 outline-none mb-4 ${
                theme === "dark" ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500" : "bg-gray-100 border-gray-300 focus:ring-blue-500"
              }`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* Toolbar */}
            <div className="flex items-center gap-2 mb-3">
              <button className="p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700" onClick={() => document.execCommand("bold")}>
                <FiBold />
              </button>
              <button className="p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700" onClick={() => document.execCommand("italic")}>
                <FiItalic />
              </button>
              <button className="p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700" onClick={() => document.execCommand("underline")}>
                <FiUnderline />
              </button>
            </div>

            {/* Content Editor */}
            <div
              contentEditable
              className={`w-full min-h-[150px] p-3 rounded-md border focus:ring-2 outline-none mb-4 ${
                theme === "dark" ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500" : "bg-gray-100 border-gray-300 focus:ring-blue-500"
              }`}
              onInput={(e) => setContent(e.currentTarget.textContent)}
            ></div>

            {/* Image Upload */}
            <label className="flex items-center gap-2 cursor-pointer mb-4">
              <FiImage className="text-blue-500" />
              <span className="text-blue-500">Upload Image</span>
              <input type="file" className="hidden" onChange={handleImageUpload} />
            </label>

            {image && <img src={image} alt="Uploaded" className="w-full h-60 object-cover rounded-md mb-4" />}

            {/* Caption Generation */}
            <button
              className="w-full p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 mb-3"
              onClick={generateCaption}
            >
              Generate Caption
            </button>

            {caption && <p className="italic text-gray-500">{caption}</p>}

            {/* Submit Button */}
            <button className="w-full flex items-center justify-center p-3 text-white bg-green-500 rounded-md hover:bg-green-600">
              <FiSend className="mr-2" /> Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
