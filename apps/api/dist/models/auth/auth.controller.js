"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const auth_validation_1 = require("./auth.validation");
const authService = new auth_service_1.AuthService();
class AuthController {
    async register(req, res) {
        try {
            const data = auth_validation_1.registerSchema.parse(req.body);
            const result = await authService.register(data);
            return res.status(201).json({
                success: true,
                message: "Registration successful",
                data: result,
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
    async login(req, res) {
        try {
            const data = auth_validation_1.loginSchema.parse(req.body);
            const result = await authService.login(data.email, data.password);
            return res.json({
                success: true,
                message: "Login successful",
                data: result,
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
    async me(req, res) {
        return res.status(200).json({
            success: true,
            user: req.user,
        });
    }
}
exports.AuthController = AuthController;
