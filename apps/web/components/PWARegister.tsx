"use client";

import { useEffect } from "react";

export default function PWARegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("Service worker registered:", registration.scope);
      })
      .catch((err) => {
        console.error("Service worker registration failed:", err);
      });

    // Listen for background-sync trigger messages from sw.js
    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data?.type === "SYNC_PENDING_MESSAGES") {
        window.dispatchEvent(new Event("pascal-ai-sync-pending"));
      }
    });
  }, []);

  return null;
}