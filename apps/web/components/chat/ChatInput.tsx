"use client";

import { useState } from "react";
import {
  Send,
  Loader2,
  Paperclip,
  Mic,
} from "lucide-react";

import chatService from "@/services/chat.service";
import { useChatStore } from "@/store/chat.store";

export default function ChatInput() {
  const [message, setMessage] = useState("");

  const {
    activeConversation,
    addConversation,
    setActiveConversation,
    addMessage,
    updateLastAssistantMessage,
    clearMessages,
    setTyping,
  } = useChatStore();

  const [sending, setSending] = useState(false);

 async function handleSend() {
  if (!message.trim() || sending) return;

  try {
    setSending(true);

    let conversation = activeConversation;

    if (!conversation) {
      conversation = await chatService.createConversation(
        "New Chat"
      );

      addConversation(conversation);
      setActiveConversation(conversation);
      clearMessages();
    }

    const prompt = message.trim();

    addMessage({
      _id: Date.now().toString(),
      role: "user",
      content: prompt,
      createdAt: new Date().toISOString(),
    });

    setMessage("");
    setTyping(true);

    const assistantId = crypto.randomUUID();

    addMessage({
      _id: assistantId,
      role: "assistant",
      content: "",
      createdAt: new Date().toISOString(),
    });

    let fullContent = "";

    await chatService.streamMessage(
      conversation._id,
      prompt,
      (chunk) => {
        fullContent += chunk;
        updateLastAssistantMessage(fullContent);
      }
    );
  } catch (err) {
    console.error(err);
  } finally {
    setTyping(false);
    setSending(false);
  }
}

  return (
    <div className="border-t border-slate-800 bg-slate-950 p-4">

      <div className="mx-auto flex max-w-5xl items-end gap-3 rounded-2xl border border-slate-700 bg-slate-900 p-3">

        <button className="rounded-lg p-2 hover:bg-slate-800">
          <Paperclip size={20} />
        </button>

        <textarea
          rows={1}
          value={message}
          placeholder="Message Pascal AI..."
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.shiftKey
            ) {
              e.preventDefault();
              handleSend();
            }
          }}
          className="max-h-40 flex-1 resize-none bg-transparent px-2 py-2 text-white outline-none placeholder:text-slate-500"
        />

        <button className="rounded-lg p-2 hover:bg-slate-800">
          <Mic size={20} />
        </button>

        <button
          onClick={handleSend}
          disabled={sending}
          className="rounded-xl bg-blue-600 p-3 text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {sending ? (
            <Loader2
              size={20}
              className="animate-spin"
            />
          ) : (
            <Send size={20} />
          )}
        </button>

      </div>

      <p className="mt-2 text-center text-xs text-slate-500">
        Pascal AI can make mistakes. Verify important information.
      </p>

    </div>
  );
}