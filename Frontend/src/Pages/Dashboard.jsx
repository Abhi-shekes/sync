import React, { useState } from "react";
import { FiHeart, FiMessageSquare, FiEdit, FiTrash2 } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import TopSearchBar from "../components/TopSearchBar";
import themeStore from "../store/themeStore";
import CommentModal from "../components/CommentModal";
import EditPostModal from "../components/EditPostModal";

const Dashboard = () => {
  const { theme } = themeStore((state) => state);

  // Sample Posts (Replace with API)
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "john_doe",
      image: "https://source.unsplash.com/random/400x300?nature",
      caption: "Enjoying the sunset! 🌅",
      likes: 120,
      comments: [
        { user: "jane_doe", text: "Wow, amazing view!" },
        { user: "mike_smith", text: "So peaceful! Where is this?" },
      ],
      isOwner: true,
    },
    {
      id: 2,
      user: "alice_wonder",
      image: "https://source.unsplash.com/random/400x300?travel",
      caption: "Exploring the mountains! 🏔️",
      likes: 85,
      comments: [
        { user: "tom_andy", text: "This looks incredible!" },
        { user: "sarah_j", text: "I need to visit this place!" },
      ],
      isOwner: false,
    }
  ]);

  // Comment Modal State
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const openCommentModal = (post) => {
    setSelectedPost(post);
    setIsCommentModalOpen(true);
  };

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = (post) => {
    setSelectedPost(post);
    setIsEditModalOpen(true);
  };

  const saveEditedPost = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
    setIsEditModalOpen(false);
  };

  // Delete Post Function
  const deletePost = (postId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    }
  };

  return (
    <div className={`min-h-screen w-screen flex ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col w-full">
        <TopSearchBar />

        {/* Post Section */}
        <div className="flex flex-wrap gap-6 p-6 justify-center">
          {posts.map((post) => (
            <div key={post.id} className={`w-[500px] rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
              <img src={post.image} alt="Post" className="w-full h-72 object-cover" />
              <div className="p-5">
                <h3 className="text-lg font-semibold">@{post.user}</h3>
                <p className="text-sm opacity-80">{post.caption}</p>

                {/* Actions */}
                <div className="flex items-center justify-between mt-4">
                  <button className="flex items-center gap-1 text-red-500 hover:opacity-75">
                    <FiHeart className="text-lg" /> {post.likes}
                  </button>

                  <button onClick={() => openCommentModal(post)} className="flex items-center gap-1 text-blue-500 hover:opacity-75">
                    <FiMessageSquare className="text-lg" /> {post.comments.length}
                  </button>

                  {post.isOwner && (
                    <div className="flex gap-3">
                      {/* Edit Button */}
                      <button onClick={() => openEditModal(post)} className="flex items-center gap-1 text-green-500 hover:opacity-75">
                        <FiEdit className="text-lg" /> Edit
                      </button>

                      {/* Delete Button */}
                      <button onClick={() => deletePost(post.id)} className="flex items-center gap-1 text-red-500 hover:opacity-75">
                        <FiTrash2 className="text-lg" /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comment Modal */}
        {isCommentModalOpen && <CommentModal post={selectedPost} onClose={() => setIsCommentModalOpen(false)} />}

        {/* Edit Post Modal */}
        {isEditModalOpen && <EditPostModal post={selectedPost} onClose={() => setIsEditModalOpen(false)} onSave={saveEditedPost} />}
      </div>
    </div>
  );
};

export default Dashboard;
