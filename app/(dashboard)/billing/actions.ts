"use server";

import { redirect } from "next/navigation";
import { buildCheckoutHref } from "@/lib/billing/checkout";
import { getPlan, type BillingInterval, type PlanKey } from "@/lib/billing/catalog";
import { requireViewer } from "@/lib/auth/session";
import { getCreemClient } from "@/lib/creem/client";
import { markSubscriptionCancelScheduled } from "@/lib/db/subscriptions";

const planRank: Record<PlanKey, number> = {
  starter: 0,
  pro: 1,
  scale: 2,
};

function redirectWithMessage(key: "message" | "error", value: string): never {
  const params = new URLSearchParams();
  params.set(key, value);
  redirect(`/billing?${params.toString()}`);
}

export async function changePlanAction(formData: FormData) {
  const viewer = await requireViewer();
  const planKey = String(formData.get("planKey") ?? "") as PlanKey;
  const interval = String(formData.get("interval") ?? "") as BillingInterval;
  const plan = getPlan(planKey);

  if (!plan) {
    redirectWithMessage("error", "Unknown plan selected.");
  }

  const targetProductId = interval === "yearly" ? plan.yearlyProductId : plan.monthlyProductId;

  if (!targetProductId) {
    redirectWithMessage("error", "That plan is not configured yet.");
  }

  if (!viewer.subscription) {
    redirect(
      buildCheckoutHref({
        productId: targetProductId,
        referenceId: viewer.profile.id,
        email: viewer.profile.email,
        successPath: "/billing?message=checkout-started",
        metadata: {
          planKey,
          interval,
          intent: "subscription",
        },
      })
    );
  }

  if (viewer.subscription.creem_product_id === targetProductId) {
    redirectWithMessage("message", "You are already on that plan.");
  }

  const currentRank = planRank[(viewer.subscription.plan_key as PlanKey) ?? "starter"] ?? 0;
  const nextRank = planRank[planKey] ?? 0;
  const updateBehavior =
    nextRank > currentRank ? "proration-charge-immediately" : "proration-charge";

  try {
    const creem = getCreemClient();
    await creem.subscriptions.upgrade({
      subscriptionId: viewer.subscription.creem_subscription_id,
      productId: targetProductId,
      updateBehavior,
    });
    redirectWithMessage(
      "message",
      "Plan change requested. Billing state will finalize after Creem webhook sync."
    );
  } catch {
    redirect("/portal");
  }
}

export async function cancelSubscriptionAction() {
  const viewer = await requireViewer();

  if (!viewer.subscription) {
    redirectWithMessage("error", "No subscription found to cancel.");
  }

  const creem = getCreemClient();
  await creem.subscriptions.cancel({
    subscriptionId: viewer.subscription.creem_subscription_id,
    mode: "scheduled",
  });
  await markSubscriptionCancelScheduled(viewer.subscription.creem_subscription_id);

  redirectWithMessage(
    "message",
    "Cancellation scheduled. Access stays active until the current billing period ends."
  );
}
