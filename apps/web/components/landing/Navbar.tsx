"use client";

import Link from "next/link";
import { Bot, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="rounded-xl bg-blue-600 p-2">
            <Bot className="h-6 w-6 text-white" />
          </div>

          <span className="text-2xl font-bold text-white">
            Pascal AI
          </span>
        </Link>

        {/* Desktop */}

        <nav className="hidden items-center gap-10 md:flex">

          <Link
            href="#features"
            className="text-slate-300 transition hover:text-white"
          >
            Features
          </Link>

          <Link
            href="#pricing"
            className="text-slate-300 transition hover:text-white"
          >
            Pricing
          </Link>

          <Link
            href="#faq"
            className="text-slate-300 transition hover:text-white"
          >
            FAQ
          </Link>

          <Link
            href="/login"
            className="text-slate-300 transition hover:text-white"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Get Started
          </Link>

        </nav>

        {/* Mobile */}

        <button
          onClick={() => setOpen(!open)}
          className="text-white md:hidden"
        >
          <Menu />
        </button>

      </div>

      {open && (
        <div className="border-t border-white/10 bg-slate-950 md:hidden">

          <div className="space-y-5 p-6">

            <Link
              href="#features"
              className="block text-slate-300"
            >
              Features
            </Link>

            <Link
              href="#pricing"
              className="block text-slate-300"
            >
              Pricing
            </Link>

            <Link
              href="#faq"
              className="block text-slate-300"
            >
              FAQ
            </Link>

            <Link
              href="/login"
              className="block text-slate-300"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="block rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold text-white"
            >
              Get Started
            </Link>

          </div>

        </div>
      )}
    </header>
  );
}