"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquare, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

interface Props {
  id: string;
  title: string;
  updated?: string;
  active?: boolean;
  onClick: () => void;
  onRename: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ConversationItem({
  id,
  title,
  active,
  onClick,
  onRename,
  onDelete,
}: Props) {
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`group relative rounded-lg transition ${
        active ? "bg-slate-800" : "hover:bg-slate-800/60"
      }`}
    >
      <div className="flex items-center">
        <button
          onClick={onClick}
          className="flex flex-1 items-center gap-2 overflow-hidden px-2.5 py-2 text-left"
        >
          <MessageSquare size={14} className="shrink-0 text-slate-500" />
          <p className="truncate text-[13px] text-slate-200">{title}</p>
        </button>

        <div className="relative pr-1.5" ref={menuRef}>
          <button
            onClick={() => setMenu(!menu)}
            className="rounded p-1 text-slate-500 opacity-0 transition hover:bg-slate-700 hover:text-slate-200 group-hover:opacity-100"
          >
            <MoreHorizontal size={15} />
          </button>

          {menu && (
            <div className="absolute right-0 top-7 z-50 w-36 overflow-hidden rounded-lg border border-slate-700 bg-slate-900 shadow-xl">
              <button
                onClick={() => {
                  setMenu(false);
                  onRename(id);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-[13px] text-slate-200 hover:bg-slate-800"
              >
                <Pencil size={14} />
                Rename
              </button>

              <button
                onClick={() => {
                  setMenu(false);
                  onDelete(id);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-[13px] text-red-400 hover:bg-slate-800"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}