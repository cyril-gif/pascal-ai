import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import {
  registerSchema,
  loginSchema,
} from "./auth.validation";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const data = registerSchema.parse(req.body);

      const result = await authService.register(data);

      return res.status(201).json({
        success: true,
        message: "Registration successful",
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const data = loginSchema.parse(req.body);

      const result = await authService.login(
        data.email,
        data.password
      );

      return res.json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async me(req: any, res: Response) {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  }
}