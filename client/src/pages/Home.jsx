"use client";

import React, { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const { selectedUser } = useChatStore();
  const [isMobileView, setIsMobileView] = useState(true);

  const handleChatSelect = (user) => {
    setIsMobileView(false); // Hide sidebar and show chat container on mobile
  };

  const handleBackToList = () => {
    setIsMobileView(true); // Show sidebar and hide chat container on mobile
  };

  return (
    <div className="h-screen bg-[#080707] flex items-center justify-center pt-14">
      <div className="bg-[#1C1E22] rounded-lg shadow-2xl border border-[#272A30] w-full max-w-8xl h-[calc(100vh-5rem)] overflow-hidden">
        <div className="flex h-full">
          {/* Sidebar */}
          <div
            className={`md:w-20 lg:w-80 h-full transition-all duration-300 ease-in-out ${
              isMobileView ? "block" : "hidden md:block"
            }`}
          >
            <Sidebar onChatSelect={handleChatSelect} />
          </div>

          {/* Chat Container */}
          <div
            className={`flex-1 h-full transition-all duration-300 ease-in-out ${
              isMobileView ? "hidden md:block" : "block"
            }`}
          >
            {!selectedUser ? (
              <NoChatSelected />
            ) : (
              <ChatContainer onBackClick={handleBackToList} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
