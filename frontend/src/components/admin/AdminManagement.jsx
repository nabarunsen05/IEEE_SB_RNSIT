import { useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import { Plus, X, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

export default function AdminManagement() {
  const {
    adminUsers,
    adminUsersLoading,
    adminUsersError,
    addAdminUser,
    fetchAdminUsers,
    adminProfile,
  } = useAdmin();

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ email: "", role: "admin" });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isActiveSuperAdmin =
    adminProfile?.role === "super_admin" && adminProfile?.is_active === true;

  // This component is exclusively for active Super Admins.
  if (!isActiveSuperAdmin) return null;

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(form.email.trim())) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    setSubmitting(true);
    try {
      const result = await addAdminUser({
        email: form.email.trim(),
        role: form.role,
      });

      if (result.success) {
        setMessage({ type: "success", text: "Administrator added successfully." });
        setForm({ email: "", role: "admin" });
        setShowModal(false);
      } else {
        setMessage({
          type: "error",
          text: result.message || "Failed to add administrator.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to add administrator.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const refresh = async () => {
    await fetchAdminUsers();
  };

  return (
    <div className="mt-8">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#10243A]">
          Administrator Management
        </h2>
        <div className="flex gap-2">
          <button
            onClick={refresh}
            disabled={adminUsersLoading}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#DCE6EF] bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-[#F1F5F9] disabled:opacity-50"
            title="Refresh list"
          >
            <RefreshCw
              size={13}
              className={adminUsersLoading ? "animate-spin" : ""}
            />
            Refresh
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#00629B] to-[#0077B8] px-3.5 py-2 text-xs font-medium text-white hover:shadow-cyan-500/25"
          >
            <Plus size={13} /> Add Administrator
          </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`mb-4 flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${
            message.type === "error"
              ? "border border-rose-200 bg-rose-50 text-rose-700"
              : "border border-emerald-200 bg-emerald-50 text-emerald-700"
          }`}
        >
          {message.type === "error" ? (
            <AlertCircle size={14} />
          ) : (
            <CheckCircle size={14} />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Admin List */}
      {adminUsersLoading ? (
        <div className="py-8 text-center text-slate-600">
          Loading administrators…
        </div>
      ) : adminUsersError ? (
        <div className="py-8 text-center text-rose-600">
          Error: {adminUsersError}
        </div>
      ) : adminUsers && adminUsers.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-[#DCE6EF] bg-white">
          <table className="min-w-full table-auto">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">
                  Role
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">
                  Active
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">
                  Created At
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">
                  Creator
                </th>
              </tr>
            </thead>
            <tbody>
              {adminUsers.map((user) => (
                <tr key={user.user_id} className="border-t border-[#E6EDF3]">
                  <td className="px-4 py-2 text-sm text-[#10243A]">
                    {user.email}
                  </td>
                  <td className="px-4 py-2 text-sm capitalize text-[#10243A]">
                    {user.role}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    {user.is_active ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-700">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-sm text-slate-600">
                    {user.created_at
                      ? new Date(user.created_at).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-4 py-2 text-sm text-slate-600">
                    {user.created_by || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-8 text-center text-slate-500">
          No administrators found.
        </div>
      )}

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#10243A]">
                Add Administrator
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-slate-500 hover:text-[#10243A]"
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="admin@example.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="w-full rounded-xl border border-[#DCE6EF] bg-white px-3.5 py-2.5 text-sm placeholder-slate-400 focus:border-[#29A9E0] focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">
                  Role *
                </label>
                <select
                  className="w-full rounded-xl border border-[#DCE6EF] bg-white px-3 py-2.5 text-sm focus:border-[#29A9E0] focus:outline-none"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option value="super_admin">Super Admin</option>
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                </select>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={submitting}
                  className="rounded-xl border border-[#DCE6EF] px-4 py-2 text-sm font-medium text-slate-700 hover:bg-[#F1F5F9] disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-gradient-to-r from-[#00629B] to-[#0077B8] px-4 py-2 text-sm font-medium text-white hover:shadow-cyan-500/25 disabled:opacity-50"
                >
                  {submitting ? "Adding…" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
