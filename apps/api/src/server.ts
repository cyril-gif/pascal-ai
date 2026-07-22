import app from "./app";
import { connectDB } from "./database/mongodb";
import { env } from "./config/env";

const startServer = async () => {
  try {
    await connectDB();

    app.listen(Number(env.PORT), () => {
      console.log(`
=========================================
🚀 Pascal AI Backend Started
🌍 Environment : ${env.NODE_ENV}
📡 Port        : ${env.PORT}
=========================================
`);
    });
  } catch (error) {
    console.error("❌ Server Startup Failed");
    console.error(error);
    process.exit(1);
  }
};

startServer();