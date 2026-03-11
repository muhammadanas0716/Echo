"use server";

import { redirect } from "next/navigation";
import { requireAdminViewer } from "@/lib/auth/session";
import { grantCredits, consumeCredits } from "@/lib/db/credits";
import { getUserByEmail } from "@/lib/db/users";

function redirectWithMessage(key: "message" | "error", value: string): never {
  const params = new URLSearchParams();
  params.set(key, value);
  redirect(`/admin/billing?${params.toString()}`);
}

export async function adjustCreditsAction(formData: FormData) {
  const admin = await requireAdminViewer();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const amount = Number(formData.get("amount") ?? 0);
  const note = String(formData.get("note") ?? "").trim();

  if (!email || Number.isNaN(amount) || amount === 0) {
    redirectWithMessage("error", "Email and a non-zero amount are required.");
  }

  const user = await getUserByEmail(email);
  if (!user) {
    redirectWithMessage("error", "No user found for that email.");
  }

  const sourceKey = `admin-adjustment:${user.id}:${Date.now()}`;

  if (amount > 0) {
    await grantCredits({
      userId: user.id,
      amount,
      kind: "manual_grant",
      sourceKey,
      sourceType: "admin",
      note: note || "Manual admin credit grant",
      createdBy: admin.profile.id,
      metadata: {
        targetEmail: email,
      },
    });
  } else {
    await consumeCredits({
      userId: user.id,
      amount: Math.abs(amount),
      kind: "manual_reversal",
      sourceKey,
      sourceType: "admin",
      note: note || "Manual admin credit reversal",
      createdBy: admin.profile.id,
      metadata: {
        targetEmail: email,
      },
    });
  }

  redirectWithMessage("message", "Credits adjusted.");
}
