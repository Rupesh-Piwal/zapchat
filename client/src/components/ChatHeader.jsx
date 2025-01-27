import { X, ArrowLeft } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = ({ onBackClick }) => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="w-full p-2.5 bg-[#1C1E22]/50 sticky top-0 z-10 flex items-center justify-between">
      <div className="flex flex-row items-center gap-3">
        <button onClick={onBackClick} className="md:hidden flex items-center">
          <ArrowLeft className="text-[#FFFFFF]" size={24} />
        </button>
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full overflow-hidden">
            <img src={selectedUser.profilePic || "/avatar.png"} alt="profile" />
          </div>
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p
              className={`text-sm ${
                onlineUsers.includes(selectedUser._id)
                  ? "text-green-500"
                  : "text-red-400"
              }`}
            >
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </div>
      <button className="hidden md:block" onClick={() => setSelectedUser(null)}>
        <X />
      </button>
    </div>
  );
};

export default ChatHeader;
