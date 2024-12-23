import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(express.json());

try {
  mongoose
    .connect(MONGODB_URL)
    .then(() => {
      console.log("✓ MongoDB connected successfully!");
      app.listen(PORT, () => {
        console.log(`✓ Server running on port: ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });
} catch (error) {
  console.error("Unexpected error during MongoDB connection setup:", error);
  process.exit(1);
}
