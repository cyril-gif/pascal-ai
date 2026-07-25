"use client";

import { useEffect, useRef } from "react";

import { useChatStore } from "@/store/chat.store";
import ChatMessage from "./ChatMessage";

export default function ChatWindow() {
  const {
    messages,
    typing,
  } = useChatStore();

  const bottomRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center bg-slate-950">

        <div className="text-center">

          <h1 className="mb-2 text-4xl font-bold text-white">
            Pascal AI
          </h1>

          <p className="text-slate-400">
            How can I help you today?
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950">

      <div className="mx-auto flex w-full max-w-4xl flex-col px-6 py-8">

        {messages.map((message) => (
          <ChatMessage
            key={message._id}
            message={message}
          />
        ))}

        {typing && (
          <div className="flex items-center gap-3 py-6">

            <div className="h-8 w-8 rounded-full bg-blue-600" />

            <div className="flex gap-1">

              <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />

              <span
                className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                style={{
                  animationDelay: "0.15s",
                }}
              />

              <span
                className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                style={{
                  animationDelay: "0.3s",
                }}
              />

            </div>

          </div>
        )}

        <div ref={bottomRef} />

      </div>

    </div>
  );
}