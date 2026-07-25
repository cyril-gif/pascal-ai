"use client";

import Sidebar from "@/components/chat/Sidebar";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatWindow from "@/components/chat/ChatWindow";
import ChatInput from "@/components/chat/ChatInput";
import { useChatStore } from "@/store/chat.store";

export default function ChatPage() {
  const sidebarOpen = useChatStore((s) => s.sidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          sidebarOpen ? "w-64" : "w-0"
        }`}
      >
        <Sidebar />
      </div>

      <div className="flex flex-1 flex-col">
        <ChatHeader />
        <ChatWindow />
        <ChatInput />
      </div>
    </div>
  );
}