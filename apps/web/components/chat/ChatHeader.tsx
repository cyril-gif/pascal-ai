"use client";

import { Menu, SquarePen } from "lucide-react";
import { useChatStore } from "@/store/chat.store";
import chatService from "@/services/chat.service";

export default function ChatHeader() {
  const {
    activeConversation,
    sidebarOpen,
    setSidebarOpen,
    addConversation,
    setActiveConversation,
    clearMessages,
  } = useChatStore();

  async function createConversation() {
    try {
      const conversation = await chatService.createConversation("New Chat");
      addConversation(conversation);
      setActiveConversation(conversation);
      clearMessages();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <header className="flex h-14 items-center justify-between border-b border-slate-800 bg-slate-950 px-4">
      <div className="flex items-center gap-2">
        {!sidebarOpen && (
          <>
            <button
              onClick={() => setSidebarOpen(true)}
              title="Open sidebar"
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              <Menu size={19} />
            </button>

            <button
              onClick={createConversation}
              title="New chat"
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              <SquarePen size={19} />
            </button>
          </>
        )}

        <h1 className="ml-1 text-sm font-medium text-slate-200">
          {activeConversation?.title || "New Chat"}
        </h1>
      </div>
    </header>
  );
}