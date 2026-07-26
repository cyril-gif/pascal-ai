import { Router } from "express";
import pushController from "../controllers/push.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/public-key", pushController.getPublicKey);
router.post("/subscribe", protect, pushController.subscribe);
router.post("/unsubscribe", protect, pushController.unsubscribe);

export default router;