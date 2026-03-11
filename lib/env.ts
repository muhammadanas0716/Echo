import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  CREEM_API_KEY: z.string().optional(),
  CREEM_WEBHOOK_SECRET: z.string().optional(),
  NEXT_PUBLIC_CREEM_TEST_MODE: z.string().optional(),
  NEXT_PUBLIC_CREEM_STARTER_MONTHLY_PRODUCT_ID: z.string().optional(),
  NEXT_PUBLIC_CREEM_STARTER_YEARLY_PRODUCT_ID: z.string().optional(),
  NEXT_PUBLIC_CREEM_PRO_MONTHLY_PRODUCT_ID: z.string().optional(),
  NEXT_PUBLIC_CREEM_PRO_YEARLY_PRODUCT_ID: z.string().optional(),
  NEXT_PUBLIC_CREEM_SCALE_MONTHLY_PRODUCT_ID: z.string().optional(),
  NEXT_PUBLIC_CREEM_SCALE_YEARLY_PRODUCT_ID: z.string().optional(),
  NEXT_PUBLIC_CREEM_CREDITS_SMALL_PRODUCT_ID: z.string().optional(),
  NEXT_PUBLIC_CREEM_CREDITS_MEDIUM_PRODUCT_ID: z.string().optional(),
  NEXT_PUBLIC_CREEM_CREDITS_LARGE_PRODUCT_ID: z.string().optional(),
  ADMIN_EMAILS: z.string().optional(),
});

const parsedEnv = envSchema.parse(process.env);

function toBoolean(value?: string) {
  return value === "true";
}

function splitCsv(value?: string) {
  return value
    ?.split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean) ?? [];
}

export const env = {
  siteUrl:
    parsedEnv.NEXT_PUBLIC_SITE_URL?.trim() ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:4000"),
  supabaseUrl: parsedEnv.NEXT_PUBLIC_SUPABASE_URL?.trim(),
  supabaseAnonKey: parsedEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim(),
  supabaseServiceRoleKey: parsedEnv.SUPABASE_SERVICE_ROLE_KEY?.trim(),
  creemApiKey: parsedEnv.CREEM_API_KEY?.trim(),
  creemWebhookSecret: parsedEnv.CREEM_WEBHOOK_SECRET?.trim(),
  creemTestMode: toBoolean(parsedEnv.NEXT_PUBLIC_CREEM_TEST_MODE),
  adminEmails: splitCsv(parsedEnv.ADMIN_EMAILS),
  products: {
    starter: {
      monthly: parsedEnv.NEXT_PUBLIC_CREEM_STARTER_MONTHLY_PRODUCT_ID?.trim(),
      yearly: parsedEnv.NEXT_PUBLIC_CREEM_STARTER_YEARLY_PRODUCT_ID?.trim(),
    },
    pro: {
      monthly: parsedEnv.NEXT_PUBLIC_CREEM_PRO_MONTHLY_PRODUCT_ID?.trim(),
      yearly: parsedEnv.NEXT_PUBLIC_CREEM_PRO_YEARLY_PRODUCT_ID?.trim(),
    },
    scale: {
      monthly: parsedEnv.NEXT_PUBLIC_CREEM_SCALE_MONTHLY_PRODUCT_ID?.trim(),
      yearly: parsedEnv.NEXT_PUBLIC_CREEM_SCALE_YEARLY_PRODUCT_ID?.trim(),
    },
  },
  topups: {
    small: parsedEnv.NEXT_PUBLIC_CREEM_CREDITS_SMALL_PRODUCT_ID?.trim(),
    medium: parsedEnv.NEXT_PUBLIC_CREEM_CREDITS_MEDIUM_PRODUCT_ID?.trim(),
    large: parsedEnv.NEXT_PUBLIC_CREEM_CREDITS_LARGE_PRODUCT_ID?.trim(),
  },
};

export function requireServerEnv(name: keyof typeof env) {
  const value = env[name];
  if (value) return value;
  throw new Error(`Missing required environment variable: ${name}`);
}

export function isSupabaseConfigured() {
  return Boolean(env.supabaseUrl && env.supabaseAnonKey);
}

export function isSupabaseAdminConfigured() {
  return Boolean(env.supabaseUrl && env.supabaseServiceRoleKey);
}

export function isCreemConfigured() {
  return Boolean(env.creemApiKey);
}
