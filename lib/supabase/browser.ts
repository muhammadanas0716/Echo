"use client";

import { createBrowserClient } from "@supabase/ssr";
import { env } from "@/lib/env";
import type { Database } from "@/lib/supabase/database.types";

let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function createSupabaseBrowserClient() {
  if (!env.supabaseUrl || !env.supabaseAnonKey) {
    throw new Error("Supabase browser environment variables are not configured.");
  }

  if (!browserClient) {
    browserClient = createBrowserClient<Database>(env.supabaseUrl, env.supabaseAnonKey);
  }

  return browserClient;
}
