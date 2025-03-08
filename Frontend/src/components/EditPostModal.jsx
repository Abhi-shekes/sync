import React, { useState, useEffect } from "react";

const EditPostModal = ({ post, onClose, onSave }) => {
  const [editedCaption, setEditedCaption] = useState(post.caption);

  useEffect(() => {
    setEditedCaption(post.caption); // Ensure caption updates if modal is reopened
  }, [post]);

  const handleSave = () => {
    if (editedCaption.trim() === "") return; // Prevent empty captions
    onSave({ ...post, caption: editedCaption });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-2xl w-[400px] transform transition-all scale-100">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">Edit Your Post</h2>

        {/* Caption Input */}
        <textarea
          className="w-full h-32 p-4 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={editedCaption}
          onChange={(e) => setEditedCaption(e.target.value)}
          placeholder="Edit your caption..."
        />

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            className="px-5 py-2 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;
