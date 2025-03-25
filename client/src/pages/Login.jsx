import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0E1A] via-[#121620] to-[#1A2032] p-4">
      <div className="relative w-full max-w-4xl bg-[#1E2433]/60 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 sm:p-16">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-3xl bg-[#337EFF]/10 flex items-center justify-center transition-all duration-500 hover:rotate-12 hover:scale-110 group">
              <MessageSquare className="w-10 h-10 text-[#337EFF] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(51,126,255,0.5)]" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white tracking-tight bg-clip-text bg-gradient-to-r from-[#337EFF] to-[#6F57FF]">
            ZapChat
          </h1>
          <p className="text-[#A0A5AD] text-xl font-medium">
            Your Gateway to Seamless Communication
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md mx-auto space-y-6 mt-8"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#A0A5AD] mb-2 flex items-center">
              <Mail className="mr-2 text-[#337EFF] opacity-70" /> Email Address
            </label>
            <input
              type="email"
              className="w-full pl-6 pr-4 py-4 bg-[#272A30]/50 border border-[#337EFF]/20 rounded-2xl text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#337EFF]/50 transition-all duration-300 placeholder-[#747881] shadow-inner"
              placeholder="you@connecthub.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#A0A5AD] mb-2 flex items-center">
              <Lock className="mr-2 text-[#337EFF] opacity-70" /> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-6 pr-12 py-4 bg-[#272A30]/50 border border-[#337EFF]/20 rounded-2xl text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#337EFF]/50 transition-all duration-300 placeholder-[#747881] shadow-inner"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-[#747881] hover:text-[#337EFF] transition-colors" />
                ) : (
                  <Eye className="h-5 w-5 text-[#747881] hover:text-[#337EFF] transition-colors" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-4 px-4 mt-4 bg-gradient-to-r from-[#337EFF] to-[#6F57FF] text-white rounded-2xl font-semibold text-lg hover:from-[#2C6FFF] hover:to-[#5C4AFF] focus:outline-none focus:ring-2 focus:ring-[#337EFF]/50 transition-all duration-300 ease-in-out flex justify-center items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </button>
          <div className="text-center pt-4">
            <p className="text-[#A0A5AD]">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="text-[#337EFF] hover:text-[#6F57FF] transition-colors font-semibold"
              >
                Create Account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
