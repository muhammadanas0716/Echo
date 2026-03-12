import { Webhook } from "@creem_io/nextjs";
import { env } from "@/lib/env";
import { beginWebhookEvent, completeWebhookEvent, failWebhookEvent } from "@/lib/db/webhooks";

function dateToIso(d: Date | string | number | null | undefined): string {
  if (d == null) return "";
  if (typeof d === "string") return d;
  if (typeof d === "number") return new Date(d).toISOString();
  return d instanceof Date ? d.toISOString() : "";
}
import {
  handleCheckoutCompleted,
  handleGrantAccess,
  handleRevokeAccess,
  handleSubscriptionLifecycle,
} from "@/lib/creem/webhook-handlers";

async function withWebhookProcessing(
  event: {
    processingKey: string;
    eventType: string;
    payload: unknown;
  },
  work: () => Promise<void>
) {
  const payload = JSON.parse(JSON.stringify(event.payload));
  const begin = await beginWebhookEvent({
    webhookId: event.processingKey,
    eventType: event.eventType,
    payload,
  });

  if (!begin.shouldProcess && begin.record?.status === "processed") {
    return;
  }

  try {
    await work();
    await completeWebhookEvent(event.processingKey);
  } catch (error) {
    await failWebhookEvent(
      event.processingKey,
      error instanceof Error ? error.message : "Unknown webhook failure"
    );
    throw error;
  }
}

export const POST = Webhook({
  webhookSecret: env.creemWebhookSecret ?? "",
  onCheckoutCompleted: async (event) =>
    withWebhookProcessing(
      {
        processingKey: `${event.webhookId}:${event.webhookEventType}`,
        eventType: event.webhookEventType,
        payload: event,
      },
      () => handleCheckoutCompleted(event)
    ),
  onGrantAccess: async (event) =>
    withWebhookProcessing(
      {
        processingKey: `grant:${event.reason}:${event.id}:${event.last_transaction_id ?? dateToIso(event.current_period_end_date)}`,
        eventType: `grant:${event.reason}`,
        payload: event,
      },
      () => handleGrantAccess(event)
    ),
  onRevokeAccess: async (event) =>
    withWebhookProcessing(
      {
        processingKey: `revoke:${event.reason}:${event.id}:${dateToIso(event.current_period_end_date)}`,
        eventType: `revoke:${event.reason}`,
        payload: event,
      },
      () => handleRevokeAccess(event)
    ),
  onSubscriptionActive: async (event) =>
    withWebhookProcessing(
      {
        processingKey: `${event.webhookId}:${event.webhookEventType}`,
        eventType: event.webhookEventType,
        payload: event,
      },
      () => handleSubscriptionLifecycle(event)
    ),
  onSubscriptionTrialing: async (event) =>
    withWebhookProcessing(
      {
        processingKey: `${event.webhookId}:${event.webhookEventType}`,
        eventType: event.webhookEventType,
        payload: event,
      },
      () => handleSubscriptionLifecycle(event)
    ),
  onSubscriptionPaid: async (event) =>
    withWebhookProcessing(
      {
        processingKey: `${event.webhookId}:${event.webhookEventType}`,
        eventType: event.webhookEventType,
        payload: event,
      },
      () => handleSubscriptionLifecycle(event)
    ),
  onSubscriptionPastDue: async (event) =>
    withWebhookProcessing(
      {
        processingKey: `${event.webhookId}:${event.webhookEventType}`,
        eventType: event.webhookEventType,
        payload: event,
      },
      () => handleSubscriptionLifecycle(event)
    ),
  onSubscriptionPaused: async (event) =>
    withWebhookProcessing(
      {
        processingKey: `${event.webhookId}:${event.webhookEventType}`,
        eventType: event.webhookEventType,
        payload: event,
      },
      () => handleSubscriptionLifecycle(event)
    ),
  onSubscriptionUnpaid: async (event) =>
    withWebhookProcessing(
      {
        processingKey: `${event.webhookId}:${event.webhookEventType}`,
        eventType: event.webhookEventType,
        payload: event,
      },
      () => handleSubscriptionLifecycle(event)
    ),
  onSubscriptionUpdate: async (event) =>
    withWebhookProcessing(
      {
        processingKey: `${event.webhookId}:${event.webhookEventType}`,
        eventType: event.webhookEventType,
        payload: event,
      },
      () => handleSubscriptionLifecycle(event)
    ),
  onSubscriptionCanceled: async (event) =>
    withWebhookProcessing(
      {
        processingKey: `${event.webhookId}:${event.webhookEventType}`,
        eventType: event.webhookEventType,
        payload: event,
      },
      () => handleSubscriptionLifecycle(event)
    ),
  onSubscriptionExpired: async (event) =>
    withWebhookProcessing(
      {
        processingKey: `${event.webhookId}:${event.webhookEventType}`,
        eventType: event.webhookEventType,
        payload: event,
      },
      () => handleSubscriptionLifecycle(event)
    ),
});
