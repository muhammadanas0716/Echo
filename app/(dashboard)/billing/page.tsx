import Link from "next/link";
import MetricCard from "@/app/components/app/MetricCard";
import PortalButton from "@/app/components/app/PortalButton";
import SubmitButton from "@/app/components/app/SubmitButton";
import StatusBadge from "@/app/components/app/StatusBadge";
import { cancelSubscriptionAction, changePlanAction } from "@/app/(dashboard)/billing/actions";
import { buildCheckoutHref } from "@/lib/billing/checkout";
import { creditPacks, starterPlans } from "@/lib/billing/catalog";
import { syncSubscriptionFromCheckoutSuccess } from "@/lib/billing/sync-on-success";
import { getCurrentSubscription } from "@/lib/db/subscriptions";
import { requireViewer } from "@/lib/auth/session";
import { formatDate, titleCase } from "@/lib/formatters";

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const viewer = await requireViewer();
  const subscriptionId = typeof params.subscription_id === "string" ? params.subscription_id : null;
  const customerId = typeof params.customer_id === "string" ? params.customer_id : null;
  const message = typeof params.message === "string" ? params.message : null;
  const error = typeof params.error === "string" ? params.error : null;

  if (subscriptionId && message === "checkout-started") {
    await syncSubscriptionFromCheckoutSuccess(subscriptionId, viewer.profile.id, customerId);
    viewer.subscription = await getCurrentSubscription(viewer.profile.id);
  }

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2rem] border-3 border-[var(--charcoal)] bg-[#d4e9ff] p-6 shadow-[0_8px_0_#1a1a1a] sm:p-8">
        <div className="pointer-events-none absolute inset-0 dotted-sea opacity-[0.05]" />
        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex rounded-xl border-2 border-[var(--charcoal)] bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)] shadow-[0_2px_0_#1a1a1a]">
              Billing
            </span>
            <h1 className="mt-4 font-heading text-4xl font-extrabold text-[var(--charcoal)]">
              Manage subscriptions and credits.
            </h1>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-[var(--charcoal)]/65">
              Checkout, upgrades, downgrades, customer portal, and top-up packs.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={viewer.subscription?.status} />
            {viewer.subscription ? (
              <PortalButton className="inline-flex rounded-xl border-2 border-[var(--charcoal)] bg-white px-4 py-2.5 font-heading text-sm font-bold text-[var(--charcoal)] shadow-[0_4px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_6px_0_#1a1a1a] disabled:opacity-60">
                Open Portal
              </PortalButton>
            ) : null}
          </div>
        </div>
      </section>

      {message ? (
        <div className="rounded-2xl border-2 border-[var(--charcoal)] bg-[#d4f8e8] px-4 py-3 text-sm font-semibold text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a]">
          {message}
        </div>
      ) : null}
      {error ? (
        <div className="rounded-2xl border-2 border-[var(--charcoal)] bg-[#ffd7d2] px-4 py-3 text-sm font-semibold text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a]">
          {error}
        </div>
      ) : null}

      <section className="relative overflow-hidden rounded-[2rem] border-3 border-[var(--charcoal)] bg-[#99e8cf] p-6 shadow-[0_6px_0_#1a1a1a] sm:p-8">
        <div className="pointer-events-none absolute inset-0 dotted-sea opacity-[0.06]" />
        <div className="relative grid gap-4 md:grid-cols-3">
        <MetricCard
          label="Current Plan"
          value={titleCase(viewer.subscription?.plan_key ?? "none")}
          detail="The local subscription record mirrors Creem webhook state."
          accent="bg-white"
        />
        <MetricCard
          label={viewer.subscription?.status === "scheduled_cancel" ? "Canceling at" : "Renewal Date"}
          value={formatDate(viewer.subscription?.current_period_end)}
          detail={viewer.subscription?.status === "scheduled_cancel" ? "Access until this date." : "Scheduled cancellations preserve access until this date."}
          accent="bg-white"
        />
        <MetricCard
          label="Credits / Cycle"
          value={`${viewer.subscription?.plan_key ? starterPlans.find((plan) => plan.key === viewer.subscription?.plan_key)?.[viewer.subscription?.price_interval === "yearly" ? "yearlyCredits" : "monthlyCredits"] ?? 0 : 0}`}
          detail="Renewal webhooks auto top up the wallet."
          accent="bg-white"
        />
      </div>
      </section>

      <section className="relative overflow-hidden rounded-[2rem] border-3 border-[var(--charcoal)] bg-[#d4f8e8] p-6 shadow-[0_6px_0_#1a1a1a] sm:p-8">
        <div className="pointer-events-none absolute inset-0 dotted-sea opacity-[0.08]" />
        <div className="relative">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
          Subscriptions
        </p>
        <h2 className="mt-2 font-heading text-2xl font-extrabold text-[var(--charcoal)]">Subscription plans</h2>
        <div className="mt-6 grid gap-5 xl:grid-cols-3">
          {starterPlans.map((plan, index) => {
            const isCurrent = viewer.subscription?.plan_key === plan.key;
            const currentInterval = viewer.subscription?.price_interval === "yearly" ? "yearly" : "monthly";

            return (
              <article
                key={plan.key}
                className={`rounded-[1.9rem] border-3 border-[var(--charcoal)] p-5 shadow-[0_5px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_7px_0_#1a1a1a] ${
                  plan.popular ? "bg-[#99e8cf]" : "bg-white"
                }`}
                style={{ transform: `rotate(${index % 2 === 0 ? "-1deg" : "1deg"})` }}
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
                        className="rounded-2xl border-2 border-[var(--charcoal)] bg-white p-4 shadow-[0_3px_0_#1a1a1a]"
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
                            <span className="inline-flex rounded-xl border-2 border-[var(--charcoal)] bg-[#a6ea47] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--charcoal)] shadow-[0_2px_0_#1a1a1a]">
                              Current
                            </span>
                          ) : viewer.subscription ? (
                            <form action={changePlanAction}>
                              <input type="hidden" name="planKey" value={plan.key} />
                              <input type="hidden" name="interval" value={interval} />
                              <SubmitButton
                                className="w-full border-2 border-[var(--charcoal)] bg-white"
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
                              className="block rounded-xl border-2 border-[var(--charcoal)] bg-[#a6ea47] px-4 py-2.5 text-center font-heading text-sm font-bold text-[var(--charcoal)] shadow-[0_4px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_6px_0_#1a1a1a]"
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
                    <div key={feature} className="rounded-xl border-2 border-[var(--charcoal)] bg-white px-3 py-2 text-sm font-semibold text-[var(--charcoal)] shadow-[0_2px_0_#1a1a1a]">
                      {feature}
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[2rem] border-3 border-[var(--charcoal)] bg-[#d4e9ff] p-6 shadow-[0_6px_0_#1a1a1a] sm:p-8">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
          Portal + cancellation
        </p>
        <h2 className="mt-2 font-heading text-2xl font-extrabold text-[var(--charcoal)]">Self-serve management</h2>
        <div className="mt-5 space-y-4">
            <p className="text-sm font-semibold leading-relaxed text-[var(--charcoal)]/68">
              In-app billing entry point and Creem customer portal for payment methods, invoices, and plan management.
            </p>
            <div className="flex flex-wrap gap-3">
              <PortalButton className="inline-flex rounded-xl border-2 border-[var(--charcoal)] bg-white px-4 py-2.5 font-heading text-sm font-bold text-[var(--charcoal)] shadow-[0_4px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_6px_0_#1a1a1a] disabled:opacity-60">
                Open Customer Portal
              </PortalButton>
              {viewer.subscription ? (
                <form action={cancelSubscriptionAction}>
                  <SubmitButton
                    className="rounded-xl border-2 border-[var(--charcoal)] bg-[#ffd7d2]"
                    pendingLabel="Scheduling..."
                  >
                    Cancel At Period End
                  </SubmitButton>
                </form>
              ) : null}
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border-3 border-[var(--charcoal)] bg-[#fef3c7] p-6 shadow-[0_6px_0_#1a1a1a] sm:p-8">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
          Top-up packs
        </p>
        <h2 className="mt-2 font-heading text-2xl font-extrabold text-[var(--charcoal)]">Credit top-up packs</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {creditPacks.map((pack, index) => (
              <article
                key={pack.key}
                className="rounded-[1.4rem] border-3 border-[var(--charcoal)] bg-white p-4 shadow-[0_4px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_6px_0_#1a1a1a]"
                style={{ transform: `rotate(${index % 2 === 0 ? "-1deg" : "1deg"})` }}
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
                    className="mt-4 block rounded-xl border-2 border-[var(--charcoal)] bg-white px-4 py-2.5 text-center font-heading text-sm font-bold text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_5px_0_#1a1a1a]"
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
        </section>
      </div>
    </div>
  );
}
