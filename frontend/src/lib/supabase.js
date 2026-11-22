import { createBrowserClient } from "@supabase/ssr";

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

const PLACEHOLDER_URLS = [
  "your-project-url",
  "your-project-id",
  "your-supabase-url",
  "<your-project-id>",
  "<project-id>",
  "<project-ref>",
  "example.supabase.co",
];

const PLACEHOLDER_KEYS = [
  "your-anon-key",
  "your-anon-key-here",
  "<your-anon-key>",
  "<anon-key>",
  "your-key-here",
  "your-api-key",
];

export const getSupabaseConfigStatus = () => {
  const supabaseUrl = sanitizeEnv(
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  ).replace(/\/+$/, "");

  const supabaseAnonKey = sanitizeEnv(
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY
  );

  if (!supabaseUrl) {
    return {
      isConfigured: false,
      error: "Missing Supabase URL. Please define NEXT_PUBLIC_SUPABASE_URL in your .env.local file.",
    };
  }

  if (!supabaseAnonKey) {
    return {
      isConfigured: false,
      error: "Missing Supabase key. Please define NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in your .env.local file.",
    };
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(supabaseUrl);
  } catch {
    return {
      isConfigured: false,
      error: "Invalid Supabase URL format. Please ensure NEXT_PUBLIC_SUPABASE_URL is a valid HTTPS URL.",
    };
  }

  if (parsedUrl.protocol !== "https:") {
    return {
      isConfigured: false,
      error: "Invalid Supabase URL protocol. NEXT_PUBLIC_SUPABASE_URL must start with https://.",
    };
  }

  const urlLower = supabaseUrl.toLowerCase();
  if (PLACEHOLDER_URLS.some((p) => urlLower.includes(p))) {
    return {
      isConfigured: false,
      error: "Placeholder Supabase URL detected. Please update .env.local with your actual Supabase project URL.",
    };
  }

  const keyLower = supabaseAnonKey.toLowerCase();
  if (PLACEHOLDER_KEYS.some((p) => keyLower.includes(p)) || supabaseAnonKey.length < 20) {
    return {
      isConfigured: false,
      error: "Placeholder or invalid Supabase key detected. Please update .env.local with your actual anon/publishable key.",
    };
  }

  return {
    isConfigured: true,
    url: supabaseUrl,
    anonKey: supabaseAnonKey,
  };
};

export const isSupabaseConfigured = () => {
  return getSupabaseConfigStatus().isConfigured;
};

const config = getSupabaseConfigStatus();

export const supabase = config.isConfigured
  ? createBrowserClient(config.url, config.anonKey)
  : null;
