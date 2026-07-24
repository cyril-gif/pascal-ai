export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 py-4">

      <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500"></div>

      <div
        className="h-2 w-2 animate-bounce rounded-full bg-blue-500"
        style={{ animationDelay: "0.2s" }}
      ></div>

      <div
        className="h-2 w-2 animate-bounce rounded-full bg-blue-500"
        style={{ animationDelay: "0.4s" }}
      ></div>

      <span className="ml-2 text-sm text-slate-400">
        Pascal AI is thinking...
      </span>

    </div>
  );
}