import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import themeStore from "../store/themeStore";
import { ChevronDown, ChevronUp, Home, User, Settings, LogOut, Menu, Sun, Moon, TrendingUp } from 'lucide-react';
import useAuthStore from '../store/authStore';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Closed by default on mobile
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  const { setLogOut } = useAuthStore();
  const { theme, changeTheme } = themeStore((state) => state);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    themeStore.setState({ isSidebarOpen: !isSidebarOpen });
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      // const response = await axios.post('http://localhost:3000/user/api/logout', {}, { withCredentials: true });
  
      // if (response.data.status === 'success') {
        // disconnectSSE();
        // toast.success(response.data.message);
        toast.success("Logout Successful");
        setTimeout(() => setLogOut(), 2000);
      // }
    } catch (error) {
      console.error(error);
      toast.error('Logout failed. Please try again.');
    }
  };

  // Navigation items
  const navigation = [
    { label: 'Dashboard', icon: Home, to: '/user/dashboard' },
    { label: 'Add Post', icon: TrendingUp, to: '/user/create' },
    { label: 'Friends', icon: TrendingUp, to: '/user/friends' },
    { label: 'Requests', icon: User, to: '/user/request' },
    { label: 'Settings', icon: Settings, to: '/user/settings' },
  ];

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-30 p-2 rounded-lg ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        } lg:hidden`}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar Overlay (Mobile Only) */}
      {isSidebarOpen && (
        <div
          className={`fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden`}
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed h-full z-20 transition-all duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        } ${isSidebarOpen ? 'w-64' : 'w-20'}`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}>
          {isSidebarOpen && (
            <h1 className={`text-xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}>Sync Post</h1>
          )}
          <button
            onClick={toggleSidebar}
            className={`p-2 rounded-lg ${
              theme === "dark" ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigation.map((item, idx) => (
            <div key={idx} className="relative">
              <Link
                to={item.to}
                className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                  theme === "dark" 
                    ? "text-gray-300 hover:bg-gray-700" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {isSidebarOpen && <span className="ml-3">{item.label}</span>}
              </Link>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className={`absolute bottom-0 w-full p-4 border-t ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}>
          <button
            onClick={changeTheme}
            className={`flex items-center w-full p-3 rounded-lg transition-colors ${
              theme === "dark" 
                ? "text-gray-300 hover:bg-gray-700" 
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {isSidebarOpen && <span className="ml-3">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>}
          </button>
          <button
            onClick={handleLogout}
            className={`flex items-center w-full p-3 rounded-lg transition-colors ${
              theme === "dark" 
                ? "text-red-400 hover:bg-red-900/20" 
                : "text-red-600 hover:bg-red-50"
            }`}
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Sidebar;