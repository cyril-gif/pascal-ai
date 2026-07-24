import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || "5000",

  MONGODB_URI: process.env.MONGODB_URI!,

  JWT_SECRET: process.env.JWT_SECRET!,

  GROQ_API_KEY: process.env.GROQ_API_KEY!,

  GROQ_MODEL:
    process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
};