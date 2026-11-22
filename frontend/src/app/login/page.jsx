import { createClient } from "../../lib/supabase/server";
import { redirect } from "next/navigation";
import Login from "../../views/Login";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Admin Login | IEEE SB RNSIT",
  description: "Executive administrator login portal.",
};

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  const urlError = params?.error;
  const errorEmail = params?.email;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is already authenticated with an active admin profile, redirect to /admin
  if (user) {
    const { data: adminRecord } = await supabase
      .rpc("get_current_admin_profile")
      .maybeSingle();

    if (adminRecord && adminRecord.is_active === true) {
      redirect("/admin");
    }
  }

  return <Login initialError={urlError} initialEmail={errorEmail} />;
}
