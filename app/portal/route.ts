import { NextRequest, NextResponse } from "next/server";
import { getCreemClient } from "@/lib/creem/client";
import { env } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ensureAppUser } from "@/lib/db/users";
import { getCurrentSubscription } from "@/lib/db/subscriptions";

function createAppUrl(request: NextRequest, path: string) {
  const baseUrl = env.siteUrl || request.nextUrl.origin;
  return new URL(path, baseUrl);
}

export async function GET(request: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(createAppUrl(request, "/login"));
  }

  const profile = await ensureAppUser(user);
  const subscription = await getCurrentSubscription(user.id);
  const customerId = profile.creem_customer_id ?? subscription?.creem_customer_id;

  if (!customerId) {
    return NextResponse.redirect(createAppUrl(request, "/billing?error=no-customer"));
  }

  const creem = getCreemClient();
  const portal = await creem.customers.createPortal({ customerId });

  if (!portal.customerPortalLink) {
    return NextResponse.redirect(createAppUrl(request, "/billing?error=portal-unavailable"));
  }

  return NextResponse.redirect(portal.customerPortalLink);
}
