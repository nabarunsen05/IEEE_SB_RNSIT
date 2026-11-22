"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, LogOut, ArrowLeft, ShieldAlert } from "lucide-react";
import { useAdmin } from "../context/AdminContext";

export default function PendingApproval({ email, isInactive = false }) {
  const { logout } = useAdmin();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    if (isSigningOut) return;
    setIsSigningOut(true);
    try {
      await logout();
      window.location.replace("/login");
    } catch (err) {
      console.error("Sign out error:", err);
      setIsSigningOut(false);
    }
  };

  if (isInactive) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F3F7FA] px-4 py-16 sm:px-6 lg:px-8">
        {/* Background glow */}
        <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-rose-50 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-sky-50 blur-3xl" />

        <div className="relative w-full max-w-[440px]">
          <div className="rounded-3xl border border-[#DCE6EF] bg-white p-6 sm:p-7 shadow-[0_12px_40px_rgba(16,36,58,0.08)] text-center">
            {/* Badge Icon */}
            <div className="mx-auto flex h-13 w-13 items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 text-rose-600 shadow-sm">
              <ShieldAlert size={28} />
            </div>

            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-0.5 text-xs font-semibold text-rose-700">
              Account Deactivated
            </div>

            <h1 className="mt-2.5 text-xl font-bold tracking-tight text-[#10243A] sm:text-2xl">
              Account Inactive
            </h1>

            <div className="mt-2.5 rounded-2xl border border-slate-100 bg-slate-50/80 p-2.5 text-xs text-slate-600 sm:p-3">
              <p className="font-medium text-slate-500 uppercase tracking-wider text-[10px]">
                Authenticated Account
              </p>
              <p className="mt-0.5 font-semibold text-[#10243A] truncate">
                {email || "Google Account"}
              </p>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Your administrator account has been deactivated. Please contact an IEEE Student Branch Super Admin to reactivate your access.
            </p>

            <div className="mt-5 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-700 shadow-sm transition hover:bg-rose-100 active:scale-[0.98] disabled:opacity-60"
              >
                {isSigningOut ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-rose-600 border-t-transparent" />
                    <span>Signing out...</span>
                  </>
                ) : (
                  <>
                    <LogOut size={15} />
                    <span>Sign Out</span>
                  </>
                )}
              </button>

              <Link
                href="/"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#DCE6EF] bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-[#F1F5F9] hover:text-[#00629B]"
              >
                <ArrowLeft size={15} />
                <span>Return to Public Website</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F3F7FA] px-4 py-16 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-amber-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-sky-50 blur-3xl" />

      <div className="relative w-full max-w-[440px]">
        <div className="rounded-3xl border border-[#DCE6EF] bg-white p-6 sm:p-7 shadow-[0_12px_40px_rgba(16,36,58,0.08)] text-center">
          {/* Clock Icon Container */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-amber-600 shadow-sm">
            <Clock size={28} />
          </div>

          {/* Heading */}
          <h1 className="mt-4 text-xl font-bold tracking-tight text-[#10243A] sm:text-2xl">
            Approval Pending
          </h1>

          {/* Authenticated Account Info */}
          <div className="mt-2.5 rounded-2xl border border-slate-100 bg-slate-50/80 p-2.5 text-xs text-slate-600 sm:p-3">
            <p className="font-medium text-slate-500 uppercase tracking-wider text-[10px]">
              Authenticated Account
            </p>
            <p className="mt-0.5 font-semibold text-[#10243A] truncate">
              {email || "Google Account"}
            </p>
          </div>

          {/* Main Message */}
          <p className="mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            Your Google account has been successfully authenticated, but you don't currently have access to the IEEE RNSIT Student Branch Dashboard.
          </p>

          {/* Supporting Message */}
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed">
            Please contact the Super Admin to request access, or wait until your account has been reviewed and approved.
          </p>

          {/* Action Buttons */}
          <div className="mt-5 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-[0.98] disabled:opacity-60"
            >
              {isSigningOut ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#00629B] border-t-transparent" />
                  <span>Signing out...</span>
                </>
              ) : (
                <>
                  <LogOut size={15} />
                  <span>Sign Out</span>
                </>
              )}
            </button>

            <Link
              href="/"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#DCE6EF] bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-[#F1F5F9] hover:text-[#00629B]"
            >
              <ArrowLeft size={15} />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
