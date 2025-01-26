import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCheck, ImageIcon, File, X, ArrowLeft } from "lucide-react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatMessageTime } from "../lib/utils";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import VoiceRecorder from "./VoiceRecorder";

export default function ChatContainer({ onBackClick }) {
  const [audioUrl, setAudioUrl] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const { messages, getMessages, sendMessage, isMessagesLoading } =
    useChatStore();
  const { authUser } = useAuthStore();
  const scrollContainerRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    getMessages(authUser._id);
  }, [authUser._id, getMessages]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [scrollContainerRef]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileUrl({
          name: file.name,
          url: event.target.result,
          type: file.type,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAudioRecordingComplete = (url) => {
    setAudioUrl(url);
  };

  const handleSendMultimedia = () => {
    if (fileUrl) {
      sendMessage({
        senderId: authUser._id,
        file: fileUrl,
        createdAt: new Date().toISOString(),
      });
      setFileUrl(null);
    }
    if (audioUrl) {
      sendMessage({
        senderId: authUser._id,
        audio: audioUrl,
        createdAt: new Date().toISOString(),
      });
      setAudioUrl(null);
    }
  };

  if (isMessagesLoading) return <MessageSkeleton />;

  return (
    <div className="flex flex-col h-full bg-[#080707] text-[#FFFFFF] pt-16 md:pt-0">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-[#1C1E22] sticky top-0 z-10 w-full">
        <button onClick={onBackClick} className="md:hidden flex items-center">
          <ArrowLeft className="text-[#FFFFFF]" size={24} />
        </button>
        <div className="flex-1 flex justify-center">
          <ChatHeader />
        </div>
      </div>

      {/* Messages Container */}
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
                        ? authUser.profilePic
                        : "/avatar.png"
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
                    {msg.file && (
                      <div className="flex items-center gap-2 mb-2">
                        <File className="text-white" size={24} />
                        <span>{msg.file.name}</span>
                      </div>
                    )}
                    {msg.audio && (
                      <audio controls src={msg.audio} className="mb-2" />
                    )}
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
                      <div className="text-xs text-[#747881] flex items-center mt-1 self-end">
                        <CheckCheck size={16} className="mr-1" /> Seen
                      </div>
                    )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* File/Audio Upload Section */}
      {(fileUrl || audioUrl) && (
        <div className="bg-[#272A30] p-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {fileUrl && (
              <div className="flex items-center gap-2">
                <File className="text-[#337EFF]" size={24} />
                <span className="text-[#FFFFFF]">{fileUrl.name}</span>
              </div>
            )}
            {audioUrl && (
              <audio controls src={audioUrl} className="max-w-[300px]" />
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleSendMultimedia}
              className="bg-[#337EFF] text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
            >
              Send
            </button>
            <button
              onClick={() => {
                setFileUrl(null);
                setAudioUrl(null);
              }}
              className="text-[#747881] hover:text-[#FFFFFF]"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      {/* Message Input and Recorder */}
      <div className="flex justify-between items-center gap-4 p-4 bg-[#1C1E22]">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileUpload}
        />
        <VoiceRecorder onRecordingComplete={handleAudioRecordingComplete} />
        <MessageInput />
      </div>
    </div>
  );
}
