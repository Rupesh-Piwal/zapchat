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
    <aside className="h-full w-full md:w-20 lg:w-80 border-r border-[#272A30] flex flex-col transition-all duration-300 bg-[#1C1E22] backdrop-blur-sm">
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

      {/* Contact List */}
      <div className="overflow-y-auto w-full py-3 flex-grow scrollbar-thin scrollbar-thumb-[#337EFF] scrollbar-track-[#272A30]">
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
              {/* Profile Image */}
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

              {/* User Name (Only Show on Mobile) */}
              <div className="text-left flex-grow truncate block sm:hidden">
                <div className="font-medium text-[#FFFFFF] truncate">
                  {user.fullName}
                </div>
              </div>

              {/* User Name & Status (Only Show on Desktop) */}
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

        {/* No Contacts Found */}
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
