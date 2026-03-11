import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Database, Json } from "@/lib/supabase/database.types";

export type CreditBalance = Database["public"]["Tables"]["credit_balances"]["Row"];
export type CreditLedgerEntry = Database["public"]["Tables"]["credit_ledger"]["Row"];

type CreditMutationInput = {
  userId: string;
  amount: number;
  kind: string;
  sourceKey: string;
  sourceType?: string | null;
  sourceId?: string | null;
  note?: string | null;
  metadata?: Json;
  createdBy?: string | null;
};

function mapCreditMutation(input: CreditMutationInput) {
  return {
    p_user_id: input.userId,
    p_amount: input.amount,
    p_kind: input.kind,
    p_source_key: input.sourceKey,
    p_source_type: input.sourceType ?? null,
    p_source_id: input.sourceId ?? null,
    p_note: input.note ?? null,
    p_metadata: input.metadata ?? {},
    p_created_by: input.createdBy ?? null,
  };
}

export async function getCreditBalance(userId: string): Promise<CreditBalance> {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("credit_balances")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch credit balance: ${error.message}`);
  }

  return data ?? {
    user_id: userId,
    balance: 0,
    lifetime_earned: 0,
    lifetime_spent: 0,
    updated_at: new Date().toISOString(),
  };
}

export async function listCreditLedger(userId: string, limit = 20): Promise<CreditLedgerEntry[]> {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("credit_ledger")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to fetch credit ledger: ${error.message}`);
  }

  return (data ?? []) as CreditLedgerEntry[];
}

export async function grantCredits(input: CreditMutationInput) {
  const admin = createSupabaseAdminClient();
  const params = mapCreditMutation(
    input
  ) as Database["public"]["Functions"]["grant_credits"]["Args"];
  const { data, error } = await admin.rpc("grant_credits", params as never);

  if (error) {
    throw new Error(`Failed to grant credits: ${error.message}`);
  }

  return (data?.[0] as CreditLedgerEntry | undefined) ?? null;
}

export async function consumeCredits(input: CreditMutationInput) {
  const admin = createSupabaseAdminClient();
  const params = mapCreditMutation(
    input
  ) as Database["public"]["Functions"]["consume_credits"]["Args"];
  const { data, error } = await admin.rpc("consume_credits", params as never);

  if (error) {
    throw new Error(`Failed to consume credits: ${error.message}`);
  }

  return (data?.[0] as CreditLedgerEntry | undefined) ?? null;
}
