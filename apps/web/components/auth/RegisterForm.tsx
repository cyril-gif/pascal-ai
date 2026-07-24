"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export default function RegisterForm() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response =
        await registerUser(form);

      setAuth(
        response.data.user,
        response.data.token
      );

      router.push("/chat");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Registration failed"
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
          Register
        </h1>

        {error && (
          <div className="mb-4 rounded bg-red-500/20 p-3 text-red-400">
            {error}
          </div>
        )}

        <input
          name="firstName"
          placeholder="First Name"
          className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          onChange={handleChange}
        />

        <input
          name="lastName"
          placeholder="Last Name"
          className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          onChange={handleChange}
        />

        <input
          name="username"
          placeholder="Username"
          className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="mb-6 w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 p-3 text-white"
        >
          {loading
            ? "Creating Account..."
            : "Register"}
        </button>
      </form>
    </div>
  );
}