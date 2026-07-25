"use client";

import { useEffect, useRef, useState } from "react";
import {
  Send,
  Loader2,
  Square,
  Paperclip,
  Mic,
  Clock,
  X,
  FileText,
} from "lucide-react";

import chatService from "@/services/chat.service";
import { useChatStore } from "@/store/chat.store";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [rateLimitedUntil, setRateLimitedUntil] = useState<Date | null>(null);
  const [countdown, setCountdown] = useState("");

  const abortRef = useRef<AbortController | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    activeConversation,
    addConversation,
    setActiveConversation,
    addMessage,
    updateLastAssistantMessage,
    setTyping,
    typing,
  } = useChatStore();

  // Live countdown while rate-limited
  useEffect(() => {
    if (!rateLimitedUntil) return;

    const interval = setInterval(() => {
      const diff = rateLimitedUntil.getTime() - Date.now();

      if (diff <= 0) {
        setRateLimitedUntil(null);
        setCountdown("");
        clearInterval(interval);
        return;
      }

      const mins = Math.floor(diff / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setCountdown(`${mins}:${secs.toString().padStart(2, "0")}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [rateLimitedUntil]);

  function handleFilePick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    if (file.type.startsWith("image/")) {
      setFilePreviewUrl(URL.createObjectURL(file));
    } else {
      setFilePreviewUrl(null);
    }
  }

  function clearFile() {
    setSelectedFile(null);
    if (filePreviewUrl) URL.revokeObjectURL(filePreviewUrl);
    setFilePreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSend() {
    if ((!message.trim() && !selectedFile) || typing || rateLimitedUntil)
      return;

    let conversation = activeConversation;

    try {
      if (!conversation) {
        const newConversation = await chatService.createConversation(
          "New Chat"
        );

        addConversation(newConversation);
        setActiveConversation(newConversation);

        conversation = newConversation;
      }

      if (!conversation) {
        throw new Error("Failed to create or find conversation");
      }

      const prompt = message.trim();
      const fileToSend = selectedFile;

      setMessage("");
      clearFile();

      addMessage({
        _id: crypto.randomUUID(),
        role: "user",
        content: prompt,
        createdAt: new Date().toISOString(),
      });

      addMessage({
        _id: crypto.randomUUID(),
        role: "assistant",
        content: "",
        createdAt: new Date().toISOString(),
      });

      setTyping(true);

      abortRef.current = new AbortController();

      await chatService.streamMessage(
        conversation._id,
        prompt,
        (fullTextSoFar) => {
          updateLastAssistantMessage(fullTextSoFar);
        },
        abortRef.current.signal,
        fileToSend
      );
    } catch (err: any) {
      if (err.code === "RATE_LIMIT") {
        setRateLimitedUntil(new Date(err.resetAt));
        updateLastAssistantMessage(
          "⏳ You've reached the message limit for now. See the notice below."
        );
      } else if (err.name !== "AbortError") {
        console.error(err);
        updateLastAssistantMessage("⚠️ Something went wrong.");
      }
    } finally {
      setTyping(false);
    }
  }

  function stopGeneration() {
    abortRef.current?.abort();
    setTyping(false);
  }

  const resetTimeLabel = rateLimitedUntil
    ? rateLimitedUntil.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="border-t border-slate-800 bg-slate-950 p-4">
      {rateLimitedUntil && (
        <div className="mx-auto mb-3 flex max-w-4xl items-center justify-between gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3">
          <div className="flex items-center gap-3">
            <Clock size={18} className="shrink-0 text-amber-400" />
            <div>
              <p className="text-sm font-medium text-amber-200">
                Chats with attachments paused
              </p>
              <p className="text-xs text-amber-300/70">
                You've used all your messages until {resetTimeLabel}
                {countdown && ` (${countdown} remaining)`}.
              </p>
            </div>
          </div>
          <button
            className="whitespace-nowrap rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-medium text-slate-950 hover:bg-amber-400"
            onClick={() => {
              window.location.href = "/settings/billing";
            }}
          >
            Upgrade
          </button>
        </div>
      )}

      {selectedFile && (
        <div className="mx-auto mb-2 flex max-w-4xl items-center gap-3 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2">
          {filePreviewUrl ? (
            <img
              src={filePreviewUrl}
              alt={selectedFile.name}
              className="h-10 w-10 rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
              <FileText size={18} className="text-slate-400" />
            </div>
          )}
          <span className="flex-1 truncate text-sm text-slate-300">
            {selectedFile.name}
          </span>
          <button
            onClick={clearFile}
            className="rounded-lg p-1 hover:bg-slate-800"
          >
            <X size={16} className="text-slate-400" />
          </button>
        </div>
      )}

      <div className="mx-auto flex max-w-4xl items-end gap-3 rounded-2xl border border-slate-700 bg-slate-900 p-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf,.docx,.txt"
          className="hidden"
          onChange={handleFilePick}
          disabled={!!rateLimitedUntil}
        />

        <button
          className="rounded-lg p-2 hover:bg-slate-800 disabled:opacity-40"
          disabled={!!rateLimitedUntil}
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip size={18} />
        </button>

        <textarea
          rows={1}
          value={message}
          placeholder={
            rateLimitedUntil
              ? "Message limit reached — please wait"
              : "Message Pascal AI..."
          }
          disabled={!!rateLimitedUntil}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          className="max-h-40 flex-1 resize-none bg-transparent px-2 py-2 text-white outline-none disabled:opacity-50"
        />

        <button
          className="rounded-lg p-2 hover:bg-slate-800 disabled:opacity-40"
          disabled={!!rateLimitedUntil}
        >
          <Mic size={18} />
        </button>

        {typing ? (
          <button
            onClick={stopGeneration}
            className="rounded-xl bg-red-600 p-3 text-white hover:bg-red-700"
          >
            <Square size={18} />
          </button>
        ) : (
          <button
            onClick={handleSend}
            disabled={(!message.trim() && !selectedFile) || !!rateLimitedUntil}
            className="rounded-xl bg-blue-600 p-3 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        )}
      </div>

      <p className="mt-2 text-center text-xs text-slate-500">
        Pascal AI can make mistakes. Verify important information.
      </p>
    </div>
  );
}