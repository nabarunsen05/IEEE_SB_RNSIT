import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/admin";
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  if (error || errorDescription) {
    console.error("Auth callback received error from OAuth provider:", {
      error,
      errorDescription,
    });
    const errorParam = encodeURIComponent(errorDescription || error || "oauth_error");
    return NextResponse.redirect(`${origin}/login?error=${errorParam}`);
  }

  if (code) {
    try {
      const supabase = await createClient();
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

      if (!exchangeError && data?.user) {
        // Prevent open-redirect vulnerability: ensure next starts with /
        const safeNext = next.startsWith("/") ? next : "/admin";
        return NextResponse.redirect(`${origin}${safeNext}`);
      }

      if (exchangeError) {
        console.error("Supabase OAuth code exchange error:", exchangeError.message);
        const errorParam = encodeURIComponent(exchangeError.message || "oauth_error");
        return NextResponse.redirect(`${origin}/login?error=${errorParam}`);
      }
    } catch (err) {
      console.error("Unexpected error in auth callback:", err);
      return NextResponse.redirect(`${origin}/login?error=oauth_error`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=oauth_error`);
}
