import type {
  FlatCheckoutCompleted,
  FlatSubscriptionEvent,
  GrantAccessContext,
  RevokeAccessContext,
} from "@creem_io/nextjs";
import { getCreditsForPlan, getCreditPackByProductId, getPlanByProductId } from "@/lib/billing/catalog";
import { grantCredits } from "@/lib/db/credits";
import { upsertSubscriptionFromCreem, type SubscriptionSyncInput } from "@/lib/db/subscriptions";
import { getUserByEmail, setUserCreemCustomerId } from "@/lib/db/users";

type JsonSafe = string | number | boolean | null | JsonSafe[] | { [key: string]: JsonSafe };

function toJsonSafe<T>(value: T): JsonSafe {
  return JSON.parse(JSON.stringify(value)) as JsonSafe;
}

function toSubscriptionSyncInput(
  event: GrantAccessContext | RevokeAccessContext | FlatSubscriptionEvent<string>
): SubscriptionSyncInput {
  return {
    id: event.id,
    customerId: event.customer.id,
    productId: event.product.id,
    status: event.status,
    canceledAt: event.canceled_at,
    createdAt: event.created_at,
    currentPeriodStartDate: event.current_period_start_date,
    currentPeriodEndDate: event.current_period_end_date,
    lastTransactionId: event.last_transaction_id ?? null,
    metadata: toJsonSafe(event.metadata ?? {}),
  };
}

function toCheckoutSubscriptionSyncInput(event: FlatCheckoutCompleted): SubscriptionSyncInput | null {
  if (!event.subscription) {
    return null;
  }

  return {
    id: event.subscription.id,
    customerId: event.customer?.id ?? event.subscription.customer,
    productId: event.product.id,
    status: event.subscription.status,
    canceledAt: event.subscription.canceled_at,
    createdAt: event.subscription.created_at,
    currentPeriodStartDate: event.subscription.current_period_start_date,
    currentPeriodEndDate: event.subscription.current_period_end_date,
    lastTransactionId: event.subscription.last_transaction_id ?? null,
    metadata: toJsonSafe(event.subscription.metadata ?? {}),
  };
}

function isCheckoutCompletedEvent(
  event:
    | FlatCheckoutCompleted
    | GrantAccessContext
    | RevokeAccessContext
    | FlatSubscriptionEvent<string>
): event is FlatCheckoutCompleted {
  return "webhookEventType" in event && event.webhookEventType === "checkout.completed";
}

async function resolveUserId(referenceId: unknown, email?: string | null) {
  if (typeof referenceId === "string" && referenceId.trim()) {
    return referenceId;
  }

  if (email) {
    const user = await getUserByEmail(email);
    return user?.id ?? null;
  }

  return null;
}

async function syncSubscriptionAccess(
  event:
    | FlatCheckoutCompleted
    | GrantAccessContext
    | RevokeAccessContext
    | FlatSubscriptionEvent<string>
) {
  const subscriptionInput = isCheckoutCompletedEvent(event)
    ? toCheckoutSubscriptionSyncInput(event)
    : toSubscriptionSyncInput(event);

  if (!subscriptionInput) {
    return null;
  }

  const referenceId =
    (isCheckoutCompletedEvent(event) ? event.subscription?.metadata?.referenceId : event.metadata?.referenceId) ??
    (isCheckoutCompletedEvent(event) ? event.subscription?.metadata?.userId : event.metadata?.userId) ??
    (event.metadata?.referenceId as string | undefined) ??
    (event.metadata?.userId as string | undefined);

  const userId = await resolveUserId(referenceId, event.customer?.email ?? null);

  if (!userId) {
    return null;
  }

  await setUserCreemCustomerId(userId, event.customer?.id ?? null);
  const lastEventId = "webhookId" in event ? event.webhookId : undefined;
  return upsertSubscriptionFromCreem(userId, subscriptionInput, lastEventId);
}

export async function handleCheckoutCompleted(event: FlatCheckoutCompleted) {
  const referenceId =
    (event.metadata?.referenceId as string | undefined) ??
    (event.metadata?.userId as string | undefined);
  const userId = await resolveUserId(referenceId, event.customer?.email ?? null);

  if (!userId) return;

  if (event.customer?.id) {
    await setUserCreemCustomerId(userId, event.customer.id);
  }

  if (event.subscription) {
    const subscriptionInput = toCheckoutSubscriptionSyncInput(event);
    if (subscriptionInput) {
      await upsertSubscriptionFromCreem(userId, subscriptionInput, event.webhookId);
    }
  }

  const topup = getCreditPackByProductId(event.product.id);
  if (!topup) return;

  await grantCredits({
    userId,
    amount: topup.credits,
    kind: "topup_purchase",
    sourceKey: `topup:${event.webhookId}`,
    sourceType: "checkout",
    sourceId: event.id,
    note: `${topup.name} purchased`,
    metadata: toJsonSafe({
      checkoutId: event.id,
      orderId: event.order?.id ?? null,
      productId: event.product.id,
      credits: topup.credits,
    }),
  });
}

export async function handleGrantAccess(event: GrantAccessContext) {
  const subscription = await syncSubscriptionAccess(event);
  if (!subscription) return;

  const plan = getPlanByProductId(event.product.id);
  if (!plan) return;

  const interval = subscription.price_interval === "yearly" ? "yearly" : "monthly";
  const credits = getCreditsForPlan(plan.key, interval);
  if (credits <= 0) return;

  const sourceKey =
    event.reason === "subscription_paid"
      ? `subscription:${event.id}:renewal:${event.last_transaction_id ?? event.current_period_end_date.toISOString()}`
      : `subscription:${event.id}:activation`;

  await grantCredits({
    userId: subscription.user_id,
    amount: credits,
    kind: event.reason === "subscription_paid" ? "subscription_renewal" : "subscription_activation",
    sourceKey,
    sourceType: "subscription",
    sourceId: event.id,
    note:
      event.reason === "subscription_paid"
        ? `${plan.name} renewal credits`
        : `${plan.name} activation credits`,
    metadata: toJsonSafe({
      subscriptionId: event.id,
      productId: event.product.id,
      reason: event.reason,
      credits,
    }),
  });
}

export async function handleRevokeAccess(event: RevokeAccessContext) {
  await syncSubscriptionAccess(event);
}

export async function handleSubscriptionLifecycle(event: FlatSubscriptionEvent<string>) {
  await syncSubscriptionAccess(event);
}
