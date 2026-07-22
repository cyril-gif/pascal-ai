import { Router } from "express";
import { AuthController } from "./auth.controller";
import { protect } from "../../middleware/auth.middleware";

const router = Router();
const controller = new AuthController();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/me", protect, controller.me);

export default router;