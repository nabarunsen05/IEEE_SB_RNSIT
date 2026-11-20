
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
  KeyRound,
  LogOut,
} from "lucide-react";
import { useAdmin } from "../context/AdminContext";

export default function Login() {
  const { isAuthenticated, login, logout } = useAdmin();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your admin email and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await login(email.trim(), password);

      if (res?.success) {
        router.replace("/admin");
      } else {
        setError(res?.message || "Invalid credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred during sign in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F3F7FA] px-4 py-24 sm:px-6 lg:px-8">
      {/* Background */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-[#E6F4FB] blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-[#E6F4FB] blur-3xl animate-pulse-glow" />

      <div className="relative w-full max-w-md">
        {isAuthenticated ? (
          <div className="rounded-3xl border border-[#DCE6EF] bg-white p-8 shadow-[0_18px_55px_rgba(16,36,58,0.10)] text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#A8D8EF] bg-[#E6F4FB] text-[#00629B]">
              <ShieldCheck size={36} />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-[#10243A]">
              Already Authenticated
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              You are currently logged in as an administrator with permissions
              to manage website content.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => router.push("/admin")}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00629B] to-[#0077B8] px-5 py-3 font-semibold text-white transition hover:scale-[1.02]"
              >
                <span>Go to Admin Dashboard</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={async () => {
                  await logout();
                  setEmail("");
                  setPassword("");
                }}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#DCE6EF] bg-white px-5 py-3 font-medium text-slate-600 transition hover:bg-[#F1F5F9]"
              >
                <LogOut size={16} />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-[#DCE6EF] bg-white p-8 shadow-[0_18px_55px_rgba(16,36,58,0.10)]">
            {/* Header */}
            <div className="text-center">


              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#10243A]">
                Admin{" "}
                <span className="bg-gradient-to-r from-[#29A9E0] to-cyan-300 bg-clip-text text-transparent">
                  Login
                </span>
              </h1>

              <p className="mt-2 text-xs text-slate-600 sm:text-sm">
                Sign in to manage upcoming events, committee members, and
                domains.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-6 flex items-center gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-sm text-rose-700">
                <AlertCircle size={18} className="shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Email */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Admin Email
                </label>

                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                    <User size={18} />
                  </div>

                  <input
                    type="email"
                    autoComplete="username"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter authorized admin email"
                    className="w-full rounded-xl border border-[#DCE6EF] bg-white py-3 pl-10 pr-4 text-sm text-[#10243A] placeholder-slate-400 transition focus:border-[#29A9E0] focus:bg-[#F3F7FA]/80 focus:outline-none focus:ring-2 focus:ring-[#29A9E0]/20"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Password
                </label>

                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                    <Lock size={18} />
                  </div>

                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
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
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00629B] to-[#0077B8] px-5 py-3 font-semibold text-white shadow-lg shadow-[#00629B]/30 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
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
