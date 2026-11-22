import { createClient } from "../../lib/supabase/server";
import AdminDashboard from "../../views/AdminDashboard";
import Login from "../../views/Login";
import PendingApproval from "../../components/PendingApproval";
import ProtectedRoute from "../../components/ProtectedRoute";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Admin Dashboard | IEEE SB RNSIT",
  description: "Executive portal to manage IEEE SB RNSIT website content.",
};

export default async function AdminPage({ searchParams }) {
  const params = await searchParams;
  const urlError = params?.error;
  const errorEmail = params?.email;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 1. Visitor is not authenticated -> Display Google OAuth Login screen
  if (!user) {
    return <Login initialError={urlError} initialEmail={errorEmail} />;
  }

  // 2. Authenticated with Google -> Verify administrator allowlist & active status
  const { data: adminRecord, error: rpcError } = await supabase
    .rpc("get_current_admin_profile")
    .maybeSingle();

  if (rpcError) {
    console.error("Admin verification RPC error:", {
      code: rpcError.code,
      message: rpcError.message,
    });
  }

  const isAuthorized =
    !rpcError &&
    Boolean(adminRecord) &&
    adminRecord.user_id === user.id &&
    adminRecord.is_active === true;

  // 3. Authenticated but unapproved / inactive -> Display Pending Approval view
  if (!isAuthorized) {
    const isInactive = Boolean(adminRecord && adminRecord.is_active === false);
    return <PendingApproval email={user.email} isInactive={isInactive} />;
  }

  // 4. Authorized administrator -> Render Dashboard
  return (
    <ProtectedRoute initialUser={user}>
      <AdminDashboard initialUser={user} initialProfile={adminRecord} />
    </ProtectedRoute>
  );
}
