import { getPlanByProductId, getPlanIntervalByProductId } from "@/lib/billing/catalog";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Database, Json } from "@/lib/supabase/database.types";

export type AppSubscription = Database["public"]["Tables"]["subscriptions"]["Row"];
export type SubscriptionSyncInput = {
  id: string;
  customerId: string;
  productId: string;
  status: string;
  canceledAt?: Date | string | null;
  createdAt: Date | string;
  currentPeriodStartDate?: Date | string | null;
  currentPeriodEndDate?: Date | string | null;
  lastTransactionId?: string | null;
  metadata?: Json;
};

export const ENTITLED_STATUSES = new Set(["trialing", "active", "past_due", "scheduled_cancel"]);

export function hasActiveEntitlement(status?: string | null) {
  if (!status) return false;
  return ENTITLED_STATUSES.has(status);
}

function toIso(date: Date | string | number | null | undefined): string | null {
  if (date == null) return null;
  if (typeof date === "string") return date;
  if (typeof date === "number") return new Date(date).toISOString();
  return date instanceof Date ? date.toISOString() : null;
}

export async function getCurrentSubscription(userId: string): Promise<AppSubscription | null> {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch subscription: ${error.message}`);
  }

  return data as AppSubscription | null;
}

export async function getSubscriptionByCreemId(
  creemSubscriptionId: string
): Promise<AppSubscription | null> {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("subscriptions")
    .select("*")
    .eq("creem_subscription_id", creemSubscriptionId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch Creem subscription: ${error.message}`);
  }

  return data as AppSubscription | null;
}

export async function upsertSubscriptionFromCreem(
  userId: string,
  subscription: SubscriptionSyncInput,
  lastEventId?: string
): Promise<AppSubscription> {
  const admin = createSupabaseAdminClient();
  const plan = getPlanByProductId(subscription.productId);
  const interval = getPlanIntervalByProductId(subscription.productId);

  const payload = {
    user_id: userId,
    creem_subscription_id: subscription.id,
    creem_customer_id: subscription.customerId,
    creem_product_id: subscription.productId,
    plan_key: plan?.key ?? "starter",
    price_interval: interval,
    status: subscription.status,
    cancel_at_period_end: subscription.status === "scheduled_cancel" || Boolean(subscription.canceledAt),
    current_period_start: toIso(subscription.currentPeriodStartDate),
    current_period_end: toIso(subscription.currentPeriodEndDate),
    trial_start: subscription.status === "trialing" ? toIso(subscription.createdAt) : null,
    trial_end:
      subscription.status === "trialing" ? toIso(subscription.currentPeriodEndDate) : null,
    canceled_at: toIso(subscription.canceledAt),
    last_transaction_id: subscription.lastTransactionId ?? null,
    last_event_id: lastEventId ?? null,
    metadata: (subscription.metadata ?? {}) as Json,
  } satisfies Database["public"]["Tables"]["subscriptions"]["Insert"];

  const { data, error } = await admin
    .from("subscriptions")
    .upsert(payload as never, { onConflict: "creem_subscription_id" })
    .select("*")
    .single();

  if (error) {
    throw new Error(`Failed to upsert subscription: ${error.message}`);
  }

  return data as AppSubscription;
}

export async function listRecentSubscriptions(limit = 50): Promise<AppSubscription[]> {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("subscriptions")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to list subscriptions: ${error.message}`);
  }

  return (data ?? []) as AppSubscription[];
}

export async function markSubscriptionCancelScheduled(
  creemSubscriptionId: string
): Promise<AppSubscription> {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("subscriptions")
    .update(
      {
        status: "scheduled_cancel",
        cancel_at_period_end: true,
      } as never
    )
    .eq("creem_subscription_id", creemSubscriptionId)
    .select("*")
    .single();

  if (error) {
    throw new Error(`Failed to mark subscription as scheduled for cancelation: ${error.message}`);
  }

  return data as AppSubscription;
}
