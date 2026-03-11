import SectionCard from "@/app/components/app/SectionCard";
import SubmitButton from "@/app/components/app/SubmitButton";
import FormField from "@/app/components/ui/FormField";
import { adjustCreditsAction } from "@/app/(dashboard)/admin/billing/actions";
import { requireAdminViewer } from "@/lib/auth/session";
import { listRecentSubscriptions } from "@/lib/db/subscriptions";
import { listWebhookEvents } from "@/lib/db/webhooks";
import { formatDateTime, titleCase } from "@/lib/formatters";

export default async function AdminBillingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  await requireAdminViewer();
  const [events, subscriptions] = await Promise.all([
    listWebhookEvents(25),
    listRecentSubscriptions(20),
  ]);
  const message = typeof params.message === "string" ? params.message : null;
  const error = typeof params.error === "string" ? params.error : null;

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border-3 border-[var(--charcoal)] bg-white p-6 shadow-[0_8px_0_#1a1a1a] sm:p-8">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
          Admin Billing
        </p>
        <h1 className="mt-3 font-heading text-4xl font-extrabold text-[var(--charcoal)]">
          Webhook visibility and manual ops.
        </h1>
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

      <div className="grid gap-6 xl:grid-cols-[0.88fr_1.12fr]">
        <SectionCard title="Manual credit adjustment" eyebrow="Admin only" accent="bg-[#d4e9ff]">
          <form action={adjustCreditsAction} className="space-y-4">
            <FormField label="User email" required>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-2xl border-2 border-[var(--charcoal)] bg-white px-4 py-3 font-semibold text-[var(--charcoal)] outline-none"
              />
            </FormField>
            <FormField label="Amount" required hint="Use a negative value to consume credits.">
              <input
                type="number"
                name="amount"
                required
                className="w-full rounded-2xl border-2 border-[var(--charcoal)] bg-white px-4 py-3 font-semibold text-[var(--charcoal)] outline-none"
              />
            </FormField>
            <FormField label="Note">
              <textarea
                name="note"
                rows={3}
                className="w-full rounded-2xl border-2 border-[var(--charcoal)] bg-white px-4 py-3 font-semibold text-[var(--charcoal)] outline-none"
              />
            </FormField>
            <SubmitButton
              className="bg-[#a6ea47] hover:-translate-y-0.5 hover:bg-[var(--mint)] hover:shadow-[0_6px_0_#1a1a1a]"
              pendingLabel="Applying..."
            >
              Apply Adjustment
            </SubmitButton>
          </form>
        </SectionCard>

        <SectionCard title="Latest webhook events" eyebrow="Replay-safe audit trail">
          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="rounded-2xl border-2 border-[var(--charcoal)] bg-[var(--offwhite)] px-4 py-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-bold text-[var(--charcoal)]">{event.event_type}</p>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--charcoal)]/45">
                    {event.status}
                  </p>
                </div>
                <p className="mt-1 text-xs font-semibold text-[var(--charcoal)]/55">
                  {formatDateTime(event.received_at)}
                </p>
                {event.error_message ? (
                  <p className="mt-2 text-xs font-semibold text-[var(--coral)]">{event.error_message}</p>
                ) : null}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Recent subscriptions" eyebrow="Synced locally">
        <div className="grid gap-3 md:grid-cols-2">
          {subscriptions.map((subscription) => (
            <div
              key={subscription.id}
              className="rounded-2xl border-2 border-[var(--charcoal)] bg-[var(--offwhite)] px-4 py-3"
            >
              <p className="text-sm font-bold text-[var(--charcoal)]">
                {titleCase(subscription.plan_key)} / {titleCase(subscription.status)}
              </p>
              <p className="mt-1 text-xs font-semibold text-[var(--charcoal)]/55">
                {subscription.creem_subscription_id}
              </p>
              <p className="mt-1 text-xs font-semibold text-[var(--charcoal)]/55">
                User {subscription.user_id}
              </p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
