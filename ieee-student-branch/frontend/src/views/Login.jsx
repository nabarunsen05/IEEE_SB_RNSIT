"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Sparkles,
  KeyRound,
  LogOut,
} from "lucide-react";
import { useAdmin } from "../context/AdminContext";

export default function Login() {
  const { isAuthenticated, login, logout, adminCredentials } = useAdmin();
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!userId.trim() || !password.trim()) {
      setError("Please fill in both User ID and Password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await login(userId, password);
      setIsSubmitting(false);

      if (res.success) {
        router.replace("/admin");
      } else {
        setError(res.message || "Invalid credentials.");
      }
    } catch {
      setIsSubmitting(false);
      setError("An unexpected error occurred during sign in.");
    }
  };

  const handleUseDemoCredentials = () => {
    setUserId(adminCredentials.userId);
    setPassword(adminCredentials.password);
    setError("");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F3F7FA] px-4 py-24 sm:px-6 lg:px-8">
      {/* Background Glowing Orbs */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-[#E6F4FB] blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-[#E6F4FB] blur-3xl animate-pulse-glow" />

      <div className="relative w-full max-w-md">
        {/* If Already Logged In */}
        {isAuthenticated ? (
          <div className="rounded-3xl border border-[#DCE6EF] bg-white p-8 backdrop-blur-2xl shadow-[0_18px_55px_rgba(16,36,58,0.10)] text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#A8D8EF] bg-[#E6F4FB] text-[#00629B] shadow-[0_0_25px_rgba(41,169,224,0.3)]">
              <ShieldCheck size={36} />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-[#10243A]">
              Already Authenticated
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              You are currently logged in as the Administrator with full permissions to manage events and executive committee members.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => router.push("/admin")}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00629B] to-[#0077B8] px-5 py-3 font-semibold text-white shadow-lg shadow-[#00629B]/30 transition hover:shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Go to Admin Dashboard</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => logout()}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#DCE6EF] bg-white px-5 py-3 font-medium text-slate-600 transition hover:bg-[#F1F5F9] hover:text-[#10243A]"
              >
                <LogOut size={16} />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        ) : (
          /* Login Form */
          <div className="rounded-3xl border border-[#DCE6EF] bg-white p-8 backdrop-blur-2xl shadow-[0_18px_55px_rgba(16,36,58,0.10)]">
            {/* Header */}
            <div className="text-center">
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#B8DCEC] bg-[#E6F4FB] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#00629B] backdrop-blur-md">
                <Sparkles size={13} />
                <span>Executive Control Portal</span>
              </div>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#10243A]">
                Admin <span className="bg-gradient-to-r from-[#29A9E0] to-cyan-300 bg-clip-text text-transparent">Login</span>
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-slate-600">
                Sign in to manage upcoming events, committee members, and domains.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-6 flex items-center gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-sm text-rose-700 backdrop-blur-md">
                <AlertCircle size={18} className="shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* User ID */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  User ID
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter admin user ID"
                    className="w-full rounded-xl border border-[#DCE6EF] bg-white py-3 pl-10 pr-4 text-sm text-[#10243A] placeholder-slate-400 transition focus:border-[#29A9E0] focus:bg-[#F3F7FA]/80 focus:outline-none focus:ring-2 focus:ring-[#29A9E0]/20"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full rounded-xl border border-[#DCE6EF] bg-white py-3 pl-10 pr-10 text-sm text-[#10243A] placeholder-slate-400 transition focus:border-[#29A9E0] focus:bg-[#F3F7FA]/80 focus:outline-none focus:ring-2 focus:ring-[#29A9E0]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-500 hover:text-[#10243A]"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00629B] to-[#0077B8] px-5 py-3 font-semibold text-white shadow-lg shadow-[#00629B]/30 transition-all duration-200 hover:shadow-cyan-500/25 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Verifying...</span>
                  </span>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Credentials Box */}
            <div className="mt-6 rounded-2xl border border-[#29A9E0]/20 bg-[#F0F8FC] p-3.5 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-semibold text-[#00629B]">
                  <KeyRound size={14} />
                  <span>Admin Credentials:</span>
                </span>
                <button
                  type="button"
                  onClick={handleUseDemoCredentials}
                  className="rounded-lg bg-[#E6F4FB] px-2 py-1 text-[11px] font-semibold text-[#00629B] transition hover:bg-[#29A9E0]/30"
                >
                  Auto-fill
                </button>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-600">
                <div className="rounded-md bg-white p-1.5 border border-[#E6EDF3]">
                  <span className="text-slate-500">User: </span>
                  <span className="text-[#10243A] font-bold">{adminCredentials.userId}</span>
                </div>
                <div className="rounded-md bg-white p-1.5 border border-[#E6EDF3]">
                  <span className="text-slate-500">Pass: </span>
                  <span className="text-[#10243A] font-bold">{adminCredentials.password}</span>
                </div>
              </div>
            </div>

            {/* Return Link */}
            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-xs text-slate-500 transition hover:text-[#00629B]"
              >
                ← Return to Public Website
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}