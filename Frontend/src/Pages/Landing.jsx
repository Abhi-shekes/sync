import { useState } from "react";
import {
  FiEdit,
  FiCamera,
  FiHeart,
  FiMessageSquare,
} from "react-icons/fi";
import { motion } from "framer-motion";
import themeStore from "../store/themeStore";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Animation variants for Framer Motion
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Landing = () => {
  const { theme } = themeStore(); 
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  // Mock data
  const trendingPosts = [
    { id: 1, user: "explorer_amy", likes: 3201, image: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 2, user: "foodie_luke", likes: 2109, image: "https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 3, user: "urban_john", likes: 2807, image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  ];

  const features = [
    { icon: <FiEdit />, title: "Create Posts", text: "Express yourself with rich text and images." },
    { icon: <FiCamera />, title: "Upload Media", text: "Share high-quality photos and videos." },
    { icon: <FiHeart />, title: "Engage", text: "Like, comment, and interact with the community." },
  ];

  const testimonials = [
    {
      name: "Olivia Carter",
      role: "Content Creator",
      text: "InstaPost has given me a great platform to share my content and grow my audience.",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      name: "Daniel Robinson",
      role: "Photographer",
      text: "I love how easy it is to upload and edit photos! The dark mode is a plus.",
      image: "https://randomuser.me/api/portraits/men/50.jpg",
    },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} mt-20`}>
      
      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <motion.h1 variants={fadeInUp} initial="hidden" animate="visible" className="text-5xl font-extrabold mb-6">
          Share Your World
        </motion.h1>
        <motion.p variants={fadeInUp} initial="hidden" animate="visible" className="text-xl mb-8 opacity-80">
          Join a vibrant community of creators, photographers, and explorers.
        </motion.p>
        <motion.button 
          variants={fadeInUp} 
          initial="hidden" 
          animate="visible"
          onClick={() => navigate("/login")} // Navigate to Login Page
          className={`px-8 py-3 rounded-full text-lg font-semibold transition-all ${
            theme === "dark" ? "bg-purple-600 hover:bg-purple-700 text-white" : "bg-purple-500 hover:bg-purple-600 text-white"
          }`}
        >
          Start Creating
        </motion.button>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose InstaPost?</h2>
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div key={index} variants={fadeInUp} className="p-6 rounded-xl bg-white text-gray-900 text-center shadow-lg hover:scale-105 transform transition">
              <div className="text-4xl mb-4 text-purple-600">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="opacity-80">{feature.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Trending Posts Section */}
  {/* Trending Posts Section */}
<section className="py-20 px-6">
  <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
    Trending Now
  </h2>
  <motion.div
    variants={staggerContainer}
    initial="hidden"
    animate="visible"
    className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
  >
    {trendingPosts.map((post) => (
      <motion.div
        key={post.id}
        variants={fadeInUp}
        className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 hover:scale-105 transform transition"
      >
        <img src={post.image} alt={`Post by ${post.user}`} className="w-full h-64 object-cover" />
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold transition-colors duration-300 
              text-gray-900 dark:text-gray-200">
              @{post.user}
            </span>
            <div className="flex items-center gap-2">
              <FiHeart className="text-red-500" /> {post.likes}
            </div>
          </div>
        </div>
      </motion.div>
    ))}
  </motion.div>
</section>

      {/* Testimonials Section */}
      {/* Testimonials Section */}
<section className="py-20 px-6 bg-gray-200 dark:bg-gray-800">
  <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
    What Our Users Say
  </h2>
  <motion.div
    variants={staggerContainer}
    initial="hidden"
    animate="visible"
    className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
  >
    {testimonials.map((testimonial, index) => (
      <motion.div
        key={index}
        variants={fadeInUp}
        className="p-8 rounded-xl bg-white dark:bg-gray-900 shadow-lg hover:scale-105 transform transition flex flex-col items-center text-center"
      >
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-16 h-16 rounded-full mb-4 border-2 border-purple-500"
        />
        <p
          className="text-xl mb-4 italic transition-colors duration-300 
            text-gray-900 dark:text-gray-200"
        >
          "{testimonial.text}"
        </p>
        <h4 className="font-semibold text-gray-900 dark:text-white">
          {testimonial.name}
        </h4>
        <p className="opacity-80 text-gray-700 dark:text-gray-400">
          {testimonial.role}
        </p>
      </motion.div>
    ))}
  </motion.div>
</section>


    </div>
  );
};

export default Landing;
