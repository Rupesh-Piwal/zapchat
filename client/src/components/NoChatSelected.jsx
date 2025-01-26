import { MessageSquare, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-8 bg-gradient-to-br from-base-200 to-base-100">
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
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-10 h-10 text-primary" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-secondary rounded-full flex items-center justify-center"
            >
              <Zap className="w-4 h-4 text-secondary-content" />
            </motion.div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative"
          >
            <div className="w-20 h-20 rounded-2xl bg-secondary/10 flex items-center justify-center">
              <Users className="w-10 h-10 text-secondary" />
            </div>
          </motion.div>
        </div>
        <motion.h2
          className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          Welcome to ZapChat 🗪
        </motion.h2>
        <p className="text-lg text-base-content/70">
          Connect instantly with friends and colleagues. Select a conversation
          from the sidebar to start chatting!
        </p>
        <motion.div
          className="bg-base-200 p-6 rounded-xl shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="font-semibold text-lg mb-3">Quick Start Guide</h3>
          <ul className="text-left text-sm space-y-2">
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
