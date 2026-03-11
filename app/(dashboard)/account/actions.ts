"use server";

import { redirect } from "next/navigation";
import { requireViewer } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { updateUserProfile } from "@/lib/db/users";

function redirectWithMessage(key: "message" | "error", value: string): never {
  const params = new URLSearchParams();
  params.set(key, value);
  redirect(`/account?${params.toString()}`);
}

export async function updateAccountAction(formData: FormData) {
  const viewer = await requireViewer();
  const fullName = String(formData.get("fullName") ?? "").trim();

  await updateUserProfile(viewer.profile.id, { fullName });

  const supabase = await createSupabaseServerClient();
  await supabase.auth.updateUser({
    data: {
      full_name: fullName,
    },
  });

  redirectWithMessage("message", "Account updated.");
}
