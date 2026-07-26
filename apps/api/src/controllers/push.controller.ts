import { Request, Response } from "express";
import pushService from "../services/push.service";
import { env } from "../config/env";

class PushController {
  async getPublicKey(req: Request, res: Response) {
    return res.json({
      success: true,
      publicKey: env.VAPID_PUBLIC_KEY,
    });
  }

  async subscribe(req: any, res: Response) {
    try {
      const result = await pushService.subscribe(req.user._id, req.body);
      return res.status(201).json({ success: true, ...result });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  async unsubscribe(req: any, res: Response) {
    try {
      const result = await pushService.unsubscribe(
        req.user._id,
        req.body.endpoint
      );
      return res.json({ success: true, ...result });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}

export default new PushController();