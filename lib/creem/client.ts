import { createCreem } from "creem_io";
import { env } from "@/lib/env";

let creemClient: ReturnType<typeof createCreem> | null = null;

export function getCreemClient() {
  if (!env.creemApiKey) {
    throw new Error("Creem API key is not configured.");
  }

  if (!creemClient) {
    creemClient = createCreem({
      apiKey: env.creemApiKey,
      webhookSecret: env.creemWebhookSecret,
      testMode: env.creemTestMode,
    });
  }

  return creemClient;
}
