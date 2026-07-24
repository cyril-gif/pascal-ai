"use client";

import {
  Pencil,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";

interface Props {
  onRename: () => void;
  onDelete: () => void;
}

export default function ConversationMenu({
  onRename,
  onDelete,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="rounded p-1 hover:bg-slate-700"
      >
        <MoreHorizontal size={16} />
      </button>

      {open && (
        <div className="absolute right-0 top-8 z-50 w-40 rounded-lg border border-slate-700 bg-slate-900 shadow-xl">

          <button
            onClick={onRename}
            className="flex w-full items-center gap-2 px-4 py-3 hover:bg-slate-800"
          >
            <Pencil size={16} />
            Rename
          </button>

          <button
            onClick={onDelete}
            className="flex w-full items-center gap-2 px-4 py-3 text-red-400 hover:bg-slate-800"
          >
            <Trash2 size={16} />
            Delete
          </button>

        </div>
      )}
    </div>
  );
}