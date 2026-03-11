import Link from "next/link";
import Image from "next/image";
import {
  FiArrowUpRight,
  FiCreditCard,
  FiGrid,
  FiLogOut,
  FiShield,
  FiUser,
  FiZap,
} from "react-icons/fi";
import type { AppUser } from "@/lib/db/users";
import type { AppSubscription } from "@/lib/db/subscriptions";
import type { CreditBalance } from "@/lib/db/credits";
import StatusBadge from "@/app/components/app/StatusBadge";
import { logoutAction } from "@/app/(auth)/actions";
import { publicLinks } from "@/lib/site-links";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: FiGrid, tone: "bg-[#d4e9ff]" },
  { href: "/billing", label: "Billing", icon: FiCreditCard, tone: "bg-[#fff7cf]" },
  { href: "/credits", label: "Credits", icon: FiZap, tone: "bg-[#d4f8e8]" },
  { href: "/account", label: "Account", icon: FiUser, tone: "bg-[#ffd7d2]" },
  { href: "/admin/billing", label: "Admin", icon: FiShield, tone: "bg-white" },
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
  const isEntitled = ["trialing", "active", "past_due"].includes(subscription?.status ?? "");

  return (
    <div className="dashboard-layout relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#b8edfb_0%,#d4f8ff_100%)]">
      <div className="pointer-events-none absolute left-10 top-20 h-28 w-40 rounded-full bg-white/45 blur-2xl" />
      <div className="pointer-events-none absolute right-12 top-28 h-24 w-36 rounded-full bg-[#d4e9ff]/85 blur-2xl" />
      <div className="pointer-events-none absolute bottom-10 right-[18%] h-32 w-48 rounded-full bg-white/35 blur-2xl" />
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="relative border-b-3 border-[var(--charcoal)] bg-white/90 px-5 py-6 backdrop-blur lg:border-b-0 lg:border-r-3 lg:px-6">
          <div className="pointer-events-none absolute inset-0 dotted-sea opacity-[0.06]" />
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border-3 border-[var(--charcoal)] bg-[var(--mint)] shadow-[0_4px_0_#1a1a1a]">
              <Image src="/logo.png" alt="Echo" width={48} height={48} className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="font-heading text-xl font-extrabold text-[var(--charcoal)]">Echo</p>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--charcoal)]/45">
                Starter Console
              </p>
            </div>
          </Link>

          <div className="relative mt-8 rounded-[1.9rem] border-3 border-[var(--charcoal)] bg-[#d4e9ff] p-4 shadow-[0_5px_0_#1a1a1a]">
            <div className="absolute right-4 top-4 h-10 w-20 rounded-full border-2 border-[var(--charcoal)] bg-white/60" />
            <p className="relative text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/45">
              Active Workspace
            </p>
            <p className="relative mt-2 text-sm font-bold text-[var(--charcoal)]">
              {profile.full_name || profile.email}
            </p>
            <p className="relative mt-1 text-xs font-semibold text-[var(--charcoal)]/55">{profile.email}</p>
            <div className="relative mt-4 flex flex-wrap items-center gap-2">
              <StatusBadge status={subscription?.status ?? "inactive"} />
              <span className="rounded-full border-2 border-[var(--charcoal)] bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--charcoal)] shadow-[0_2px_0_#1a1a1a]">
                {credits.balance} credits
              </span>
            </div>
            <Link
              href="/billing"
              className="relative mt-4 inline-flex items-center gap-2 rounded-full border-2 border-[var(--charcoal)] bg-[#ffd66b] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a] transition hover:-translate-y-0.5"
            >
              Manage plan
              <FiArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-[1.4rem] border-3 border-[var(--charcoal)] bg-[#fff7cf] px-3 py-3 shadow-[0_4px_0_#1a1a1a]">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--charcoal)]/45">
                Access
              </p>
              <p className="mt-1 text-sm font-black text-[var(--charcoal)]">
                {isEntitled ? "Open" : "Check billing"}
              </p>
            </div>
            <div className="rounded-[1.4rem] border-3 border-[var(--charcoal)] bg-[#d4f8e8] px-3 py-3 shadow-[0_4px_0_#1a1a1a]">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--charcoal)]/45">
                Stack
              </p>
              <p className="mt-1 text-sm font-black text-[var(--charcoal)]">SSR + Webhooks</p>
            </div>
          </div>

          <nav className="mt-8 space-y-3">
            {navItems.map((item) => {
              if (item.href === "/admin/billing" && profile.role !== "admin") return null;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-2xl border-3 border-[var(--charcoal)] px-4 py-3 font-bold text-[var(--charcoal)] shadow-[0_4px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_6px_0_#1a1a1a] ${item.tone}`}
                >
                  <item.icon className="h-4.5 w-4.5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 rounded-[1.7rem] border-3 border-[var(--charcoal)] bg-[#fffef9] p-4 shadow-[0_4px_0_#1a1a1a]">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/45">
              Quick Links
            </p>
            <div className="mt-3 space-y-2">
              {[
                { href: publicLinks.home, label: "View landing page" },
                { href: publicLinks.pricing, label: "See pricing" },
                { href: publicLinks.billing, label: "Open billing" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between rounded-2xl border-2 border-[var(--charcoal)] bg-white px-3 py-2 text-sm font-bold text-[var(--charcoal)] transition hover:-translate-y-0.5"
                >
                  <span>{item.label}</span>
                  <FiArrowUpRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

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
          <div className="relative mx-auto max-w-6xl">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <div className="rounded-full border-2 border-[var(--charcoal)] bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a]">
                Protected Workspace
              </div>
              <div className="rounded-full border-2 border-[var(--charcoal)] bg-[#d4f8e8] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a]">
                Supabase Sessions
              </div>
              <div className="rounded-full border-2 border-[var(--charcoal)] bg-[#fff7cf] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a]">
                Creem Billing
              </div>
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
