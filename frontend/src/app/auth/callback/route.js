import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/admin";

  if (code) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error && data?.user) {
        // Prevent open-redirect vulnerability: ensure next starts with /
        const safeNext = next.startsWith("/") ? next : "/admin";
        return NextResponse.redirect(`${origin}${safeNext}`);
      }

      if (error) {
        console.error("Supabase OAuth code exchange error:", error.message);
      }
    } catch (err) {
      console.error("Unexpected error in auth callback:", err);
    }
  }

  return NextResponse.redirect(`${origin}/admin?error=oauth_error`);
}
