import Link from "next/link";
import MetricCard from "@/app/components/app/MetricCard";
import SectionCard from "@/app/components/app/SectionCard";
import SubmitButton from "@/app/components/app/SubmitButton";
import StatusBadge from "@/app/components/app/StatusBadge";
import { cancelSubscriptionAction, changePlanAction } from "@/app/(dashboard)/billing/actions";
import { buildCheckoutHref } from "@/lib/billing/checkout";
import { creditPacks, starterPlans } from "@/lib/billing/catalog";
import { requireViewer } from "@/lib/auth/session";
import { formatDate, titleCase } from "@/lib/formatters";

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const viewer = await requireViewer();
  const message = typeof params.message === "string" ? params.message : null;
  const error = typeof params.error === "string" ? params.error : null;

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border-3 border-[var(--charcoal)] bg-white p-6 shadow-[0_8px_0_#1a1a1a] sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
              Billing
            </p>
            <h1 className="mt-3 font-heading text-4xl font-extrabold text-[var(--charcoal)]">
              Manage subscriptions and credits.
            </h1>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-[var(--charcoal)]/65">
              This page shows the full starter surface: checkout, upgrades, downgrades, scheduled cancellation, customer portal, and top-up packs.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={viewer.subscription?.status} />
            {viewer.subscription ? (
              <Link
                href="/portal"
                className="rounded-xl border-3 border-[var(--charcoal)] bg-[#d4e9ff] px-4 py-2.5 font-heading text-sm font-bold text-[var(--charcoal)] shadow-[0_4px_0_#1a1a1a]"
              >
                Open Portal
              </Link>
            ) : null}
          </div>
        </div>
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
          label="Current Plan"
          value={titleCase(viewer.subscription?.plan_key ?? "none")}
          detail="The local subscription record mirrors Creem webhook state."
          accent="bg-[#d4e9ff]"
        />
        <MetricCard
          label="Renewal Date"
          value={formatDate(viewer.subscription?.current_period_end)}
          detail="Scheduled cancellations preserve access until this date."
          accent="bg-[#fef3c7]"
        />
        <MetricCard
          label="Credits / Cycle"
          value={`${viewer.subscription?.plan_key ? starterPlans.find((plan) => plan.key === viewer.subscription?.plan_key)?.[viewer.subscription?.price_interval === "yearly" ? "yearlyCredits" : "monthlyCredits"] ?? 0 : 0}`}
          detail="Renewal webhooks auto top up the wallet."
          accent="bg-[#d4f8e8]"
        />
      </div>

      <SectionCard title="Subscription plans" eyebrow="Config-driven catalog">
        <div className="grid gap-5 xl:grid-cols-3">
          {starterPlans.map((plan) => {
            const isCurrent = viewer.subscription?.plan_key === plan.key;
            const currentInterval = viewer.subscription?.price_interval === "yearly" ? "yearly" : "monthly";

            return (
              <article
                key={plan.key}
                className={`rounded-[1.8rem] border-3 border-[var(--charcoal)] p-5 shadow-[0_6px_0_#1a1a1a] ${
                  plan.popular ? "bg-[#99e8cf]" : "bg-white"
                }`}
              >
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
                  {plan.tagline}
                </p>
                <h2 className="mt-2 font-heading text-2xl font-extrabold text-[var(--charcoal)]">
                  {plan.name}
                </h2>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-[var(--charcoal)]/65">
                  {plan.description}
                </p>
                <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-1">
                  {(["monthly", "yearly"] as const).map((interval) => {
                    const productId = interval === "monthly" ? plan.monthlyProductId : plan.yearlyProductId;
                    const isSelected = isCurrent && currentInterval === interval;

                    return (
                      <div
                        key={interval}
                        className="rounded-2xl border-2 border-[var(--charcoal)] bg-[var(--offwhite)] p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-heading text-xl font-extrabold text-[var(--charcoal)]">
                              {interval === "monthly" ? plan.monthlyPriceLabel : plan.yearlyPriceLabel}
                            </p>
                            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--charcoal)]/45">
                              {interval}
                            </p>
                          </div>
                          <p className="text-sm font-black text-[var(--charcoal)]">
                            {interval === "monthly" ? plan.monthlyCredits : plan.yearlyCredits} credits
                          </p>
                        </div>
                        <div className="mt-4">
                          {!productId ? (
                            <p className="text-xs font-bold text-[var(--coral)]">
                              Add product ID env vars to enable this option.
                            </p>
                          ) : isSelected ? (
                            <span className="inline-flex rounded-full border-2 border-[var(--charcoal)] bg-[#a6ea47] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]">
                              Current
                            </span>
                          ) : viewer.subscription ? (
                            <form action={changePlanAction}>
                              <input type="hidden" name="planKey" value={plan.key} />
                              <input type="hidden" name="interval" value={interval} />
                              <SubmitButton
                                className="w-full bg-white hover:-translate-y-0.5 hover:bg-[#d4e9ff] hover:shadow-[0_6px_0_#1a1a1a]"
                                pendingLabel="Updating..."
                              >
                                Switch Plan
                              </SubmitButton>
                            </form>
                          ) : (
                            <Link
                              href={buildCheckoutHref({
                                productId,
                                referenceId: viewer.profile.id,
                                email: viewer.profile.email,
                                successPath: "/billing?message=checkout-started",
                                metadata: {
                                  intent: "subscription",
                                  planKey: plan.key,
                                  interval,
                                },
                              })}
                              className="block rounded-xl border-2 border-[var(--charcoal)] bg-[#a6ea47] px-4 py-2.5 text-center font-heading text-sm font-bold text-[var(--charcoal)] shadow-[0_4px_0_#1a1a1a]"
                            >
                              Subscribe
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 space-y-2">
                  {plan.features.map((feature) => (
                    <div key={feature} className="rounded-xl border-2 border-[var(--charcoal)] bg-white px-3 py-2 text-sm font-semibold text-[var(--charcoal)]">
                      {feature}
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <SectionCard title="Self-serve management" eyebrow="Portal + cancellation" accent="bg-[#d4e9ff]">
          <div className="space-y-4">
            <p className="text-sm font-semibold leading-relaxed text-[var(--charcoal)]/68">
              The starter includes an in-app billing entry point and a Creem customer portal fallback for payment methods, invoices, and edge-case plan management.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/portal"
                className="rounded-xl border-3 border-[var(--charcoal)] bg-white px-4 py-2.5 font-heading text-sm font-bold text-[var(--charcoal)] shadow-[0_4px_0_#1a1a1a]"
              >
                Open Customer Portal
              </Link>
              {viewer.subscription ? (
                <form action={cancelSubscriptionAction}>
                  <SubmitButton
                    className="bg-[#ffd7d2] hover:-translate-y-0.5 hover:shadow-[0_6px_0_#1a1a1a]"
                    pendingLabel="Scheduling..."
                  >
                    Cancel At Period End
                  </SubmitButton>
                </form>
              ) : null}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Credit top-up packs" eyebrow="Optional billing strategy">
          <div className="grid gap-4 md:grid-cols-3">
            {creditPacks.map((pack) => (
              <article
                key={pack.key}
                className="rounded-[1.5rem] border-3 border-[var(--charcoal)] bg-[#fef3c7] p-4 shadow-[0_5px_0_#1a1a1a]"
              >
                <p className="font-heading text-xl font-extrabold text-[var(--charcoal)]">{pack.name}</p>
                <p className="mt-1 text-sm font-semibold text-[var(--charcoal)]/65">{pack.description}</p>
                <p className="mt-4 font-heading text-3xl font-black text-[var(--charcoal)]">
                  {pack.credits}
                </p>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--charcoal)]/45">
                  Credits
                </p>
                <p className="mt-4 text-lg font-black text-[var(--charcoal)]">{pack.priceLabel}</p>
                {pack.productId ? (
                  <Link
                    href={buildCheckoutHref({
                      productId: pack.productId,
                      referenceId: viewer.profile.id,
                      email: viewer.profile.email,
                      successPath: "/credits?message=topup-started",
                      metadata: {
                        intent: "topup",
                        packKey: pack.key,
                      },
                    })}
                    className="mt-4 block rounded-xl border-2 border-[var(--charcoal)] bg-white px-4 py-2.5 text-center font-heading text-sm font-bold text-[var(--charcoal)] shadow-[0_4px_0_#1a1a1a]"
                  >
                    Buy Top-up
                  </Link>
                ) : (
                  <p className="mt-4 text-xs font-bold text-[var(--coral)]">
                    Add the product ID env var to enable this pack.
                  </p>
                )}
              </article>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
