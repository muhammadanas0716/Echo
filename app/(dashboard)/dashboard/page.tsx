import Link from "next/link";
import MetricCard from "@/app/components/app/MetricCard";
import SectionCard from "@/app/components/app/SectionCard";
import StatusBadge from "@/app/components/app/StatusBadge";
import { requireEntitledViewer } from "@/lib/auth/session";
import { listCreditLedger } from "@/lib/db/credits";
import { formatDate, titleCase } from "@/lib/formatters";

export default async function DashboardPage() {
  const viewer = await requireEntitledViewer();
  const ledger = await listCreditLedger(viewer.profile.id, 5);

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border-3 border-[var(--charcoal)] bg-white p-6 shadow-[0_8px_0_#1a1a1a] sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
              Dashboard
            </p>
            <h1 className="mt-3 font-heading text-4xl font-extrabold text-[var(--charcoal)]">
              Subscription-backed workspace.
            </h1>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-[var(--charcoal)]/65">
              This is the protected customer area buyers get with the starter: auth-aware, subscription-aware, and already connected to a credits ledger.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={viewer.subscription?.status} />
            <Link
              href="/billing"
              className="rounded-xl border-3 border-[var(--charcoal)] bg-[#a6ea47] px-4 py-2.5 font-heading text-sm font-bold text-[var(--charcoal)] shadow-[0_4px_0_#1a1a1a]"
            >
              Manage Billing
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Current Plan"
          value={titleCase(viewer.subscription?.plan_key ?? "starter")}
          detail="Config-driven plan catalog from Creem product IDs."
          accent="bg-[#d4e9ff]"
        />
        <MetricCard
          label="Subscription Status"
          value={titleCase(viewer.subscription?.status ?? "inactive")}
          detail="Protected routes stay open while the subscription is entitled."
          accent="bg-[#fef3c7]"
        />
        <MetricCard
          label="Credits Balance"
          value={`${viewer.credits.balance}`}
          detail="Backed by an append-only credit ledger plus balance cache."
          accent="bg-[#d4f8e8]"
        />
        <MetricCard
          label="Next Renewal"
          value={formatDate(viewer.subscription?.current_period_end)}
          detail="Webhook sync updates this after renewals, upgrades, and cancellations."
          accent="bg-[#ffd7d2]"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <SectionCard title="Recent credit activity" eyebrow="Ledger">
          <div className="space-y-3">
            {ledger.length === 0 ? (
              <p className="text-sm font-semibold text-[var(--charcoal)]/60">
                No credit activity yet.
              </p>
            ) : (
              ledger.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border-2 border-[var(--charcoal)] bg-[var(--offwhite)] px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-bold text-[var(--charcoal)]">{titleCase(entry.kind)}</p>
                    <p className="text-xs font-semibold text-[var(--charcoal)]/55">
                      {formatDate(entry.created_at)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-black ${entry.amount >= 0 ? "text-[#2a7f17]" : "text-[var(--coral)]"}`}>
                      {entry.amount >= 0 ? "+" : ""}
                      {entry.amount}
                    </p>
                    <p className="text-xs font-semibold text-[var(--charcoal)]/55">
                      Balance {entry.balance_after}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </SectionCard>

        <SectionCard title="Starter modules included" eyebrow="What this demonstrates" accent="bg-[#d4e9ff]">
          <div className="space-y-3">
            {[
              "Supabase SSR auth in App Router",
              "Creem checkout and portal flows",
              "Webhook-driven entitlement sync",
              "Credits wallet and usage debits",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border-2 border-[var(--charcoal)] bg-white px-4 py-3 text-sm font-bold text-[var(--charcoal)]"
              >
                {item}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
