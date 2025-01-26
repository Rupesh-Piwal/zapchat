import { MessageSquare, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

const NoChatSelected = () => {
  return (
    <div className="w-full hidden md:flex flex-1 flex-col items-center justify-center p-8 bg-[#080707] ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md text-center space-y-8"
      >
        <div className="flex justify-center gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative"
          >
            <div className="w-20 h-20 rounded-2xl bg-[#337EFF]/10 flex items-center justify-center">
              <MessageSquare className="w-10 h-10 text-[#337EFF]" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-[#272A30] rounded-full flex items-center justify-center"
            >
              <Zap className="w-4 h-4 text-[#FFFFFF]" />
            </motion.div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative"
          >
            <div className="w-20 h-20 rounded-2xl bg-[#337EFF]/10 flex items-center justify-center">
              <Users className="w-10 h-10 text-[#337EFF]" />
            </div>
          </motion.div>
        </div>
        <motion.h2
          className="text-3xl font-bold text-[#FFFFFF]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          Welcome to ZapChat 🗪
        </motion.h2>
        <p className="text-lg text-[#747881]">
          Connect instantly with friends and colleagues. Select a conversation
          from the sidebar to start chatting!
        </p>
        <motion.div
          className="bg-[#272A30] p-6 rounded-xl shadow-lg border border-[#337EFF]/20"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="font-semibold text-lg mb-3 text-[#FFFFFF]">
            Quick Start Guide
          </h3>
          <ul className="text-left text-sm space-y-2 text-[#747881]">
            <li>👥 Browse your contacts in the sidebar</li>
            <li>🔍 Use the search to find specific people</li>
            <li>💬 Click on a contact to start chatting</li>
            <li>⚡ Enjoy fast, seamless conversations!</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NoChatSelected;
