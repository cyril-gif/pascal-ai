"use client";

import {
  User,
  Mail,
  Calendar,
  Shield,
  Crown,
  CreditCard,
  Edit,
} from "lucide-react";

export default function ProfilePage() {
  const user = {
    name: "Pascal Lantam",
    email: "pascal@example.com",
    plan: "Free",
    joined: "July 2026",
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="mx-auto max-w-6xl p-8">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold">
              My Profile
            </h1>

            <p className="mt-2 text-slate-400">
              Manage your Pascal AI account.
            </p>

          </div>

          <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 transition hover:bg-blue-700">
            <Edit size={18} />
            Edit Profile
          </button>

        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Left */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

            <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-full bg-blue-600 text-5xl font-bold">

              P

            </div>

            <h2 className="text-center text-2xl font-bold">
              {user.name}
            </h2>

            <p className="mt-2 text-center text-slate-400">
              {user.email}
            </p>

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3">

                <User className="text-blue-400" />

                <span>{user.name}</span>

              </div>

              <div className="flex items-center gap-3">

                <Mail className="text-blue-400" />

                <span>{user.email}</span>

              </div>

              <div className="flex items-center gap-3">

                <Calendar className="text-blue-400" />

                <span>Joined {user.joined}</span>

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="space-y-6 lg:col-span-2">

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h3 className="mb-6 text-xl font-semibold">
                Account
              </h3>

              <div className="space-y-5">

                <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">

                  <div className="flex items-center gap-3">

                    <Shield className="text-green-400" />

                    <div>

                      <h4 className="font-semibold">
                        Account Status
                      </h4>

                      <p className="text-sm text-slate-400">
                        Verified
                      </p>

                    </div>

                  </div>

                  <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400">
                    Active
                  </span>

                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">

                  <div className="flex items-center gap-3">

                    <Crown className="text-yellow-400" />

                    <div>

                      <h4 className="font-semibold">
                        Current Plan
                      </h4>

                      <p className="text-sm text-slate-400">
                        {user.plan}
                      </p>

                    </div>

                  </div>

                  <button className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700">
                    Upgrade
                  </button>

                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">

                  <div className="flex items-center gap-3">

                    <CreditCard className="text-purple-400" />

                    <div>

                      <h4 className="font-semibold">
                        Billing
                      </h4>

                      <p className="text-sm text-slate-400">
                        No payment method
                      </p>

                    </div>

                  </div>

                  <button className="rounded-lg border border-slate-700 px-4 py-2 hover:bg-slate-700">
                    Manage
                  </button>

                </div>

              </div>

            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h3 className="mb-6 text-xl font-semibold">
                Usage Statistics
              </h3>

              <div className="grid gap-4 md:grid-cols-3">

                <div className="rounded-xl bg-slate-800 p-5">

                  <h4 className="text-sm text-slate-400">
                    Conversations
                  </h4>

                  <p className="mt-2 text-3xl font-bold">
                    0
                  </p>

                </div>

                <div className="rounded-xl bg-slate-800 p-5">

                  <h4 className="text-sm text-slate-400">
                    Messages
                  </h4>

                  <p className="mt-2 text-3xl font-bold">
                    0
                  </p>

                </div>

                <div className="rounded-xl bg-slate-800 p-5">

                  <h4 className="text-sm text-slate-400">
                    AI Model
                  </h4>

                  <p className="mt-2 text-lg font-bold">
                    GPT-4.1 Mini
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}