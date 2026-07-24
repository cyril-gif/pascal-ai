"use client";

import { useEffect, useRef } from "react";

import ChatMessage from "./ChatMessage";
import EmptyState from "./EmptyState";
import TypingIndicator from "./TypingIndicator";

import { useChatStore } from "@/store/chat.store";

export default function ChatWindow() {
  const {
    messages,
    typing,
    loading,
  } = useChatStore();

  const bottomRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  if (loading) {
    return (
      <main className="flex flex-1 items-center justify-center bg-slate-950">
        <p className="text-slate-400">
          Loading conversation...
        </p>
      </main>
    );
  }

  if (messages.length === 0) {
    return (
      <main className="flex flex-1 bg-slate-950">
        <EmptyState />
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto bg-slate-950">

      <div className="mx-auto flex w-full max-w-5xl flex-col px-6 py-8">

        {messages.map((message) => (
          <ChatMessage
            key={message._id}
            role={message.role}
            content={message.content}
            timestamp={new Date(
              message.createdAt
            ).toLocaleTimeString()}
          />
        ))}

        {typing && <TypingIndicator />}

        <div ref={bottomRef} />

      </div>

    </main>
  );
}