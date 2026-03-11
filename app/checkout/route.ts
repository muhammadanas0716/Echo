import { Checkout } from "@creem_io/nextjs";
import { env } from "@/lib/env";

export const GET = Checkout({
  apiKey: env.creemApiKey ?? "",
  testMode: env.creemTestMode,
  defaultSuccessUrl: `${env.siteUrl}/dashboard?checkout=success`,
});
