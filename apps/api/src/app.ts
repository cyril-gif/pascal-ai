import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Pascal AI API 🚀",
  });
});

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Pascal AI API is running 🚀",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

export default app;