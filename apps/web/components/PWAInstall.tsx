"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

export default function PWAInstall() {
  const [prompt, setPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setPrompt(e);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handler
    );

    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handler
      );
  }, []);

  async function install() {
    if (!prompt) return;

    prompt.prompt();

    await prompt.userChoice;

    setPrompt(null);
  }

  if (!prompt) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-50 w-[95%] max-w-md -translate-x-1/2 rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl">

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-lg font-bold text-white">
            Install Pascal AI
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Install Pascal AI for a faster,
            app-like experience.
          </p>

        </div>

        <button
          onClick={() => setPrompt(null)}
          className="text-slate-400"
        >
          <X size={20} />
        </button>

      </div>

      <button
        onClick={install}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
      >
        <Download size={18} />
        Install App
      </button>

    </div>
  );
}