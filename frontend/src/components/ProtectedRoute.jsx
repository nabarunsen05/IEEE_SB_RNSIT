"use client";

import { useAdmin } from "../context/AdminContext";
import Login from "../views/Login";

export default function ProtectedRoute({ children, initialUser }) {
  const { isAuthenticated, isLoading } = useAdmin();

  // Loading state during client session verification
  if (isLoading && !initialUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F3F7FA]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-3 border-[#00629B] border-t-transparent" />
          <p className="text-sm font-medium text-slate-600">Verifying administrator authorization...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated && !isLoading) {
    return <Login />;
  }

  return children;
}
