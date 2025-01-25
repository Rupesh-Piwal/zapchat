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
      <div className="flex-1 flex flex-col overflow-hidden bg-base-200/50 backdrop-blur-sm">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div
      className="flex-1 flex flex-col overflow-hidden bg-base-200/50 bg-gradient-to-br from-base-100 via-base-200 to-base-300 
  backdrop-blur-md 
  shadow-xl 
  rounded-lg 
  border border-base-300/20 "
    >
      <ChatHeader />

      <motion.div
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-custom 
      bg-gradient-to-br from-base-100/50 via-base-200/30 to-base-300/20 
      backdrop-blur-sm"
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
              className={`chat ${
                message.senderId === authUser._id ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border-2 border-base-300 overflow-hidden">
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
              </div>
              <div className="chat-header mb-1 opacity-70 text-xs">
                {message.senderId === authUser._id
                  ? "You"
                  : selectedUser.fullName}
                <time className="ml-2">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <motion.div
                className="chat-bubble flex flex-col"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {message.image && (
                  <div className="relative group mb-2">
                    <img
                      src={message.image || "/placeholder.svg"}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-md">
                      <ImageIcon className="text-white" size={24} />
                    </div>
                  </div>
                )}
                {message.text && <p className="break-words">{message.text}</p>}
              </motion.div>
              {message.senderId === authUser._id &&
                index === messages.length - 1 && (
                  <div className="chat-footer opacity-50 flex items-center mt-1">
                    <CheckCheck size={16} className="mr-1" />
                    <span className="text-xs">Seen</span>
                  </div>
                )}
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
