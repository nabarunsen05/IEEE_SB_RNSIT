"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldAlert, LogOut, ArrowLeft } from "lucide-react";
import { useAdmin } from "../context/AdminContext";

export default function AccessDenied({ email, isInactive = false }) {
  const { logout } = useAdmin();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await logout();
      window.location.replace("/admin");
    } catch (err) {
      console.error("Sign out error:", err);
      setIsSigningOut(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F3F7FA] px-4 py-24 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-rose-50 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-sky-50 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="rounded-3xl border border-[#DCE6EF] bg-white p-8 shadow-[0_18px_55px_rgba(16,36,58,0.10)] text-center">
          {/* Badge Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 text-rose-600 shadow-sm">
            <ShieldAlert size={34} />
          </div>

          <h1 className="mt-5 text-2xl font-bold tracking-tight text-[#10243A]">
            Access Denied
          </h1>

          <div className="mt-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 text-xs text-slate-600">
            <p className="font-medium text-slate-500 uppercase tracking-wider text-[10px]">
              Authenticated Account
            </p>
            <p className="mt-1 font-semibold text-[#10243A] truncate">
              {email || "Google Account"}
            </p>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            {isInactive
              ? "Your administrator account has been deactivated. Please contact an IEEE Student Branch Super Admin to reactivate your access."
              : "This Google account is not on the approved administrator allowlist. Access to the IEEE Student Branch RNSIT Dashboard is restricted."}
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-5 py-3 text-sm font-semibold text-rose-700 shadow-sm transition hover:bg-rose-100 active:scale-[0.98] disabled:opacity-60"
            >
              {isSigningOut ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-rose-600 border-t-transparent" />
                  <span>Signing out...</span>
                </>
              ) : (
                <>
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </>
              )}
            </button>

            <Link
              href="/"
              className="flex items-center justify-center gap-2 rounded-xl border border-[#DCE6EF] bg-white px-5 py-3 text-sm font-medium text-slate-600 transition hover:bg-[#F1F5F9] hover:text-[#00629B]"
            >
              <ArrowLeft size={16} />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
