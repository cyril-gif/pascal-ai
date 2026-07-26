"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  PenSquare,
  Search,
  Settings,
  LogOut,
  Sparkles,
  PanelLeftClose,
  ImageIcon,
} from "lucide-react";

import ConversationItem from "./ConversationItem";

import chatService from "@/services/chat.service";
import { useChatStore } from "@/store/chat.store";

export default function Sidebar() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; max-age=0";
    router.push("/login");
  }

  const {
    conversations,
    activeConversation,
    loading,

    setConversations,
    setActiveConversation,
    setMessages,

    addConversation,
    updateConversation,
    removeConversation,

    clearMessages,
    setLoading,
    setSidebarOpen,
  } = useChatStore();

  useEffect(() => {
    fetchConversations();
  }, []);

  async function fetchConversations() {
    try {
      setLoading(true);
      const conversations = await chatService.getConversations();
      setConversations(conversations);

      if (conversations.length > 0 && !activeConversation) {
        openConversation(conversations[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function openConversation(conversation: any) {
    try {
      setLoading(true);
      setActiveConversation(conversation);

      const messages = await chatService.getMessages(conversation._id);
      setMessages(messages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createConversation() {
    try {
      const conversation = await chatService.createConversation("New Chat");
      addConversation(conversation);
      setActiveConversation(conversation);
      clearMessages();
    } catch (err) {
      console.error(err);
    }
  }

  async function renameConversation(id: string) {
    const title = prompt("Rename conversation");
    if (!title) return;

    try {
      const updated = await chatService.renameConversation(id, title);
      updateConversation(updated);
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteConversation(id: string) {
    const ok = confirm("Delete this conversation?");
    if (!ok) return;

    try {
      await chatService.deleteConversation(id);
      removeConversation(id);
    } catch (err) {
      console.error(err);
    }
  }

  const filtered = useMemo(() => {
    return (conversations ?? []).filter((c) =>
      c.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [conversations, search]);

  return (
    <aside className="flex h-full w-full flex-col bg-[#171717]">
      {/* Header: close sidebar + new chat */}
      <div className="flex items-center justify-between px-3 pb-2 pt-4">
        <button
          onClick={() => setSidebarOpen(false)}
          title="Close sidebar"
          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white"
        >
          <PanelLeftClose size={18} />
        </button>

        <button
          onClick={createConversation}
          title="New chat"
          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white"
        >
          <PenSquare size={17} />
        </button>
      </div>

      {/* Search */}
      <div className="px-3 pb-3">
        <div className="flex items-center gap-2 rounded-lg bg-slate-900/60 px-3 py-1.5">
          <Search size={14} className="shrink-0 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search chats"
            className="w-full bg-transparent py-1 text-[13px] text-slate-200 outline-none placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto px-2">
        {loading ? (
          <div className="mt-8 text-center text-xs text-slate-500">
            Loading...
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-8 text-center text-xs text-slate-500">
            No conversations yet
          </div>
        ) : (
          <div className="space-y-0.5">
            {filtered.map((conversation) => (
              <ConversationItem
                key={conversation._id}
                id={conversation._id}
                title={conversation.title}
                updated={
                  conversation.updatedAt
                    ? new Date(conversation.updatedAt).toLocaleString()
                    : ""
                }
                active={activeConversation?._id === conversation._id}
                onClick={() => openConversation(conversation)}
                onRename={renameConversation}
                onDelete={deleteConversation}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="space-y-0.5 border-t border-slate-800/70 p-2">
        <Link
          href="/images"
          className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] text-slate-300 transition hover:bg-slate-800"
        >
          <ImageIcon size={15} />
          AI Images
        </Link>

        <button
          onClick={() => router.push("/settings/billing")}
          className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] text-slate-300 transition hover:bg-slate-800"
        >
          <Sparkles size={15} />
          Upgrade plan
        </button>

        <button
          onClick={() => router.push("/settings")}
          className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] text-slate-300 transition hover:bg-slate-800"
        >
          <Settings size={15} />
          Settings
        </button>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] text-red-400 transition hover:bg-red-500/10"
        >
          <LogOut size={15} />
          Log out
        </button>
      </div>
    </aside>
  );
}