import Link from "next/link";
import Image from "next/image";
import { FiCreditCard, FiGrid, FiLogOut, FiShield, FiUser, FiZap } from "react-icons/fi";
import type { AppUser } from "@/lib/db/users";
import type { AppSubscription } from "@/lib/db/subscriptions";
import type { CreditBalance } from "@/lib/db/credits";
import StatusBadge from "@/app/components/app/StatusBadge";
import { logoutAction } from "@/app/(auth)/actions";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: FiGrid },
  { href: "/billing", label: "Billing", icon: FiCreditCard },
  { href: "/credits", label: "Credits", icon: FiZap },
  { href: "/account", label: "Account", icon: FiUser },
  { href: "/admin/billing", label: "Admin", icon: FiShield },
];

type AppShellProps = {
  profile: AppUser;
  subscription: AppSubscription | null;
  credits: CreditBalance;
  children: React.ReactNode;
};

export default function AppShell({
  profile,
  subscription,
  credits,
  children,
}: AppShellProps) {
  return (
    <div className="dashboard-layout min-h-screen bg-[linear-gradient(180deg,#b8edfb_0%,#d4f8ff_100%)]">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-b-3 border-[var(--charcoal)] bg-white px-5 py-6 lg:border-b-0 lg:border-r-3 lg:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border-3 border-[var(--charcoal)] bg-[var(--mint)] shadow-[0_4px_0_#1a1a1a]">
              <Image src="/logo.png" alt="Support Co" width={48} height={48} className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="font-heading text-xl font-extrabold text-[var(--charcoal)]">Support Co</p>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--charcoal)]/45">
                Starter Console
              </p>
            </div>
          </Link>

          <div className="mt-8 rounded-[1.5rem] border-3 border-[var(--charcoal)] bg-[#d4e9ff] p-4 shadow-[0_5px_0_#1a1a1a]">
            <p className="text-sm font-bold text-[var(--charcoal)]">{profile.full_name || profile.email}</p>
            <p className="mt-1 text-xs font-semibold text-[var(--charcoal)]/55">{profile.email}</p>
            <div className="mt-3 flex items-center gap-2">
              <StatusBadge status={subscription?.status ?? "inactive"} />
              <span className="text-xs font-bold text-[var(--charcoal)]/55">{credits.balance} credits</span>
            </div>
          </div>

          <nav className="mt-8 space-y-3">
            {navItems.map((item) => {
              if (item.href === "/admin/billing" && profile.role !== "admin") return null;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-2xl border-3 border-[var(--charcoal)] bg-[var(--offwhite)] px-4 py-3 font-bold text-[var(--charcoal)] shadow-[0_4px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:bg-[var(--mint)] hover:shadow-[0_6px_0_#1a1a1a]"
                >
                  <item.icon className="h-4.5 w-4.5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <form action={logoutAction} className="mt-8">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl border-3 border-[var(--charcoal)] bg-[#ffd7d2] px-4 py-3 font-bold text-[var(--charcoal)] shadow-[0_4px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_6px_0_#1a1a1a]"
            >
              <FiLogOut className="h-4.5 w-4.5" />
              Log Out
            </button>
          </form>
        </aside>

        <main className="relative px-4 py-6 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0 dotted-sea opacity-[0.08]" />
          <div className="relative mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
