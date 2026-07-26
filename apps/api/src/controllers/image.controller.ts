import { Request, Response } from "express";
import imageService from "../services/image.service";

class ImageController {
  /**
   * POST /api/v1/images/generate
   */
  async generate(req: Request, res: Response) {
    try {
      const { prompt, size, quality } = req.body;

      if (!prompt) {
        return res.status(400).json({
          success: false,
          message: "Prompt is required",
        });
      }

      const image = await imageService.generateImage(
        (req as any).user.id,
        prompt,
        size,
        quality
      );

      return res.status(201).json({
        success: true,
        data: image,
      });
    } catch (error: any) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: error.message || "Image generation failed",
      });
    }
  }

  /**
   * GET /api/v1/images
   */
  async getAll(req: Request, res: Response) {
    try {
      const images = await imageService.getImages(
        (req as any).user.id
      );

      return res.json({
        success: true,
        data: images,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * DELETE /api/v1/images/:id
   */
  async delete(req: Request, res: Response) {
    try {
      await imageService.deleteImage(
        req.params.id,
        (req as any).user.id
      );

      return res.json({
        success: true,
        message: "Image deleted successfully",
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new ImageController();