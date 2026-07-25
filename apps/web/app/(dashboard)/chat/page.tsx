"use client";

import Sidebar from "@/components/chat/Sidebar";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatWindow from "@/components/chat/ChatWindow";
import ChatInput from "@/components/chat/ChatInput";
import { useChatStore } from "@/store/chat.store";

export default function ChatPage() {
  const { sidebarOpen, setSidebarOpen } = useChatStore();

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      {/* Dark backdrop on mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar: overlay on mobile, inline push on desktop */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[82vw] max-w-[300px] overflow-hidden transition-transform duration-200 ease-in-out md:static md:z-auto md:max-w-none md:transition-[width] ${
          sidebarOpen
            ? "translate-x-0 md:w-64"
            : "-translate-x-full md:w-0"
        }`}
      >
        <Sidebar />
      </div>

      {/* Main Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <ChatHeader />
        <ChatWindow />
        <ChatInput />
      </div>
    </div>
  );
}