import Link from "next/link";
import SubmitButton from "@/app/components/app/SubmitButton";
import FormField from "@/app/components/ui/FormField";
import ErrorMessage from "@/app/components/ui/ErrorMessage";
import { forgotPasswordAction } from "@/app/(auth)/actions";
import { publicLinks } from "@/lib/site-links";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const error = typeof params.error === "string" ? params.error : null;
  const message = typeof params.message === "string" ? params.message : null;

  return (
    <div className="rounded-[2rem] border-3 border-[var(--charcoal)] bg-white p-8 shadow-[0_10px_0_#1a1a1a] sm:p-10">
      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-full border-2 border-[var(--charcoal)] bg-[#ffd7d2] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a]">
          Recovery
        </div>
        <Link
          href={publicLinks.login}
          className="rounded-full border-2 border-[var(--charcoal)] bg-[#d4e9ff] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a] transition hover:-translate-y-0.5"
        >
          Back to login
        </Link>
      </div>
      <h2 className="mt-4 font-heading text-3xl font-extrabold text-[var(--charcoal)] sm:text-[2.35rem]">
        Send the recovery link.
      </h2>
      <p className="mt-2 max-w-lg text-sm font-semibold leading-relaxed text-[var(--charcoal)]/60">
        Supabase handles the reset flow, and Echo routes the customer back into the same billing-aware
        app once the password is updated.
      </p>

      {message ? (
        <div className="mt-5 rounded-[1.4rem] border-3 border-[var(--charcoal)] bg-[#d4f8e8] px-4 py-4 text-sm font-semibold text-[var(--charcoal)] shadow-[0_4px_0_#1a1a1a]">
          {message}
        </div>
      ) : null}

      <div className="mt-5">
        <ErrorMessage message={error ?? ""} />
      </div>

      <form action={forgotPasswordAction} className="mt-6 space-y-4">
        <FormField label="Email" required>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-[1.2rem] border-3 border-[var(--charcoal)] bg-white px-4 py-3.5 font-semibold text-[var(--charcoal)] shadow-[0_4px_0_#1a1a1a] outline-none transition focus:-translate-y-0.5 focus:shadow-[0_6px_0_#1a1a1a]"
          />
        </FormField>
        <SubmitButton
          className="w-full bg-[#a6ea47] hover:-translate-y-0.5 hover:bg-[var(--mint)] hover:shadow-[0_6px_0_#1a1a1a]"
          pendingLabel="Sending..."
        >
          Send Reset Link
        </SubmitButton>
      </form>

      <div className="mt-6 text-sm font-semibold text-[var(--charcoal)]/65">
        <Link href="/login" className="underline decoration-2 underline-offset-4">
          Back to login
        </Link>
      </div>

      <div className="mt-6 rounded-[1.5rem] border-3 border-[var(--charcoal)] bg-[#fff7cf] px-4 py-4 shadow-[0_4px_0_#1a1a1a]">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
          Recovery flow
        </p>
        <p className="mt-2 text-sm font-bold text-[var(--charcoal)]">
          After the reset email lands, the customer can set a new password and return to billing,
          credits, and protected routes without manual admin work.
        </p>
      </div>
    </div>
  );
}
