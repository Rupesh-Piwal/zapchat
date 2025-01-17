import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Search, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
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
    <aside className="h-full w-20 lg:w-80 border-r border-base-300 flex flex-col transition-all duration-300 bg-base-100/95 backdrop-blur-sm">
      <div className="border-b border-base-300 w-full p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="size-6 text-primary" />
            <span className="font-semibold text-lg hidden lg:block">
              Contacts
            </span>
          </div>
          <button
            className="btn btn-ghost btn-sm btn-circle lg:hidden"
            onClick={() =>
              document.documentElement.classList.toggle("sidebar-expanded")
            }
          >
            <ChevronDown className="size-4" />
          </button>
        </div>
        <div className="mt-4 hidden lg:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered input-sm w-full pl-9"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-base-content/50" />
          </div>
        </div>
        <div className="mt-3 hidden lg:flex items-center justify-between">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-primary checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-base-content/60">
            {onlineUsers.length - 1} online
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3 flex-grow">
        <AnimatePresence>
          {filteredUsers.map((user) => (
            <motion.button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full p-3 flex items-center gap-3
                hover:bg-base-200 transition-colors
                ${selectedUser?._id === user._id ? "bg-base-200" : ""}
              `}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="size-12 object-cover rounded-full border-2 border-base-300"
                />
                {onlineUsers.includes(user._id) && (
                  <span
                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                    rounded-full ring-2 ring-base-100"
                  />
                )}
              </div>
              <div className="hidden lg:block text-left min-w-0 flex-grow">
                <div className="font-medium truncate">{user.fullName}</div>
                <div className="text-sm text-base-content/60">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>

        {filteredUsers.length === 0 && (
          <div className="text-center text-base-content/60 py-8">
            No contacts found
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
