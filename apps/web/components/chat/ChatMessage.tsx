"use client";

import { useState } from "react";

import { Copy, Check, RotateCcw } from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Message } from "@/store/chat.store";

interface Props {
  message: Message;
  onRegenerate?: () => void;
}

export default function ChatMessage({ message, onRegenerate }: Props) {
  const [copied, setCopied] = useState(false);

  async function copyMessage() {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-3">
        <div className="flex justify-end">
          <div className="max-w-[75%] rounded-2xl bg-slate-800 px-4 py-2.5 text-[15px] leading-relaxed text-white">
            {message.content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group mx-auto w-full max-w-3xl px-4 py-3">
      <div className="text-[15px] leading-relaxed text-slate-100">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p(props) {
              return <p className="mb-4 last:mb-0" {...props} />;
            },
            ul(props) {
              return (
                <ul className="mb-4 list-disc space-y-1 pl-5 last:mb-0" {...props} />
              );
            },
            ol(props) {
              return (
                <ol className="mb-4 list-decimal space-y-1 pl-5 last:mb-0" {...props} />
              );
            },
            code(props) {
              const { children, className, ...rest } = props;
              return (
                <code
                  className={`rounded bg-slate-800 px-1.5 py-0.5 text-[13px] text-blue-300 ${className || ""}`}
                  {...rest}
                >
                  {children}
                </code>
              );
            },
            pre(props) {
              return (
                <pre
                  className="my-4 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4 text-[13px]"
                  {...props}
                />
              );
            },
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>

      <div className="mt-2 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={copyMessage}
          className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-800 hover:text-slate-300"
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
        </button>

        {onRegenerate && (
          <button
            onClick={onRegenerate}
            className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-800 hover:text-slate-300"
          >
            <RotateCcw size={15} />
          </button>
        )}
      </div>
    </div>
  );
}
