import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import TopSearchBar from "../components/TopSearchBar";
import themeStore from "../store/themeStore";
import { FiUserCheck, FiUserX } from "react-icons/fi";

const FriendRequest = () => {
  const { theme } = themeStore((state) => state);

  // Sample friend requests (Replace with API data)
  const [requests, setRequests] = useState([
    { id: 1, user: "john_doe", avatar: "https://i.pravatar.cc/100?img=1" },
    { id: 2, user: "alice_wonder", avatar: "https://i.pravatar.cc/100?img=2" },
    { id: 3, user: "mike_smith", avatar: "https://i.pravatar.cc/100?img=3" },
  ]);

  // Handle accept/reject
  const handleResponse = (id, action) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
    console.log(`Friend request ${action}ed for user ID: ${id}`);
  };

  return (
    <div className={`min-h-screen w-screen flex ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col w-full">
        <TopSearchBar />

        <div className="p-6">
          <h2 className="text-3xl font-bold text-center mb-6">Friend Requests</h2>

          {requests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className={`flex items-center justify-between p-5 rounded-xl shadow-lg transition duration-300 transform hover:scale-105 ${
                    theme === "dark"
                      ? "bg-gray-800 text-white shadow-gray-700"
                      : "bg-white text-gray-900 shadow-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={request.avatar}
                      alt={request.user}
                      className="w-14 h-14 rounded-full border-2 border-gray-300 dark:border-gray-600"
                    />
                    <p className="font-semibold text-lg">@{request.user}</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleResponse(request.id, "accept")}
                      className="flex items-center gap-2 px-5 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition-all"
                    >
                      <FiUserCheck className="text-lg" />
                      Accept
                    </button>

                    <button
                      onClick={() => handleResponse(request.id, "reject")}
                      className="flex items-center gap-2 px-5 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-all"
                    >
                      <FiUserX className="text-lg" />
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center mt-12">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076483.png"
                alt="No Requests"
                className="w-32 h-32 opacity-50"
              />
              <p className="text-lg font-medium text-gray-500 mt-4">No friend requests at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendRequest;
