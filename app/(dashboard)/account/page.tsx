import Link from "next/link";
import SectionCard from "@/app/components/app/SectionCard";
import SubmitButton from "@/app/components/app/SubmitButton";
import StatusBadge from "@/app/components/app/StatusBadge";
import FormField from "@/app/components/ui/FormField";
import { updateAccountAction } from "@/app/(dashboard)/account/actions";
import { requireViewer } from "@/lib/auth/session";
import { formatDate } from "@/lib/formatters";

export default async function AccountPage({
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
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
          Account
        </p>
        <h1 className="mt-3 font-heading text-4xl font-extrabold text-[var(--charcoal)]">
          Profile and access state.
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

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <SectionCard title="Profile details" eyebrow="Editable">
          <form action={updateAccountAction} className="space-y-4">
            <FormField label="Email">
              <input
                type="email"
                value={viewer.profile.email}
                disabled
                className="w-full rounded-2xl border-2 border-[var(--charcoal)] bg-[#f2f2f2] px-4 py-3 font-semibold text-[var(--charcoal)]/55 outline-none"
              />
            </FormField>
            <FormField label="Full Name">
              <input
                type="text"
                name="fullName"
                defaultValue={viewer.profile.full_name ?? ""}
                className="w-full rounded-2xl border-2 border-[var(--charcoal)] bg-[var(--offwhite)] px-4 py-3 font-semibold text-[var(--charcoal)] outline-none"
              />
            </FormField>
            <SubmitButton
              className="bg-[#a6ea47] hover:-translate-y-0.5 hover:bg-[var(--mint)] hover:shadow-[0_6px_0_#1a1a1a]"
              pendingLabel="Saving..."
            >
              Save Profile
            </SubmitButton>
          </form>
        </SectionCard>

        <SectionCard title="Account status" eyebrow="Read-only" accent="bg-[#d4e9ff]">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 rounded-2xl border-2 border-[var(--charcoal)] bg-white px-4 py-3">
              <span className="text-sm font-bold text-[var(--charcoal)]">Role</span>
              <span className="text-sm font-black text-[var(--charcoal)]">{viewer.profile.role}</span>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-2xl border-2 border-[var(--charcoal)] bg-white px-4 py-3">
              <span className="text-sm font-bold text-[var(--charcoal)]">Subscription</span>
              <StatusBadge status={viewer.subscription?.status ?? "inactive"} />
            </div>
            <div className="flex items-center justify-between gap-3 rounded-2xl border-2 border-[var(--charcoal)] bg-white px-4 py-3">
              <span className="text-sm font-bold text-[var(--charcoal)]">Billing period end</span>
              <span className="text-sm font-black text-[var(--charcoal)]">
                {formatDate(viewer.subscription?.current_period_end)}
              </span>
            </div>
            <Link
              href="/reset-password"
              className="inline-flex rounded-xl border-3 border-[var(--charcoal)] bg-[#fef3c7] px-4 py-2.5 font-heading text-sm font-bold text-[var(--charcoal)] shadow-[0_4px_0_#1a1a1a]"
            >
              Reset Password
            </Link>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
