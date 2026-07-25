"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const auth_routes_1 = __importDefault(require("./models/auth/auth.routes"));
const chat_routes_1 = __importDefault(require("./routes/chat.routes"));
const app = (0, express_1.default)();
/**
 * ====================================
 * Security Middleware
 * ====================================
 */
app.use((0, helmet_1.default)());
const allowedOrigins = [
    "http://localhost:3000",
    process.env.FRONTEND_URL,
].filter(Boolean);
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
/**
 * ====================================
 * Rate Limiter
 * ====================================
 */
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);
/**
 * ====================================
 * General Middleware
 * ====================================
 */
app.use((0, compression_1.default)({
    filter: (req, res) => {
        if (req.path.includes("/chat/"))
            return false; // don't buffer streaming responses
        return compression_1.default.filter(req, res);
    },
}));
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
/**
 * ====================================
 * Root Route
 * ====================================
 */
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        application: "Pascal AI",
        message: "Welcome to Pascal AI 🚀",
        version: "1.0.0",
        timestamp: new Date().toISOString(),
    });
});
/**
 * ====================================
 * API Root
 * ====================================
 */
app.get("/api/v1", (req, res) => {
    res.status(200).json({
        success: true,
        application: "Pascal AI",
        message: "Pascal AI API v1 is running 🚀",
        version: "1.0.0",
        endpoints: {
            health: "/api/v1/health",
            auth: "/api/v1/auth",
            chat: "/api/v1/chat",
        },
        timestamp: new Date().toISOString(),
    });
});
/**
 * ====================================
 * Health Check
 * ====================================
 */
app.get("/api/v1/health", (req, res) => {
    res.status(200).json({
        success: true,
        status: "healthy",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});
/**
 * ====================================
 * API Routes
 * ====================================
 */
app.use("/api/v1/auth", auth_routes_1.default);
app.use("/api/v1/chat", chat_routes_1.default);
/**
 * ====================================
 * 404 Handler
 * ====================================
 */
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found.`,
    });
});
/**
 * ====================================
 * Global Error Handler
 * ====================================
 */
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "development"
            ? err.stack
            : undefined,
    });
});
exports.default = app;
