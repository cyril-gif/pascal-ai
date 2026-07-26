import webpush from "web-push";
import User from "../models/user.model";
import { env } from "../config/env";

webpush.setVapidDetails(
  env.VAPID_SUBJECT,
  env.VAPID_PUBLIC_KEY,
  env.VAPID_PRIVATE_KEY
);

export class PushService {
  async subscribe(userId: string, subscription: any) {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const exists = user.pushSubscriptions.some(
      (s) => s.endpoint === subscription.endpoint
    );

    if (!exists) {
      user.pushSubscriptions.push(subscription);
      await user.save();
    }

    return { message: "Subscribed successfully" };
  }

  async unsubscribe(userId: string, endpoint: string) {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    user.pushSubscriptions = user.pushSubscriptions.filter(
      (s) => s.endpoint !== endpoint
    );

    await user.save();

    return { message: "Unsubscribed successfully" };
  }

  async sendToUser(
    userId: string,
    payload: { title: string; body: string; url?: string }
  ) {
    const user = await User.findById(userId);
    if (!user || user.pushSubscriptions.length === 0) return;

    const results = await Promise.allSettled(
      user.pushSubscriptions.map((sub) =>
        webpush.sendNotification(sub as any, JSON.stringify(payload))
      )
    );

    // Clean up subscriptions that are no longer valid (410 Gone / 404)
    const invalidEndpoints: string[] = [];

    results.forEach((result, i) => {
      if (
        result.status === "rejected" &&
        (result.reason?.statusCode === 410 ||
          result.reason?.statusCode === 404)
      ) {
        invalidEndpoints.push(user.pushSubscriptions[i].endpoint);
      }
    });

    if (invalidEndpoints.length > 0) {
      user.pushSubscriptions = user.pushSubscriptions.filter(
        (s) => !invalidEndpoints.includes(s.endpoint)
      );
      await user.save();
    }
  }
}

export default new PushService();