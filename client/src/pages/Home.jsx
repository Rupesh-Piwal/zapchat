import React, { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import NoChatSelected from "../components/NoChatSelected.jsx";
import ChatContainer from "../components/ChatContainer.jsx";
import Sidebar from "../components/Sidebar.jsx";

const Home = () => {
  const { selectedUser } = useChatStore();
  const [isMobileView, setIsMobileView] = useState(true);
  const handleChatSelect = (user) => {
    // selectedUser(user);
    setIsMobileView(false);
  };

  const handleBackToList = () => {
    setIsMobileView(true);
  };
  return (
    <div className="h-screen bg-[#080707]">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-[#1C1E22] rounded-lg shadow-2xl border border-[#272A30] w-full max-w-8xl h-[calc(100vh-6rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <div
              className={`absolute inset-0 transform transition-all duration-300 ease-in-out ${
                isMobileView
                  ? "translate-x-0"
                  : "-translate-x-full md:translate-x-0 md:relative md:w-20 lg:w-80"
              }`}
            >
              <Sidebar onChatSelect={handleChatSelect} />
            </div>

            <div
              className={`absolute inset-0 transform transition-all duration-300 ease-in-out ${
                isMobileView
                  ? "translate-x-full"
                  : "translate-x-0 md:relative md:flex-1"
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
    </div>
  );
};

export default Home;
