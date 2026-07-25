"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongodb_1 = require("./database/mongodb");
const env_1 = require("./config/env");
const startServer = async () => {
    try {
        await (0, mongodb_1.connectDB)();
        app_1.default.listen(Number(env_1.env.PORT), () => {
            console.log(`
=========================================
🚀 Pascal AI Backend Started
🌍 Environment : ${env_1.env.NODE_ENV}
📡 Port        : ${env_1.env.PORT}
=========================================
`);
        });
    }
    catch (error) {
        console.error("❌ Server Startup Failed");
        console.error(error);
        process.exit(1);
    }
};
startServer();
