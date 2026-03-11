"use server";

import { redirect } from "next/navigation";
import { requireEntitledViewer } from "@/lib/auth/session";
import { consumeCredits } from "@/lib/db/credits";
import { starterConfig } from "@/lib/starter/config";

function redirectWithMessage(key: "message" | "error", value: string): never {
  const params = new URLSearchParams();
  params.set(key, value);
  redirect(`/credits?${params.toString()}`);
}

export async function runSampleCreditAction() {
  const viewer = await requireEntitledViewer();

  try {
    await consumeCredits({
      userId: viewer.profile.id,
      amount: starterConfig.dashboard.sampleCreditCost,
      kind: "usage_debit",
      sourceKey: `sample:${viewer.profile.id}:${Date.now()}`,
      sourceType: "sample_action",
      note: "Sample AI action",
      metadata: {
        action: "sample-generation",
      },
      createdBy: viewer.profile.id,
    });
  } catch (error) {
    redirectWithMessage(
      "error",
      error instanceof Error ? error.message : "Unable to consume credits."
    );
  }

  redirectWithMessage(
    "message",
    `Sample action completed. ${starterConfig.dashboard.sampleCreditCost} credits spent.`
  );
}
