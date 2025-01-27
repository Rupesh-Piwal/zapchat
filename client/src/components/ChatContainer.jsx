import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCheck, ImageIcon, File, X, ArrowLeft } from "lucide-react";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatMessageTime } from "../lib/utils";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import VoiceRecorder from "./VoiceRecorder";
import ChatHeader from "./ChatHeader";

export default function ChatContainer({ onBackClick }) {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const scrollContainerRef = useRef(null);
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) return <MessageSkeleton />;

  return (
    <div className="flex flex-col h-full bg-[#080707] text-[#FFFFFF]">
      <ChatHeader onBackClick={onBackClick} />
      <motion.div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#337EFF] scrollbar-track-[#272A30]"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <motion.div
              key={msg._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex w-full ${
                msg.senderId === authUser._id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start gap-2 max-w-[80%] ${
                  msg.senderId === authUser._id ? "flex-row-reverse" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-full border-2 border-[#337EFF] overflow-hidden">
                  <img
                    src={
                      msg.senderId === authUser._id
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="text-xs text-[#747881] mb-1">
                    {msg.senderId === authUser._id ? "You" : "User"}
                    <span className="ml-2">
                      {formatMessageTime(msg.createdAt)}
                    </span>
                  </div>
                  <motion.div
                    className={`px-4 py-2 rounded-2xl shadow-lg ${
                      msg.senderId === authUser._id
                        ? "bg-[#001A3D] text-white"
                        : "bg-[#272A30] text-[#FFFFFF]"
                    }`}
                  >
                    {msg.image && (
                      <div className="relative group mb-2">
                        <img
                          src={msg.image || "/placeholder.svg"}
                          alt="Attachment"
                          className="max-w-[200px] rounded-md"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-md">
                          <ImageIcon className="text-white" size={24} />
                        </div>
                      </div>
                    )}
                    {msg.text && (
                      <p className="break-words text-sm">{msg.text}</p>
                    )}
                  </motion.div>
                  {msg.senderId === authUser._id &&
                    index === messages.length - 1 && (
                      <div className="text-xs text-[#337EFF] flex items-center mt-1 self-end">
                        <CheckCheck size={16} className="mr-1" /> Seen
                      </div>
                    )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="flex justify-between items-center gap-4 p-4 bg-[#1C1E22]">
        <VoiceRecorder />
        <MessageInput />
      </div>
    </div>
  );
}
