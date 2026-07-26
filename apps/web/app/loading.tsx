export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950">
      <div className="mb-4 h-14 w-14 animate-pulse rounded-2xl bg-gradient-to-br from-blue-400 to-blue-700" />
      <p className="text-sm text-slate-500">Loading Pascal AI…</p>
    </div>
  );
}