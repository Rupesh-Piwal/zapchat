import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { app, server } from "./lib/socket.js";

dotenv.config();

const __dirname = path.resolve();

const PORT = process.env.PORT || 5001;
const MONGODB_URL = process.env.MONGODB_URL;

// Middleware
app.use(express.json());
app.use(cookieParser()); // Fix: Add parentheses here
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust based on your frontend URL
    credentials: true, // Allows cookies to be sent and received
  })
);

// MongoDB Connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URL, {});
    console.log("✓ MongoDB connected successfully!");

    // Start server after successful DB connection
    server.listen(PORT, () => {
      console.log(`✓ Server running on port: ${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

connectToDatabase(); // Call the async function

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
