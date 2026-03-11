import Link from "next/link";
import MetricCard from "@/app/components/app/MetricCard";
import SectionCard from "@/app/components/app/SectionCard";
import SubmitButton from "@/app/components/app/SubmitButton";
import { runSampleCreditAction } from "@/app/(dashboard)/credits/actions";
import { buildCheckoutHref } from "@/lib/billing/checkout";
import { creditPacks } from "@/lib/billing/catalog";
import { requireEntitledViewer } from "@/lib/auth/session";
import { listCreditLedger } from "@/lib/db/credits";
import { formatDateTime, titleCase } from "@/lib/formatters";
import { starterConfig } from "@/lib/starter/config";

export default async function CreditsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const viewer = await requireEntitledViewer();
  const ledger = await listCreditLedger(viewer.profile.id, 20);
  const message = typeof params.message === "string" ? params.message : null;
  const error = typeof params.error === "string" ? params.error : null;

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border-3 border-[var(--charcoal)] bg-white p-6 shadow-[0_8px_0_#1a1a1a] sm:p-8">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
          Credits
        </p>
        <h1 className="mt-3 font-heading text-4xl font-extrabold text-[var(--charcoal)]">
          Wallet, top-ups, and usage debits.
        </h1>
        <p className="mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-[var(--charcoal)]/65">
          The starter ships with a balance cache, append-only ledger, purchase top-ups, renewal grants, and atomic debit operations.
        </p>
      </div>

      {message ? (
        <div className="rounded-2xl border-2 border-[var(--charcoal)] bg-[#d4f8e8] px-4 py-3 text-sm font-semibold text-[var(--charcoal)]">
          {message}
        </div>
      ) : null}
      {error ? (
        <div className="rounded-2xl border-2 border-[var(--charcoal)] bg-[#ffd7d2] px-4 py-3 text-sm font-semibold text-[var(--charcoal)]">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          label="Available Credits"
          value={`${viewer.credits.balance}`}
          detail="Fast reads come from the cached balance table."
          accent="bg-[#d4e9ff]"
        />
        <MetricCard
          label="Lifetime Earned"
          value={`${viewer.credits.lifetime_earned}`}
          detail="Includes activation grants, renewals, and top-up packs."
          accent="bg-[#fef3c7]"
        />
        <MetricCard
          label="Sample Action Cost"
          value={`${starterConfig.dashboard.sampleCreditCost}`}
          detail="Shows how to wire usage-based debits into app actions."
          accent="bg-[#d4f8e8]"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.88fr_1.12fr]">
        <SectionCard title="Spend credits on app actions" eyebrow="Usage debits" accent="bg-[#d4e9ff]">
          <p className="text-sm font-semibold leading-relaxed text-[var(--charcoal)]/68">
            This sample action consumes credits through a server-side helper and writes a ledger entry atomically.
          </p>
          <form action={runSampleCreditAction} className="mt-5">
            <SubmitButton
              className="bg-[#a6ea47] hover:-translate-y-0.5 hover:bg-[var(--mint)] hover:shadow-[0_6px_0_#1a1a1a]"
              pendingLabel="Running..."
            >
              {starterConfig.dashboard.sampleActionLabel}
            </SubmitButton>
          </form>

          <div className="mt-6 space-y-3">
            {creditPacks.map((pack) => (
              <Link
                key={pack.key}
                href={
                  pack.productId
                    ? buildCheckoutHref({
                        productId: pack.productId,
                        referenceId: viewer.profile.id,
                        email: viewer.profile.email,
                        successPath: "/credits?message=topup-started",
                        metadata: {
                          intent: "topup",
                          packKey: pack.key,
                        },
                      })
                    : "/billing"
                }
                className="flex items-center justify-between gap-3 rounded-2xl border-3 border-[var(--charcoal)] bg-white px-4 py-3 shadow-[0_4px_0_#1a1a1a]"
              >
                <div>
                  <p className="font-heading text-lg font-extrabold text-[var(--charcoal)]">{pack.name}</p>
                  <p className="text-xs font-semibold text-[var(--charcoal)]/55">{pack.credits} credits</p>
                </div>
                <span className="text-sm font-black text-[var(--charcoal)]">{pack.priceLabel}</span>
              </Link>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Credit ledger" eyebrow="Audit trail">
          <div className="space-y-3">
            {ledger.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between gap-3 rounded-2xl border-2 border-[var(--charcoal)] bg-[var(--offwhite)] px-4 py-3"
              >
                <div>
                  <p className="text-sm font-bold text-[var(--charcoal)]">{titleCase(entry.kind)}</p>
                  <p className="text-xs font-semibold text-[var(--charcoal)]/55">
                    {formatDateTime(entry.created_at)}
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
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
