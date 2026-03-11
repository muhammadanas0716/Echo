"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ensureAppUser, updateUserProfile } from "@/lib/db/users";
import { env } from "@/lib/env";

function redirectWithMessage(path: string, key: "error" | "message", value: string): never {
  const params = new URLSearchParams();
  params.set(key, value);
  redirect(`${path}?${params.toString()}`);
}

function getNextPath(formData: FormData, fallback = "/dashboard") {
  const next = formData.get("next");
  return typeof next === "string" && next.startsWith("/") ? next : fallback;
}

export async function loginAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = getNextPath(formData);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirectWithMessage("/login", "error", error.message);
  }

  if (data.user) {
    await ensureAppUser(data.user);
  }

  redirect(next);
}

export async function signupAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = getNextPath(formData);

  const callbackUrl = new URL("/auth/callback", env.siteUrl);
  callbackUrl.searchParams.set("next", next);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: callbackUrl.toString(),
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    redirectWithMessage("/signup", "error", error.message);
  }

  if (data.user) {
    await ensureAppUser(data.user);
    if (fullName) {
      await updateUserProfile(data.user.id, { fullName });
    }
  }

  if (!data.session) {
    redirectWithMessage("/login", "message", "Check your email to confirm your account.");
  }

  redirect(next);
}

export async function googleAuthAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const next = getNextPath(formData);
  const callbackUrl = new URL("/auth/callback", env.siteUrl);
  callbackUrl.searchParams.set("next", next);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: callbackUrl.toString(),
    },
  });

  if (error || !data.url) {
    redirectWithMessage("/login", "error", error?.message ?? "Failed to start Google sign-in.");
  }

  const redirectUrl = data.url;
  redirect(redirectUrl);
}

export async function forgotPasswordAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const callbackUrl = new URL("/auth/callback", env.siteUrl);
  callbackUrl.searchParams.set("next", "/reset-password");

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: callbackUrl.toString(),
  });

  if (error) {
    redirectWithMessage("/forgot-password", "error", error.message);
  }

  redirectWithMessage("/forgot-password", "message", "Password reset email sent.");
}

export async function resetPasswordAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (password.length < 8) {
    redirectWithMessage("/reset-password", "error", "Password must be at least 8 characters.");
  }

  if (password !== confirmPassword) {
    redirectWithMessage("/reset-password", "error", "Passwords do not match.");
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    redirectWithMessage("/reset-password", "error", error.message);
  }

  redirectWithMessage("/account", "message", "Password updated.");
}

export async function logoutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}
