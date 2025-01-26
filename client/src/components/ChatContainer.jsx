import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatMessageTime } from "../lib/utils";
import { ImageIcon, CheckCheck } from "lucide-react";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const scrollContainerRef = useRef(null);

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
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden bg-[#080707] text-[#FFFFFF]">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#080707] text-[#FFFFFF]">
      <ChatHeader />

      <motion.div
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#337EFF] scrollbar-track-[#272A30]"
        ref={scrollContainerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={message._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex w-full ${
                message.senderId === authUser._id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`flex items-start gap-2 max-w-[80%] ${
                  message.senderId === authUser._id ? "flex-row-reverse" : ""
                }`}
              >
                <div className="size-10 rounded-full border-2 border-[#337EFF] overflow-hidden">
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="text-xs text-[#747881] mb-1">
                    {message.senderId === authUser._id
                      ? "You"
                      : selectedUser.fullName}
                    <span className="ml-2">
                      {formatMessageTime(message.createdAt)}
                    </span>
                  </div>
                  <motion.div
                    className={`px-4 py-2 rounded-2xl shadow-lg ${
                      message.senderId === authUser._id
                        ? "bg-[#337EFF] text-white"
                        : "bg-[#272A30] text-[#FFFFFF]"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {message.image && (
                      <div className="relative group mb-2">
                        <img
                          src={message.image || "/placeholder.svg"}
                          alt="Attachment"
                          className="max-w-[200px] rounded-md"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-md">
                          <ImageIcon className="text-white" size={24} />
                        </div>
                      </div>
                    )}
                    {message.text && (
                      <p className="break-words text-sm">{message.text}</p>
                    )}
                  </motion.div>
                  {message.senderId === authUser._id &&
                    index === messages.length - 1 && (
                      <div className="text-xs text-[#747881] flex items-center mt-1 self-end">
                        <CheckCheck size={16} className="mr-1" />
                        Seen
                      </div>
                    )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messageEndRef} />
      </motion.div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
