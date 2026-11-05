"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "../context/AdminContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
