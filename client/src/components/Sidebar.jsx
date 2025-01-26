import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Search, ChevronDown } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";

const Sidebar = ({ onChatSelect }) => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users
    .filter(
      (user) =>
        (showOnlineOnly ? onlineUsers.includes(user._id) : true) &&
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (onlineUsers.includes(a._id) && !onlineUsers.includes(b._id))
        return -1;
      if (!onlineUsers.includes(a._id) && onlineUsers.includes(b._id)) return 1;
      return a.fullName.localeCompare(b.fullName);
    });

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-screen md:w-20 lg:w-80 border-r border-[#272A30] flex flex-col transition-all duration-300 bg-[#1C1E22] backdrop-blur-sm">
      {/* Top Bar */}
      <div className="border-b border-[#272A30] w-full p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Users className="size-6 text-[#337EFF]" />
          <span className="font-semibold text-lg text-[#FFFFFF] hidden lg:block">
            Contacts
          </span>
        </div>
        <button
          className="p-2 rounded-full hover:bg-[#272A30] lg:hidden"
          onClick={() =>
            document.documentElement.classList.toggle("sidebar-expanded")
          }
        >
          <ChevronDown className="size-4 text-[#FFFFFF]" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="mt-4 mx-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#272A30] text-[#FFFFFF] border border-[#337EFF]/20 focus:outline-none focus:ring-2 focus:ring-[#337EFF]"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-[#747881]" />
        </div>
      </div>

      {/* Online Users Toggle */}
      <div className="mt-3 mx-4 flex items-center justify-between text-base-content/60">
        <label className="cursor-pointer flex items-center gap-2">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="appearance-none w-4 h-4 rounded border border-[#337EFF] checked:bg-[#337EFF] checked:border-transparent"
          />
          <span className="text-sm text-[#FFFFFF]">Show online only</span>
        </label>
        <span className="text-xs text-[#747881]">
          {onlineUsers.length - 1} online
        </span>
      </div>

      {/* Contact List */}
      <div className="overflow-y-auto w-full py-3 flex-grow scrollbar-thin scrollbar-thumb-[#337EFF] scrollbar-track-[#272A30] hover:scrollbar-thumb-[#4a90e2]">
        <AnimatePresence>
          {filteredUsers.map((user) => (
            <motion.button
              key={user._id}
              onClick={() => {
                setSelectedUser(user);
                onChatSelect(user);
              }}
              className={`w-full p-3 flex items-center gap-3 transition-colors ${
                selectedUser?._id === user._id
                  ? "bg-[#272A30]"
                  : "hover:bg-[#272A30]"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="size-10 sm:size-12 object-cover rounded-full"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-[#1C1E22]" />
                )}
              </div>

              {/* User Name (Mobile View) */}
              <div className="text-left flex-grow truncate block sm:hidden">
                <div className="font-medium text-[#FFFFFF] truncate">
                  {user.fullName}
                </div>
              </div>

              {/* User Name & Status (Desktop View) */}
              <div className="hidden sm:block text-left min-w-0 flex-grow">
                <div className="font-medium truncate text-[#FFFFFF]">
                  {user.fullName}
                </div>
                <div className="text-sm text-[#747881]">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>

        {/* No Contacts Found Message */}
        {filteredUsers.length === 0 && (
          <div className="text-center text-[#747881] py-8">
            No contacts found
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
