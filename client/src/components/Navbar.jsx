import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-[#17191C]/80 border-b border-[#272A30] fixed w-full top-0 z-40 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-[#337EFF]/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-[#337EFF]" />
              </div>
              <h1 className="text-lg font-bold text-white">ZapChat</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className="flex items-center gap-2.5 py-2 px-3 text-white bg-[#272A30] rounded-md hover:bg-[#337EFF] transition-all"
            >
              <Settings className="w-4 h-4 text-white" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to={"/profile"}
                  className="flex items-center gap-2.5 py-2 px-3 text-white bg-[#272A30] rounded-md hover:bg-[#337EFF] transition-all"
                >
                  <User className="w-5 h-5 text-white" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  className="flex items-center gap-2.5 py-2 px-3 text-white bg-[#272A30] rounded-md hover:bg-[#337EFF] transition-all"
                  onClick={logout}
                >
                  <LogOut className="w-5 h-5 text-white" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
