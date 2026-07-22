import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import authRoutes from "./models/auth/auth.routes";

const app: Application = express();

/**
 * ============================
 * Security Middleware
 * ============================
 */
app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

/**
 * ============================
 * Rate Limiter
 * ============================
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

/**
 * ============================
 * General Middleware
 * ============================
 */
app.use(compression());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

/**
 * ============================
 * Root Route
 * ============================
 */
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    application: "Pascal AI",
    message: "Welcome to Pascal AI API 🚀",
    version: "1.0.0",
    status: "Running",
    timestamp: new Date().toISOString(),
  });
});

/**
 * ============================
 * Health Check
 * ============================
 */
app.get("/api/v1/health", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Pascal AI API is healthy ✅",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

/**
 * ============================
 * API Routes
 * ============================
 */
app.use("/api/v1/auth", authRoutes);

/**
 * ============================
 * 404 Route
 * ============================
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found.`,
  });
});

/**
 * ============================
 * Global Error Handler
 * ============================
 */
app.use(
  (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error(err);

    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
      stack:
        process.env.NODE_ENV === "development"
          ? err.stack
          : undefined,
    });
  }
);

export default app;