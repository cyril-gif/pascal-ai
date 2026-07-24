"use client";

import { Bot } from "lucide-react";
import { useChatStore } from "@/store/chat.store";

export default function ChatHeader() {
  const { activeConversation } = useChatStore();

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-6">
      <div className="flex items-center gap-3">
        <Bot className="text-blue-500" />

        <div>
          <h1 className="text-lg font-semibold text-white">
            {activeConversation?.title || "New Chat"}
          </h1>

          <p className="text-sm text-slate-400">
            Pascal AI
          </p>
        </div>
      </div>
    </header>
  );
}