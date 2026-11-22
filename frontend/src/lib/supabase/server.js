import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function sanitizeEnv(val) {
  if (typeof val !== "string") return "";
  let clean = val.trim();
  if (
    (clean.startsWith('"') && clean.endsWith('"')) ||
    (clean.startsWith("'") && clean.endsWith("'"))
  ) {
    clean = clean.slice(1, -1).trim();
  }
  return clean;
}

export function getSupabaseServerCredentials() {
  const url = sanitizeEnv(
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  ).replace(/\/+$/, "");

  const anonKey = sanitizeEnv(
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY
  );

  return { url, anonKey };
}

export async function createClient() {
  const { url, anonKey } = getSupabaseServerCredentials();
  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if middleware is refreshing user sessions.
        }
      },
    },
  });
}
