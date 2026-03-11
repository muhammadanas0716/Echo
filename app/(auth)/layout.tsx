import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#90ddf0_0%,#b8edfb_50%,#d4f8ff_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 dotted-sea opacity-[0.08]" />
      <div className="relative mx-auto max-w-5xl">
        <div className="mb-8 flex justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-full border-2 border-[var(--charcoal)] bg-white px-5 py-2.5 shadow-[0_4px_0_#1a1a1a]"
          >
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border-2 border-[var(--charcoal)] bg-[var(--mint)]">
              <Image src="/logo.png" alt="Support Co" width={36} height={36} className="h-full w-full object-cover" />
            </div>
            <span className="font-heading text-lg font-extrabold text-[var(--charcoal)]">Support Co</span>
          </Link>
          <div className="rounded-full border-2 border-[var(--charcoal)] bg-[#a6ea47] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a]">
            Supabase + Creem
          </div>
        </div>
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="rounded-[2rem] border-3 border-[var(--charcoal)] bg-[#d4e9ff] p-8 shadow-[0_8px_0_#1a1a1a]">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
              Starter Access
            </p>
            <h1 className="mt-4 font-heading text-4xl font-extrabold leading-[1.02] text-[var(--charcoal)]">
              Real auth flows.
              <br />
              Real billing flows.
            </h1>
            <p className="mt-4 text-sm font-semibold leading-relaxed text-[var(--charcoal)]/65">
              This starter ships with the pieces teams usually rebuild from scratch: secure auth,
              gated routes, subscription state, webhooks, credit balances, and billing management.
            </p>
            <div className="mt-8 space-y-3">
              {[
                "App Router + Server Components",
                "Google OAuth + email/password",
                "Webhook-synced subscriptions",
                "Credits wallet and top-ups",
              ].map((item, index) => (
                <div
                  key={item}
                  className="rounded-2xl border-3 border-[var(--charcoal)] bg-white px-4 py-3 shadow-[0_4px_0_#1a1a1a]"
                  style={{ transform: `rotate(${index % 2 === 0 ? "-0.8deg" : "0.8deg"})` }}
                >
                  <p className="text-sm font-bold text-[var(--charcoal)]">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
