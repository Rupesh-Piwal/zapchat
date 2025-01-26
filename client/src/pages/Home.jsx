import React from "react";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-[#080707]">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-[#1C1E22] rounded-lg shadow-2xl border border-[#272A30] w-full max-w-8xl h-[calc(100vh-6rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
