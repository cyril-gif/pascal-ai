"use client";

import { useEffect } from "react";
import api from "@/components/web/lib/api";

export default function Home() {
  useEffect(() => {
    async function testAPI() {
      try {
        const res = await api.get("/");
        console.log("✅ Connected to Backend");
        console.log(res.data);
      } catch (error) {
        console.error("❌ Connection Error:", error);
      }
    }

    testAPI();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">
        Pascal AI Frontend Connected 🚀
      </h1>
    </div>
  );
}