"use client";

import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Code2,
  Brain,
  Zap,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[180px]" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[150px]" />

        <div className="absolute left-0 top-40 h-80 w-80 rounded-full bg-purple-600/10 blur-[150px]" />

      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 pt-28 text-center">

        {/* Badge */}

        <div className="mb-8 flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-blue-300">

          <Sparkles size={18} />

          Powered by GPT • Claude • Gemini • Groq

        </div>

        {/* Heading */}

        <h1 className="max-w-5xl text-5xl font-black leading-tight text-white md:text-7xl">

          The AI Workspace

          <br />

          Built For

          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">

            {" "}
            Everyone

          </span>

        </h1>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-400 md:text-xl">

          Chat, code, write, research, analyze files,
          generate images, summarize documents and
          automate your workflow from one beautiful
          AI platform.

        </p>

        {/* Buttons */}

        <div className="mt-12 flex flex-col gap-5 sm:flex-row">

          <Link
            href="/register"
            className="flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition hover:scale-105 hover:bg-blue-700"
          >
            Start Free

            <ArrowRight size={20} />

          </Link>

          <Link
            href="/login"
            className="rounded-2xl border border-slate-700 px-8 py-4 text-lg font-semibold text-white transition hover:border-blue-500 hover:bg-slate-900"
          >
            Sign In
          </Link>

        </div>

        {/* Feature Pills */}

        <div className="mt-20 grid w-full max-w-5xl gap-6 md:grid-cols-3">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">

            <Brain className="mb-5 h-10 w-10 text-blue-400" />

            <h3 className="mb-3 text-xl font-bold text-white">
              Smart AI
            </h3>

            <p className="text-slate-400">
              Multiple AI models working together to
              produce better answers.
            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">

            <Code2 className="mb-5 h-10 w-10 text-cyan-400" />

            <h3 className="mb-3 text-xl font-bold text-white">
              Built for Developers
            </h3>

            <p className="text-slate-400">
              Generate code, debug applications and
              build full-stack software faster.
            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">

            <Zap className="mb-5 h-10 w-10 text-yellow-400" />

            <h3 className="mb-3 text-xl font-bold text-white">
              Lightning Fast
            </h3>

            <p className="text-slate-400">
              Powered by Groq for extremely fast AI
              responses with minimal latency.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}