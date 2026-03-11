import AppShell from "@/app/components/app/AppShell";
import { requireViewer } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const viewer = await requireViewer();

  return (
    <AppShell profile={viewer.profile} subscription={viewer.subscription} credits={viewer.credits}>
      {children}
    </AppShell>
  );
}
