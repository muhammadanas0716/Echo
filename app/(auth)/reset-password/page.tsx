import Link from "next/link";
import SubmitButton from "@/app/components/app/SubmitButton";
import FormField from "@/app/components/ui/FormField";
import ErrorMessage from "@/app/components/ui/ErrorMessage";
import { resetPasswordAction } from "@/app/(auth)/actions";
import { publicLinks } from "@/lib/site-links";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const error = typeof params.error === "string" ? params.error : null;

  return (
    <div className="rounded-[2rem] border-3 border-[var(--charcoal)] bg-white p-8 shadow-[0_10px_0_#1a1a1a] sm:p-10">
      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-full border-2 border-[var(--charcoal)] bg-[#ffd7d2] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a]">
          Set password
        </div>
        <Link
          href={publicLinks.login}
          className="rounded-full border-2 border-[var(--charcoal)] bg-[#d4e9ff] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a] transition hover:-translate-y-0.5"
        >
          Return to login
        </Link>
      </div>
      <h2 className="mt-4 font-heading text-3xl font-extrabold text-[var(--charcoal)] sm:text-[2.35rem]">
        Reset your credentials.
      </h2>
      <p className="mt-2 max-w-lg text-sm font-semibold leading-relaxed text-[var(--charcoal)]/60">
        If the recovery token is valid, saving here updates the account immediately so the customer can
        get back into Echo billing and account pages.
      </p>

      <div className="mt-5">
        <ErrorMessage message={error ?? ""} />
      </div>

      <form action={resetPasswordAction} className="mt-6 space-y-4">
        <FormField label="New Password" required hint="At least 8 characters.">
          <input
            type="password"
            name="password"
            minLength={8}
            required
            className="w-full rounded-[1.2rem] border-3 border-[var(--charcoal)] bg-white px-4 py-3.5 font-semibold text-[var(--charcoal)] shadow-[0_4px_0_#1a1a1a] outline-none transition focus:-translate-y-0.5 focus:shadow-[0_6px_0_#1a1a1a]"
          />
        </FormField>
        <FormField label="Confirm Password" required>
          <input
            type="password"
            name="confirmPassword"
            minLength={8}
            required
            className="w-full rounded-[1.2rem] border-3 border-[var(--charcoal)] bg-white px-4 py-3.5 font-semibold text-[var(--charcoal)] shadow-[0_4px_0_#1a1a1a] outline-none transition focus:-translate-y-0.5 focus:shadow-[0_6px_0_#1a1a1a]"
          />
        </FormField>
        <SubmitButton
          className="w-full bg-[#a6ea47] hover:-translate-y-0.5 hover:bg-[var(--mint)] hover:shadow-[0_6px_0_#1a1a1a]"
          pendingLabel="Updating..."
        >
          Update Password
        </SubmitButton>
      </form>

      <div className="mt-6 text-sm font-semibold text-[var(--charcoal)]/65">
        <Link href="/login" className="underline decoration-2 underline-offset-4">
          Back to login
        </Link>
      </div>

      <div className="mt-6 rounded-[1.5rem] border-3 border-[var(--charcoal)] bg-[#d4f8e8] px-4 py-4 shadow-[0_4px_0_#1a1a1a]">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
          Security
        </p>
        <p className="mt-2 text-sm font-bold text-[var(--charcoal)]">
          Password changes stay inside the verified recovery flow. Subscription data and billing state
          remain server-owned and untouched by the client.
        </p>
      </div>
    </div>
  );
}
