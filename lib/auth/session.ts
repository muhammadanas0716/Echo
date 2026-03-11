import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ensureAppUser } from "@/lib/db/users";
import { getCurrentSubscription, hasActiveEntitlement } from "@/lib/db/subscriptions";
import { getCreditBalance } from "@/lib/db/credits";

export async function getViewer() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const profile = await ensureAppUser(user);
  const [subscription, credits] = await Promise.all([
    getCurrentSubscription(user.id),
    getCreditBalance(user.id),
  ]);

  return {
    authUser: user,
    profile,
    subscription,
    credits,
    entitled: hasActiveEntitlement(subscription?.status),
  };
}

export type Viewer = NonNullable<Awaited<ReturnType<typeof getViewer>>>;

export async function requireViewer(): Promise<Viewer> {
  const viewer = await getViewer();
  if (!viewer) {
    redirect("/login");
  }
  return viewer;
}

export async function requireEntitledViewer(): Promise<Viewer> {
  const viewer = await requireViewer();
  if (!viewer.entitled) {
    redirect("/billing?reason=subscription-required");
  }
  return viewer;
}

export async function requireAdminViewer(): Promise<Viewer> {
  const viewer = await requireViewer();
  if (viewer.profile.role !== "admin") {
    redirect("/dashboard");
  }
  return viewer;
}
