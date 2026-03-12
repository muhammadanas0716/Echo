import Link from "next/link";
import { FiMail } from "react-icons/fi";
import SubmitButton from "@/app/components/app/SubmitButton";
import FormField from "@/app/components/ui/FormField";
import ErrorMessage from "@/app/components/ui/ErrorMessage";
import { forgotPasswordAction } from "@/app/(auth)/actions";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const error = typeof params.error === "string" ? params.error : null;
  const message = typeof params.message === "string" ? params.message : null;

  return (
    <div className="rounded-[2rem] border-2 border-[var(--charcoal)] bg-white p-8 shadow-[0_12px_0_#1a1a1a] sm:p-10">
      <span className="inline-flex rounded-xl border-2 border-[var(--charcoal)] bg-[#ffd7d2] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a]">
        Recovery
      </span>
      <h1 className="mt-5 font-heading text-3xl font-extrabold text-[var(--charcoal)] sm:text-4xl">
        Send the recovery link
      </h1>
      <p className="mt-2 text-sm font-medium text-[var(--charcoal)]/60">
        We&apos;ll email you a link to reset your password.
      </p>

      {message ? (
        <div className="mt-5 rounded-xl border-2 border-[var(--charcoal)] bg-[#d4f8e8] px-4 py-3 text-sm font-semibold text-[var(--charcoal)]">
          {message}
        </div>
      ) : null}
      <div className="mt-4">
        <ErrorMessage message={error ?? ""} />
      </div>

      <form action={forgotPasswordAction} className="mt-6 space-y-5">
        <FormField label="Email" required>
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-[var(--charcoal)]/40" />
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-xl border-2 border-[var(--charcoal)]/20 bg-white py-3.5 pl-12 pr-4 font-medium text-[var(--charcoal)] outline-none transition placeholder:text-[var(--charcoal)]/40 focus:border-[var(--charcoal)] focus:ring-2 focus:ring-[var(--charcoal)]/10"
            />
          </div>
        </FormField>
        <SubmitButton
          className="w-full rounded-xl border-2 border-[var(--charcoal)] bg-[#a6ea47] shadow-[0_5px_0_#1a1a1a] hover:-translate-y-0.5 hover:shadow-[0_7px_0_#1a1a1a]"
          pendingLabel="Sending..."
        >
          Send Reset Link
        </SubmitButton>
      </form>

      <p className="mt-6 text-center text-sm font-medium text-[var(--charcoal)]/70">
        <Link href="/login" className="font-bold underline decoration-2 underline-offset-4 text-[var(--charcoal)] hover:no-underline">
          Back to login
        </Link>
      </p>
    </div>
  );
}
