import React, { useState } from "react";
import { FiHeart, FiMessageSquare, FiEdit } from "react-icons/fi"; 
import authStore from "../store/authStore";
import Sidebar from "../components/Sidebar";
import TopSearchBar from "../components/TopSearchBar";
import themeStore from "../store/themeStore";
import CommentModal from "../components/CommentModal";

const Friends = () => {
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
      isOwner: true, // Current user owns this post
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
    },
    {
      id: 3,
      user: "travel_buddy",
      image: "https://source.unsplash.com/random/400x300?city",
      caption: "City lights at night 🌃",
      likes: 230,
      comments: [
        { user: "jane_doe", text: "So vibrant!" },
        { user: "mike_smith", text: "Which city is this?" },
      ],
      isOwner: false,
    },
    {
      id: 4,
      user: "foodie_gram",
      image: "https://source.unsplash.com/random/400x300?food",
      caption: "Delicious pasta for dinner! 🍝",
      likes: 150,
      comments: [
        { user: "alice_wonder", text: "Yum! Recipe please!" },
        { user: "john_doe", text: "That looks so good!" },
      ],
      isOwner: false,
    },
    {
      id: 5,
      user: "pet_lover",
      image: "https://source.unsplash.com/random/400x300?dog",
      caption: "My furry friend 🐶",
      likes: 300,
      comments: [
        { user: "sarah_j", text: "So cute! What's their name?" },
        { user: "tom_andy", text: "Adorable!" },
      ],
      isOwner: false,
    },
    {
      id: 6,
      user: "art_lover",
      image: "https://source.unsplash.com/random/400x300?art",
      caption: "Visited an art gallery today 🎨",
      likes: 95,
      comments: [
        { user: "jane_doe", text: "Beautiful artwork!" },
        { user: "alice_wonder", text: "Which gallery is this?" },
      ],
      isOwner: false,
    },
    {
      id: 7,
      user: "fitness_freak",
      image: "https://source.unsplash.com/random/400x300?fitness",
      caption: "Morning workout done! 💪",
      likes: 180,
      comments: [
        { user: "mike_smith", text: "Keep it up!" },
        { user: "sarah_j", text: "You're inspiring!" },
      ],
      isOwner: false,
    },
    {
      id: 8,
      user: "bookworm",
      image: "https://source.unsplash.com/random/400x300?book",
      caption: "New book, who dis? 📚",
      likes: 75,
      comments: [
        { user: "john_doe", text: "What are you reading?" },
        { user: "alice_wonder", text: "Love this book!" },
      ],
      isOwner: false,
    },
    {
      id: 9,
      user: "coffee_addict",
      image: "https://source.unsplash.com/random/400x300?coffee",
      caption: "Coffee is my love language ☕",
      likes: 210,
      comments: [
        { user: "sarah_j", text: "Same here!" },
        { user: "tom_andy", text: "Best way to start the day!" },
      ],
      isOwner: false,
    },
    {
      id: 10,
      user: "adventurer",
      image: "https://source.unsplash.com/random/400x300?hiking",
      caption: "Hiking through the wilderness 🥾",
      likes: 140,
      comments: [
        { user: "jane_doe", text: "Looks like an amazing trail!" },
        { user: "mike_smith", text: "Wish I was there!" },
      ],
      isOwner: false,
    },
  ]);

  // Comment Modal State
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const openCommentModal = (post) => {
    setSelectedPost(post);
    setIsCommentModalOpen(true);
  };

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen w-screen flex`}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col w-full">
        <TopSearchBar />

        {/* Post Section */}
        <div className="flex flex-wrap gap-6 p-6 justify-center">
          {posts.map((post) => (
            <div
              key={post.id}
              className={`w-[500px] rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl ${
                theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            >
              <img src={post.image} alt="Post" className="w-full h-72 object-cover" />

              <div className="p-5">
                <h3 className="text-lg font-semibold">@{post.user}</h3>
                <p className="text-sm opacity-80">{post.caption}</p>

                {/* Actions */}
                <div className="flex items-center justify-between mt-4">
                  <button className="flex items-center gap-1 text-red-500 hover:opacity-75">
                    <FiHeart className="text-lg" /> {post.likes}
                  </button>

                  <button
                    onClick={() => openCommentModal(post)}
                    className="flex items-center gap-1 text-blue-500 hover:opacity-75"
                  >
                    <FiMessageSquare className="text-lg" /> {post.comments.length}
                  </button>

                  {post.isOwner && (
                    <button className="flex items-center gap-1 text-green-500 hover:opacity-75">
                      <FiEdit className="text-lg" /> Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comment Modal */}
        {isCommentModalOpen && (
          <CommentModal post={selectedPost} onClose={() => setIsCommentModalOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default Friends;
