import { Router } from "express";
import imageController from "../controllers/image.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

/**
 * Generate Image
 * POST /api/v1/images/generate
 */
router.post(
  "/generate",
  protect,
  imageController.generate
);

/**
 * Get User Images
 * GET /api/v1/images
 */
router.get(
  "/",
  protect,
  imageController.getAll
);

/**
 * Delete Image
 * DELETE /api/v1/images/:id
 */
router.delete(
  "/:id",
  protect,
  imageController.delete
);

export default router;