import type { Subscription } from "creem_io";
import { getCreemClient } from "@/lib/creem/client";
import { getCreditsForPlan, getPlanByProductId, getPlanIntervalByProductId } from "@/lib/billing/catalog";
import { grantCredits } from "@/lib/db/credits";
import { upsertSubscriptionFromCreem, type SubscriptionSyncInput } from "@/lib/db/subscriptions";
import type { Json } from "@/lib/supabase/database.types";
import { setUserCreemCustomerId } from "@/lib/db/users";

function subscriptionToSyncInput(sub: Subscription): SubscriptionSyncInput {
  const productId = typeof sub.product === "string" ? sub.product : sub.product.id;
  const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer.id;
  return {
    id: sub.id,
    customerId,
    productId,
    status: sub.status,
    canceledAt: sub.canceledAt ?? null,
    createdAt: sub.createdAt,
    currentPeriodStartDate: sub.currentPeriodStartDate,
    currentPeriodEndDate: sub.currentPeriodEndDate,
    lastTransactionId: sub.lastTransactionId ?? null,
    metadata: (sub.metadata ?? {}) as Json,
  };
}

export async function syncSubscriptionFromCheckoutSuccess(
  subscriptionId: string,
  userId: string,
  customerId?: string | null
): Promise<boolean> {
  try {
    const creem = getCreemClient();
    const sub = await creem.subscriptions.get({ subscriptionId });
    const input = subscriptionToSyncInput(sub);
    const plan = getPlanByProductId(input.productId);
    const interval = getPlanIntervalByProductId(input.productId);
    if (!plan || !interval) return false;

    if (customerId) {
      await setUserCreemCustomerId(userId, customerId);
    }
    await upsertSubscriptionFromCreem(userId, input);

    if (["active", "trialing"].includes(sub.status)) {
      const credits = getCreditsForPlan(plan.key, interval);
      if (credits > 0) {
        await grantCredits({
          userId,
          amount: credits,
          kind: "subscription_activation",
          sourceKey: `subscription:${sub.id}:activation`,
          sourceType: "subscription",
          sourceId: sub.id,
          note: `${plan.name} activation credits`,
          metadata: { subscriptionId: sub.id, productId: input.productId, credits },
        });
      }
    }
    return true;
  } catch {
    return false;
  }
}
