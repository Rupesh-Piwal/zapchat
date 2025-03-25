import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
  Zap,
  ArrowRight,
  Shield,
  Globe,
} from "lucide-react";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F1217] via-[#121620] to-[#1A2032] p-4 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#337EFF]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-[#6F57FF]/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative w-full max-w-5xl grid lg:grid-cols-2 bg-[#1E2433]/60 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden">
        {/* Signup Form Section */}
        <div className="flex flex-col justify-center items-center p-8 sm:p-16 space-y-10 relative z-10">
          {/* Branding */}
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <div
                className="w-20 h-20 rounded-3xl bg-[#337EFF]/10 flex items-center justify-center 
                transition-all duration-500 hover:rotate-12 hover:scale-110 group"
              >
                <Zap
                  className="w-10 h-10 text-[#337EFF] 
                  group-hover:scale-110 group-hover:rotate-6 
                  transition-transform duration-300 
                  drop-shadow-[0_0_15px_rgba(51,126,255,0.5)]"
                />
              </div>
            </div>
            <h1
              className="text-5xl font-bold text-white tracking-tight bg-clip-text 
             bg-gradient-to-r from-[#337EFF] to-[#6F57FF]"
            >
              ZapChat
            </h1>
            <p className="text-[#A0A5AD] text-xl font-medium">
              Create Your Account
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
            {/* Username Input */}
            <div className="space-y-2">
              <label className=" text-sm font-medium text-[#A0A5AD] mb-2 flex items-center">
                <User className="mr-2 text-[#337EFF] opacity-70" />
                Username
              </label>
              <input
                type="text"
                className="w-full pl-6 pr-4 py-4 bg-[#272A30]/50 border border-[#337EFF]/20 
                rounded-2xl text-white backdrop-blur-sm
                focus:outline-none focus:ring-2 focus:ring-[#337EFF]/50 
                transition-all duration-300 
                placeholder-[#747881] shadow-inner"
                placeholder="Choose a username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#A0A5AD] mb-2 flex items-center">
                <Mail className="mr-2 text-[#337EFF] opacity-70" />
                Email Address
              </label>
              <input
                type="email"
                className="w-full pl-6 pr-4 py-4 bg-[#272A30]/50 border border-[#337EFF]/20 
                rounded-2xl text-white backdrop-blur-sm
                focus:outline-none focus:ring-2 focus:ring-[#337EFF]/50 
                transition-all duration-300 
                placeholder-[#747881] shadow-inner"
                placeholder="you@zapchat.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#A0A5AD] mb-2 flex items-center">
                <Lock className="mr-2 text-[#337EFF] opacity-70" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-6 pr-12 py-4 bg-[#272A30]/50 border border-[#337EFF]/20 
                  rounded-2xl text-white backdrop-blur-sm
                  focus:outline-none focus:ring-2 focus:ring-[#337EFF]/50 
                  transition-all duration-300 
                  placeholder-[#747881] shadow-inner"
                  placeholder="Create a strong password"
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 px-4 mt-4 bg-gradient-to-r from-[#337EFF] to-[#6F57FF] 
              text-white rounded-2xl font-semibold text-lg 
              hover:from-[#2C6FFF] hover:to-[#5C4AFF] 
              focus:outline-none focus:ring-2 focus:ring-[#337EFF]/50 
              transition-all duration-300 ease-in-out
              flex justify-center items-center space-x-2
              disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </button>

            {/* Login Link */}
            <div className="text-center pt-4">
              <p className="text-[#A0A5AD]">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#337EFF] hover:text-[#6F57FF] 
                  transition-colors font-semibold"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Features Showcase Section */}
        <div className="hidden lg:flex flex-col justify-center items-center p-16 bg-[#1A2032]/50 backdrop-blur-xl relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-pattern"></div>
          <div className="relative z-10 space-y-8 max-w-md">
            <h2
              className="text-4xl font-bold text-white mb-6 bg-clip-text 
               bg-gradient-to-r from-[#337EFF] to-[#6F57FF]"
            >
              Why Join ZapChat?
            </h2>

            <div className="space-y-6">
              {[
                {
                  icon: Zap,
                  title: "Instant Connections",
                  description:
                    "Connect with friends and colleagues in seconds.",
                },
                {
                  icon: Shield,
                  title: "Robust Security",
                  description:
                    "Your data and conversations are always protected.",
                },
                {
                  icon: Globe,
                  title: "Global Community",
                  description:
                    "Meet people from around the world effortlessly.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-[#272A30]/30 
                  rounded-xl border border-[#337EFF]/10 
                  hover:bg-[#272A30]/50 transition-all duration-300"
                >
                  <feature.icon className="w-8 h-8 text-[#337EFF] opacity-80" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-[#A0A5AD] text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
