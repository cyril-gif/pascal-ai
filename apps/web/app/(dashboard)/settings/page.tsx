"use client";

import { useState } from "react";
import {
  User,
  CreditCard,
  Trash2,
  LogOut,
  Save,
  ChevronRight,
} from "lucide-react";

type SettingsTab = "profile" | "billing" | "danger";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSaveProfile() {
    setSaving(true);
    setSaved(false);

    try {
      // Replace with your actual profile update endpoint
      // await api.patch("/user/profile", { name, email });
      await new Promise((r) => setTimeout(r, 600)); // placeholder delay
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Failed to save profile:", err);
    } finally {
      setSaving(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  function handleDeleteAllChats() {
    const confirmed = window.confirm(
      "This will permanently delete all your conversations. This cannot be undone. Continue?"
    );
    if (!confirmed) return;

    // Replace with your actual bulk-delete endpoint
    console.log("Deleting all conversations...");
  }

  const tabs: { id: SettingsTab; label: string; icon: any }[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "danger", label: "Danger Zone", icon: Trash2 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="mb-8 text-2xl font-semibold">Settings</h1>

        <div className="flex gap-8">
          {/* Sidebar tabs */}
          <div className="w-56 shrink-0 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    isActive
                      ? "bg-slate-800 text-white"
                      : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}

            <div className="pt-4">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-red-400 hover:bg-red-500/10"
              >
                <LogOut size={16} />
                Log out
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium">Profile</h2>

                <div>
                  <label className="mb-1.5 block text-sm text-slate-400">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm text-slate-400">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  <Save size={16} />
                  {saving ? "Saving..." : saved ? "Saved!" : "Save changes"}
                </button>
              </div>
            )}

            {activeTab === "billing" && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium">Billing</h2>

                <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">
                        Free Plan
                      </p>
                      <p className="text-xs text-slate-400">
                        Limited daily messages, file uploads paused during
                        peak usage
                      </p>
                    </div>
                    <button className="flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-medium text-slate-950 hover:bg-amber-400">
                      Upgrade
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-slate-400">
                  Upgrading gives you higher daily message limits, priority
                  access during high traffic, and uninterrupted file/image
                  uploads.
                </p>
              </div>
            )}

            {activeTab === "danger" && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-red-400">
                  Danger Zone
                </h2>

                <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
                  <p className="mb-1 text-sm font-medium text-white">
                    Delete all conversations
                  </p>
                  <p className="mb-3 text-xs text-slate-400">
                    This permanently deletes every chat you've had with
                    Pascal AI. This cannot be undone.
                  </p>
                  <button
                    onClick={handleDeleteAllChats}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                  >
                    Delete all chats
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}