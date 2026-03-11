import type { User } from "@supabase/supabase-js";
import { env } from "@/lib/env";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Database } from "@/lib/supabase/database.types";

export type AppUser = Database["public"]["Tables"]["users"]["Row"];

function getUserRole(email?: string | null): AppUser["role"] {
  if (!email) return "user";
  return env.adminEmails.includes(email.toLowerCase()) ? "admin" : "user";
}

export async function ensureAppUser(authUser: User): Promise<AppUser> {
  const admin = createSupabaseAdminClient();
  const email = authUser.email?.trim().toLowerCase();

  if (!email) {
    throw new Error("Authenticated user is missing an email address.");
  }

  const payload = {
    id: authUser.id,
    email,
    full_name:
      authUser.user_metadata.full_name ??
      authUser.user_metadata.name ??
      authUser.user_metadata.user_name ??
      null,
    avatar_url:
      authUser.user_metadata.avatar_url ??
      authUser.user_metadata.picture ??
      null,
    role: getUserRole(email),
  } satisfies Database["public"]["Tables"]["users"]["Insert"];

  const { data, error } = await admin
    .from("users")
    .upsert(payload as never, { onConflict: "id" })
    .select("*")
    .single();

  if (error) {
    throw new Error(`Failed to ensure app user: ${error.message}`);
  }

  const { error: balanceError } = await admin
    .from("credit_balances")
    .upsert({ user_id: authUser.id } as never, {
      onConflict: "user_id",
      ignoreDuplicates: true,
    });

  if (balanceError) {
    throw new Error(`Failed to ensure credit balance row: ${balanceError.message}`);
  }

  return data as AppUser;
}

export async function getUserById(userId: string): Promise<AppUser> {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.from("users").select("*").eq("id", userId).single();

  if (error) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }

  return data as AppUser;
}

export async function getUserByEmail(email: string): Promise<AppUser | null> {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("users")
    .select("*")
    .eq("email", email.trim().toLowerCase())
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch user by email: ${error.message}`);
  }

  return data as AppUser | null;
}

export async function updateUserProfile(
  userId: string,
  values: { fullName?: string | null }
): Promise<AppUser> {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("users")
    .update(
      {
        full_name: values.fullName ?? null,
      } as never
    )
    .eq("id", userId)
    .select("*")
    .single();

  if (error) {
    throw new Error(`Failed to update profile: ${error.message}`);
  }

  return data as AppUser;
}

export async function setUserCreemCustomerId(userId: string, creemCustomerId: string | null) {
  const admin = createSupabaseAdminClient();
  const { error } = await admin
    .from("users")
    .update({ creem_customer_id: creemCustomerId } as never)
    .eq("id", userId);

  if (error) {
    throw new Error(`Failed to update Creem customer mapping: ${error.message}`);
  }
}
