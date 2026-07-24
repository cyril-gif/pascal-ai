export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-10">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">

        <p className="text-slate-500">
          © {new Date().getFullYear()} Pascal AI.
          All rights reserved.
        </p>

        <div className="flex gap-6 text-slate-400">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Support</a>
        </div>

      </div>

    </footer>
  );
}