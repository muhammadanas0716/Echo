import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Database, Json } from "@/lib/supabase/database.types";

export type WebhookEventRecord = Database["public"]["Tables"]["webhook_events"]["Row"];

export async function beginWebhookEvent(params: {
  webhookId: string;
  eventType: string;
  payload: Json;
}): Promise<{ shouldProcess: boolean; record: WebhookEventRecord | null }> {
  const admin = createSupabaseAdminClient();

  const { data, error } = await admin
    .from("webhook_events")
    .insert(
      {
        webhook_id: params.webhookId,
        event_type: params.eventType,
        payload: params.payload,
        status: "processing",
      } as never
    )
    .select("*")
    .maybeSingle();

  if (!error) {
    return { shouldProcess: true, record: data as WebhookEventRecord | null };
  }

  if (error.code !== "23505") {
    throw new Error(`Failed to begin webhook processing: ${error.message}`);
  }

  const { data: existing, error: existingError } = await admin
    .from("webhook_events")
    .select("*")
    .eq("webhook_id", params.webhookId)
    .single();

  if (existingError) {
    throw new Error(`Failed to read existing webhook event: ${existingError.message}`);
  }

  return { shouldProcess: false, record: existing as WebhookEventRecord };
}

export async function completeWebhookEvent(webhookId: string) {
  const admin = createSupabaseAdminClient();
  const { error } = await admin
    .from("webhook_events")
    .update(
      {
        status: "processed",
        processed_at: new Date().toISOString(),
        error_message: null,
      } as never
    )
    .eq("webhook_id", webhookId);

  if (error) {
    throw new Error(`Failed to mark webhook processed: ${error.message}`);
  }
}

export async function failWebhookEvent(webhookId: string, errorMessage: string) {
  const admin = createSupabaseAdminClient();
  const { error } = await admin
    .from("webhook_events")
    .update(
      {
        status: "failed",
        error_message: errorMessage,
      } as never
    )
    .eq("webhook_id", webhookId);

  if (error) {
    throw new Error(`Failed to mark webhook failed: ${error.message}`);
  }
}

export async function listWebhookEvents(limit = 50): Promise<WebhookEventRecord[]> {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("webhook_events")
    .select("*")
    .order("received_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to list webhook events: ${error.message}`);
  }

  return (data ?? []) as WebhookEventRecord[];
}
