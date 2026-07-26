import { WifiOff } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800">
        <WifiOff size={28} className="text-slate-400" />
      </div>

      <h1 className="mb-2 text-xl font-semibold text-white">
        You're offline
      </h1>

      <p className="max-w-sm text-sm text-slate-400">
        Pascal AI needs an internet connection to respond. Check your network
        and try again — your previous conversations are safe.
      </p>
    </div>
  );
}