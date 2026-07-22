import mongoose from "mongoose";
import { env } from "../config/env";

export const connectDB = async (): Promise<void> => {
  try {
    console.log("🔄 Connecting to MongoDB...");

    await mongoose.connect(env.MONGODB_URI);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error);

    process.exit(1);
  }
};