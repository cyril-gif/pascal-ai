"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const generateToken_1 = require("../../utils/generateToken");
class AuthService {
    async register(data) {
        const existingUser = await user_model_1.default.findOne({
            $or: [
                { email: data.email },
                { username: data.username }
            ]
        });
        if (existingUser) {
            throw new Error("User already exists");
        }
        const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
        const user = await user_model_1.default.create({
            ...data,
            password: hashedPassword,
        });
        const token = (0, generateToken_1.generateToken)(user._id.toString(), user.email, user.role);
        return {
            token,
            user,
        };
    }
    async login(email, password) {
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const validPassword = await bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            throw new Error("Invalid credentials");
        }
        const token = (0, generateToken_1.generateToken)(user._id.toString(), user.email, user.role);
        return {
            token,
            user,
        };
    }
}
exports.AuthService = AuthService;
