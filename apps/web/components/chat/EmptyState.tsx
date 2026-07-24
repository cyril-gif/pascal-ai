import { Bot } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <Bot size={60} className="text-blue-500 mb-4" />

      <h2 className="text-3xl font-bold text-white">
        Pascal AI
      </h2>

      <p className="mt-3 text-slate-400">
        Start a new conversation.
      </p>
    </div>
  );
}