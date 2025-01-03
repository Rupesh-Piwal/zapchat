import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";


const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";


export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  // Method: Checks the user's authentication status
  checkAuth: async () => {
    try {
      // Make a GET request to check authentication status
      const res = await axiosInstance.get("/auth/check");
      // Update authUser state with the authenticated user's data
      set({ authUser: res.data });
      // Connect to the WebSocket server
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      // Set authUser to null if authentication check fails
      set({ authUser: null });
    } finally {
      // Set isCheckingAuth to false after the process completes
      set({ isCheckingAuth: false });
    }
  },

  // Method: Handles user signup
  signup: async (data) => {
    set({ isSigningUp: true }); // Set isSigningUp to true during the signup process
    try {
      // Make a POST request to create a new user account
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data }); // Update authUser state with the new user's data
      toast.success("Account created successfully"); // Show success message
      get().connectSocket(); // Connect to the WebSocket server
    } catch (error) {
      toast.error(error.response.data.message); // Show error message if signup fails
    } finally {
      set({ isSigningUp: false }); // Reset isSigningUp state
    }
  },

  // Method: Handles user login
  login: async (data) => {
    set({ isLoggingIn: true }); // Set isLoggingIn to true during the login process
    try {
      // Make a POST request to log the user in
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data }); // Update authUser state with the logged-in user's data
      toast.success("Logged in successfully"); // Show success message
      get().connectSocket(); // Connect to the WebSocket server
    } catch (error) {
      toast.error(error.response.data.message); // Show error message if login fails
    } finally {
      set({ isLoggingIn: false }); // Reset isLoggingIn state
    }
  },

  // Method: Handles user logout
  logout: async () => {
    try {
      // Make a POST request to log the user out
      await axiosInstance.post("/auth/logout");
      set({ authUser: null }); // Clear the authUser state
      toast.success("Logged out successfully"); // Show success message
      get().disconnectSocket(); // Disconnect from the WebSocket server
    } catch (error) {
      toast.error(error.response.data.message); // Show error message if logout fails
    }
  },

  // Method: Updates the user's profile
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true }); // Set isUpdatingProfile to true during the update process
    try {
      // Make a PUT request to update the user's profile
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data }); // Update authUser state with the updated profile data
      toast.success("Profile updated successfully"); // Show success message
    } catch (error) {
      console.log("Error in update profile:", error);
      toast.error(error.response.data.message); // Show error message if update fails
    } finally {
      set({ isUpdatingProfile: false }); // Reset isUpdatingProfile state
    }
  },

  // Method: Connects to the WebSocket server
  connectSocket: () => {
    const { authUser } = get(); // Retrieve authUser from the state
    // If no user is authenticated or the socket is already connected, do nothing
    if (!authUser || get().socket?.connected) return;

    // Create a new Socket.IO client instance
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id, // Pass the user's ID as a query parameter
      },
    });
    socket.connect(); // Connect the socket

    set({ socket: socket }); // Update the socket state

    // Listen for the "getOnlineUsers" event to update the online users list
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds }); // Update onlineUsers state with the received data
    });
  },

  // Method: Disconnects from the WebSocket server
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect(); // Disconnect the socket if connected
  },
}));
