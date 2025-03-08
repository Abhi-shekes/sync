import React, { useState } from "react";
import { FiSend, FiX } from "react-icons/fi";
import themeStore from "../store/themeStore";

const CommentModal = ({ post, onClose }) => {
  const { theme } = themeStore((state) => state);
  const [newComment, setNewComment] = useState("");

  // Handle adding a new comment
  const handleAddComment = () => {
    if (newComment.trim() === "") return; // Prevent empty comments
    // Add your logic to submit the comment (e.g., API call or state update)
    console.log("New Comment:", newComment);
    setNewComment(""); // Clear the input field
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}
      onClick={onClose} // Close modal when clicking outside
    >
      <div
        className={`${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        } rounded-lg w-full max-w-md mx-4 p-6`}
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Comments</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full ${
              theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"
            }`}
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Comments List */}
        <div className="max-h-96 overflow-y-auto mb-6">
          {post.comments.map((comment, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold">@{comment.user}</span>
                <span className="text-sm opacity-80">• 2h ago</span>
              </div>
              <p className="text-sm mt-1">{comment.text}</p>
            </div>
          ))}
        </div>

        {/* Add Comment Section */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className={`flex-1 p-2 rounded-lg border ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-100 border-gray-200 text-gray-900"
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
          <button
            onClick={handleAddComment}
            className={`p-2 rounded-full ${
              theme === "dark" ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-500 hover:bg-purple-600"
            } text-white`}
          >
            <FiSend className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;