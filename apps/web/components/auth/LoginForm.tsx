"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export default function LoginForm() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await loginUser({
        email,
        password,
      });

      setAuth(
        response.data.user,
        response.data.token
      );

      router.push("/chat");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Login failed"
      );
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8"
      >
        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          Login
        </h1>

        {error && (
          <div className="mb-4 rounded bg-red-500/20 p-3 text-red-400">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-6 w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 p-3 text-white"
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>
      </form>
    </div>
  );
}