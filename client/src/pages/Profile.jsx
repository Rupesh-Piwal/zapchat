import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const Profile = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="h-full pt-20 bg-[#080707]">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-[#1C1E22] rounded-xl p-6 space-y-8 border border-[#272A30] shadow-2xl">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-[#FFFFFF]">Profile</h1>
            <p className="mt-2 text-[#747881]">Your profile information</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-[#337EFF]"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-[#272A30] hover:bg-[#337EFF]
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }
                `}
              >
                <Camera className="w-5 h-5 text-[#FFFFFF]" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-[#747881]">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-[#747881] flex items-center gap-2">
                <User className="w-4 h-4 text-[#337EFF]" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-[#272A30] text-[#FFFFFF] rounded-lg border border-[#337EFF]/20">
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-[#747881] flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#337EFF]" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-[#272A30] text-[#FFFFFF] rounded-lg border border-[#337EFF]/20">
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-[#272A30] rounded-xl p-6">
            <h2 className="text-lg font-medium text-[#FFFFFF] mb-4">
              Account Information
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-[#1C1E22] text-[#747881]">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2 text-[#747881]">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
