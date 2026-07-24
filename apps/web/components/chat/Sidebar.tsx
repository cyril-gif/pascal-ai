"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bot,
  Plus,
  Search,
  Settings,
  LogOut,
  Crown,
} from "lucide-react";

import ConversationItem from "./ConversationItem";

import chatService from "@/services/chat.service";
import { useChatStore } from "@/store/chat.store";

export default function Sidebar() {
  const [search, setSearch] = useState("");

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
  } = useChatStore();

  useEffect(() => {
    fetchConversations();
  }, []);

  async function fetchConversations() {
    try {
      setLoading(true);

      const conversations = await chatService.getConversations();

console.log(
  "Sidebar conversations:",
  conversations
);

setConversations(conversations);

      if (
        conversations.length > 0 &&
        !activeConversation
      ) {
        openConversation(conversations[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function openConversation(
    conversation: any
  ) {
    try {
      setLoading(true);

      setActiveConversation(conversation);

      const messages =
        await chatService.getMessages(
          conversation._id
        );

      setMessages(messages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createConversation() {
    try {
      const conversation =
        await chatService.createConversation(
          "New Chat"
        );

      addConversation(conversation);

      setActiveConversation(conversation);

      clearMessages();
    } catch (err) {
      console.error(err);
    }
  }

  async function renameConversation(
    id: string
  ) {
    const title = prompt(
      "Rename conversation"
    );

    if (!title) return;

    try {
      const updated =
        await chatService.renameConversation(
          id,
          title
        );

      updateConversation(updated);
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteConversation(
    id: string
  ) {
    const ok = confirm(
      "Delete this conversation?"
    );

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
      c.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [conversations, search]);

  return (
    <aside className="flex h-screen w-80 flex-col border-r border-slate-800 bg-slate-950">

      {/* Logo */}

      <div className="border-b border-slate-800 p-5">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-blue-600 p-2">
            <Bot className="text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              Pascal AI
            </h1>

            <p className="text-xs text-slate-400">
              AI Assistant
            </p>
          </div>

        </div>

      </div>

      {/* New Chat */}

      <div className="p-4">

        <button
          onClick={createConversation}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />

          New Chat
        </button>

      </div>

      {/* Search */}

      <div className="px-4 pb-4">

        <div className="flex items-center rounded-xl border border-slate-700 bg-slate-900 px-3">

          <Search
            size={18}
            className="text-slate-500"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search chats..."
            className="w-full bg-transparent px-3 py-3 text-white outline-none placeholder:text-slate-500"
          />

        </div>

      </div>

      {/* Conversations */}

      <div className="flex-1 overflow-y-auto px-3">

        {loading ? (

          <div className="mt-10 text-center text-slate-500">
            Loading...
          </div>

        ) : filtered.length === 0 ? (

          <div className="mt-10 text-center text-slate-500">
            No conversations yet
          </div>

        ) : (

          filtered.map((conversation) => (

            <ConversationItem
              key={conversation._id}
              id={conversation._id}
              title={conversation.title}
              updated={
                conversation.updatedAt
                  ? new Date(
                      conversation.updatedAt
                    ).toLocaleString()
                  : ""
              }
              active={
                activeConversation?._id ===
                conversation._id
              }
              onClick={() =>
                openConversation(conversation)
              }
              onRename={
                renameConversation
              }
              onDelete={
                deleteConversation
              }
            />

          ))

        )}

      </div>

      {/* Footer */}

      <div className="border-t border-slate-800 p-4">

        <button className="mb-2 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-900">
          <Crown size={18} />
          Upgrade
        </button>

        <button className="mb-2 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-900">
          <Settings size={18} />
          Settings
        </button>

        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-400 transition hover:bg-red-500/10">
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </aside>
  );
}