import Link from "next/link";
import Image from "next/image";
import { FiArrowUpRight, FiCreditCard, FiShield, FiZap } from "react-icons/fi";
import { publicLinks } from "@/lib/site-links";

export const dynamic = "force-dynamic";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#90ddf0_0%,#b8edfb_50%,#d4f8ff_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 dotted-sea opacity-[0.08]" />
      <div className="pointer-events-none absolute left-[6%] top-20 h-32 w-32 rounded-full bg-white/55 blur-2xl" />
      <div className="pointer-events-none absolute right-[8%] top-28 h-24 w-40 rounded-full bg-[#d4e9ff]/90 blur-xl" />
      <div className="pointer-events-none absolute bottom-16 left-[14%] h-28 w-44 rounded-full bg-white/45 blur-2xl" />
      <div className="relative mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-full border-2 border-[var(--charcoal)] bg-white px-5 py-2.5 shadow-[0_4px_0_#1a1a1a]"
          >
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border-2 border-[var(--charcoal)] bg-[var(--mint)]">
              <Image src="/logo.png" alt="Echo" width={36} height={36} className="h-full w-full object-cover" />
            </div>
            <span className="font-heading text-lg font-extrabold text-[var(--charcoal)]">Echo</span>
          </Link>
          <div className="rounded-full border-2 border-[var(--charcoal)] bg-[#a6ea47] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a]">
            Supabase + Creem
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={publicLinks.pricing}
              className="rounded-full border-2 border-[var(--charcoal)] bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a] transition hover:-translate-y-0.5"
            >
              Pricing
            </Link>
            <Link
              href={publicLinks.getStarted}
              className="rounded-full border-2 border-[var(--charcoal)] bg-[#ffd66b] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a] transition hover:-translate-y-0.5"
            >
              Start Free
            </Link>
          </div>
        </div>
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="relative rounded-[2.3rem] border-3 border-[var(--charcoal)] bg-[#d4e9ff] p-8 shadow-[0_8px_0_#1a1a1a]">
            <div className="pointer-events-none absolute -left-4 top-10 h-16 w-16 rounded-full border-3 border-[var(--charcoal)] bg-white/70" />
            <div className="pointer-events-none absolute right-6 top-6 h-10 w-24 rounded-full border-3 border-[var(--charcoal)] bg-white/70" />
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
              Echo Access
            </p>
            <h1 className="mt-4 font-heading text-4xl font-extrabold leading-[0.98] text-[var(--charcoal)] sm:text-[3.25rem]">
              Secure entry.
              <br />
              Bright billing.
              <br />
              Zero dead ends.
            </h1>
            <p className="mt-4 max-w-xl text-sm font-semibold leading-relaxed text-[var(--charcoal)]/65">
              Sign in, subscribe, manage credits, and recover accounts inside the same playful Echo
              system. The public site and the protected app now share one visual language instead of
              splitting into two different products.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                {
                  icon: FiShield,
                  title: "Protected by default",
                  body: "SSR auth, server checks, webhook verification, and RLS-backed data ownership.",
                  tone: "bg-white",
                },
                {
                  icon: FiCreditCard,
                  title: "Billing-aware routes",
                  body: "Customers can subscribe, upgrade, downgrade, cancel, and open the Creem portal.",
                  tone: "bg-[#fff7cf]",
                },
                {
                  icon: FiZap,
                  title: "Credits included",
                  body: "Wallet balances, renewal top-ups, one-off packs, and usage debits already wired.",
                  tone: "bg-[#d4f8e8]",
                },
                {
                  icon: FiArrowUpRight,
                  title: "Real navigation",
                  body: "Pricing, sign-up, login, and billing entry points now route into the app.",
                  tone: "bg-[#ffd7d2]",
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className={`rounded-[1.6rem] border-3 border-[var(--charcoal)] px-4 py-4 shadow-[0_4px_0_#1a1a1a] ${item.tone}`}
                  style={{ transform: `rotate(${index % 2 === 0 ? "-1deg" : "1deg"})` }}
                >
                  <item.icon className="h-5 w-5 text-[var(--charcoal)]" />
                  <p className="mt-3 text-sm font-black text-[var(--charcoal)]">{item.title}</p>
                  <p className="mt-1 text-xs font-semibold leading-relaxed text-[var(--charcoal)]/65">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {[
                { label: "See pricing", href: publicLinks.pricing, bg: "bg-white" },
                { label: "Open billing", href: publicLinks.billing, bg: "bg-[#fff7cf]" },
                { label: "Back home", href: publicLinks.home, bg: "bg-[#d4f8e8]" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full border-2 border-[var(--charcoal)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a] transition hover:-translate-y-0.5 ${link.bg}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative px-2 pb-6 pt-4 sm:px-4">
            <div className="absolute inset-x-4 inset-y-8 rounded-[2.5rem] border-3 border-[var(--charcoal)] bg-[#ffd7d2] shadow-[0_8px_0_#1a1a1a]" />
            <div className="absolute inset-x-0 inset-y-0 rounded-[2.8rem] border-3 border-[var(--charcoal)] bg-white/40" />
            <div className="relative">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
