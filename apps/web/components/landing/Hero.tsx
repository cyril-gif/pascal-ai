"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950">

      <div className="mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-6 text-center">

        <div className="mb-6 flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-blue-400">

          <Sparkles size={18} />

          Powered by Multiple AI Models

        </div>

        <h1 className="max-w-5xl text-5xl font-extrabold leading-tight text-white md:text-7xl">

          Your Intelligent

          <span className="block bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">

            AI Workspace

          </span>

        </h1>

        <p className="mt-8 max-w-3xl text-lg text-slate-400">

          Chat with AI, analyze documents,
          generate images, write code,
          translate languages, and automate your workflow—
          all from one beautiful platform.

        </p>

        <div className="mt-10 flex gap-5">

          <Link
            href="/register"
            className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700"
          >
            Start Free
          </Link>

          <Link
            href="/chat"
            className="rounded-xl border border-slate-700 px-8 py-4 text-white hover:bg-slate-800"
          >
            Live Demo
          </Link>

        </div>

      </div>

    </section>
  );
}