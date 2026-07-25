"use client";

import { useState } from "react";

import {
  Bot,
  User,
  Copy,
  Check,
  RotateCcw,
} from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Message } from "@/store/chat.store";

interface Props {
  message: Message;
  onRegenerate?: () => void;
}

export default function ChatMessage({
  message,
  onRegenerate,
}: Props) {
  const [copied, setCopied] =
    useState(false);

  async function copyMessage() {
    await navigator.clipboard.writeText(
      message.content
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  const isUser =
    message.role === "user";

  return (
    <div
      className={`mb-8 flex gap-4 ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
          <Bot size={20} />
        </div>
      )}

      <div
        className={`max-w-3xl rounded-2xl px-5 py-4 ${
          isUser
            ? "bg-blue-600 text-white"
            : "border border-slate-800 bg-slate-900 text-slate-100"
        }`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code(props) {
              const {
                children,
                className,
                ...rest
              } = props;

              return (
                <code
                  className={`rounded bg-slate-800 px-1 py-0.5 text-blue-300 ${className}`}
                  {...rest}
                >
                  {children}
                </code>
              );
            },

            pre(props) {
              return (
                <pre
                  className="my-4 overflow-x-auto rounded-xl bg-black p-4"
                  {...props}
                />
              );
            },
          }}
        >
          {message.content}
        </ReactMarkdown>

        {!isUser && (
          <div className="mt-4 flex items-center gap-2">

            <button
              onClick={copyMessage}
              className="rounded-lg p-2 transition hover:bg-slate-800"
            >
              {copied ? (
                <Check size={18} />
              ) : (
                <Copy size={18} />
              )}
            </button>

            {onRegenerate && (
              <button
                onClick={onRegenerate}
                className="rounded-lg p-2 transition hover:bg-slate-800"
              >
                <RotateCcw size={18} />
              </button>
            )}

          </div>
        )}
      </div>

      {isUser && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-white">
          <User size={20} />
        </div>
      )}
    </div>
  );
}
