import { NextRequest, NextResponse } from "next/server";
import { getCreemClient } from "@/lib/creem/client";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ensureAppUser } from "@/lib/db/users";
import { getCurrentSubscription } from "@/lib/db/subscriptions";

export async function GET(request: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await ensureAppUser(user);
  const subscription = await getCurrentSubscription(user.id);
  const customerId = profile.creem_customer_id ?? subscription?.creem_customer_id;

  if (!customerId) {
    return NextResponse.json({ error: "No customer" }, { status: 400 });
  }

  const creem = getCreemClient();
  const portal = await creem.customers.createPortal({ customerId });

  if (!portal.customerPortalLink) {
    return NextResponse.json({ error: "Portal unavailable" }, { status: 500 });
  }

  return NextResponse.json({ url: portal.customerPortalLink });
}
