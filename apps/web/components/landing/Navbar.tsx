"use client";

import Link from "next/link";
import { Bot, ArrowRight } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-white"
        >
          <Bot className="h-8 w-8 text-blue-500" />

          <span className="text-xl font-bold">
            Pascal AI
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <Link href="/">Home</Link>
          <Link href="#features">Features</Link>
          <Link href="#pricing">Pricing</Link>
          <Link href="/chat">Chat</Link>
        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-3">

          <Link
            href="/login"
            className="rounded-lg border border-slate-700 px-4 py-2 text-white transition hover:bg-slate-800"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Get Started

            <ArrowRight size={18} />
          </Link>

        </div>

      </div>
    </header>
  );
}