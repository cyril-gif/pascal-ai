"use client";

import { useEffect, useState } from "react";
import { Bell, BellOff } from "lucide-react";
import {
  subscribeToPush,
  unsubscribeFromPush,
  getPushSubscriptionStatus,
} from "@/services/push.service";

export default function NotificationToggle() {
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!("Notification" in window) || !("PushManager" in window)) {
      setSupported(false);
      return;
    }

    getPushSubscriptionStatus().then(setSubscribed);
  }, []);

  async function handleToggle() {
    setLoading(true);

    try {
      if (subscribed) {
        await unsubscribeFromPush();
        setSubscribed(false);
      } else {
        const success = await subscribeToPush();
        setSubscribed(success);
      }
    } catch (err) {
      console.error("Push toggle failed:", err);
    } finally {
      setLoading(false);
    }
  }

  if (!supported) {
    return (
      <p className="text-xs text-slate-500">
        Push notifications aren't supported on this browser.
      </p>
    );
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className="flex w-full items-center justify-between rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white transition hover:bg-slate-700 disabled:opacity-50"
    >
      <span className="flex items-center gap-2.5">
        {subscribed ? <Bell size={16} /> : <BellOff size={16} />}
        Push notifications
      </span>
      <span
        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
          subscribed
            ? "bg-blue-600/20 text-blue-400"
            : "bg-slate-700 text-slate-400"
        }`}
      >
        {loading ? "..." : subscribed ? "On" : "Off"}
      </span>
    </button>
  );
}