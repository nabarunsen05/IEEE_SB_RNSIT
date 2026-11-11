"use client";

import { useAdmin } from "../context/AdminContext";
import Login from "../views/Login";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAdmin();

  if (!isAuthenticated) {
    return <Login />;
  }

  return children;
}
