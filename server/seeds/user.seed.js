import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  {
    email: "pixel@example.com",
    fullName: "Pixel",
    password: "123456",
    profilePic:
      "https://pbs.twimg.com/profile_images/1862161433133527040/7enm33kV_400x400.png",
  },
  {
    email: "ray@example.com",
    fullName: "Ray",
    password: "123456",
    profilePic:
      "https://pbs.twimg.com/profile_images/1780042990721077248/TDmtm0K2_400x400.jpg",
  },
  {
    email: "walterwhite@example.com",
    fullName: "Walter White",
    password: "123456",
    profilePic:
      "https://upload.wikimedia.org/wikipedia/en/0/03/Walter_White_S5B.png",
  },
  {
    email: "jessepinkemen@example.com",
    fullName: "Jesse Pinkemen",
    password: "123456",
    profilePic: "https://bidstitchprod.s3.amazonaws.com/uploads/2024/04/10292013-54613-PM-1383084525.jpg",
  },
  {
    email: "caeser@example.com",
    fullName: "Julius Caesar",
    password: "123456",
    profilePic: "https://imgcdn.stablediffusionweb.com/2024/9/30/ef28cd4d-09c7-497f-8240-d861457b1498.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();
