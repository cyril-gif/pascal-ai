"use client";

import Sidebar from "@/components/chat/Sidebar";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatWindow from "@/components/chat/ChatWindow";
import ChatInput from "@/components/chat/ChatInput";

export default function ChatPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Area */}

      <div className="flex flex-1 flex-col">

        <ChatHeader />

        <ChatWindow />

        <ChatInput />

      </div>

    </div>
  );
}