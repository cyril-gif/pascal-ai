"use client";

import { useState } from "react";
import {
  MessageSquare,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

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
  updated,
  active,
  onClick,
  onRename,
  onDelete,
}: Props) {
  const [menu, setMenu] = useState(false);

  return (
    <div
      className={`group mb-2 rounded-xl transition ${
        active
          ? "bg-blue-600"
          : "hover:bg-slate-900"
      }`}
    >
      <div className="flex items-center">

        <button
          onClick={onClick}
          className="flex flex-1 items-center gap-3 p-3 text-left"
        >
          <MessageSquare
            size={18}
            className="text-slate-300"
          />

          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-white">
              {title}
            </p>

            <p className="text-xs text-slate-400">
              {updated}
            </p>
          </div>
        </button>

        <div className="relative pr-2">

          <button
            onClick={() => setMenu(!menu)}
            className="rounded p-1 opacity-0 transition hover:bg-slate-700 group-hover:opacity-100"
          >
            <MoreHorizontal size={16} />
          </button>

          {menu && (
            <div className="absolute right-0 top-8 z-50 w-40 rounded-xl border border-slate-700 bg-slate-900 shadow-xl">

              <button
                onClick={() => {
                  setMenu(false);
                  onRename(id);
                }}
                className="flex w-full items-center gap-2 px-4 py-3 hover:bg-slate-800"
              >
                <Pencil size={16} />
                Rename
              </button>

              <button
                onClick={() => {
                  setMenu(false);
                  onDelete(id);
                }}
                className="flex w-full items-center gap-2 px-4 py-3 text-red-400 hover:bg-slate-800"
              >
                <Trash2 size={16} />
                Delete
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}