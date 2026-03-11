import Link from "next/link";
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
    <div className="rounded-[2rem] border-3 border-[var(--charcoal)] bg-white p-8 shadow-[0_10px_0_#1a1a1a] sm:p-10">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
        Reset password
      </p>
      <h2 className="mt-3 font-heading text-3xl font-extrabold text-[var(--charcoal)]">
        Send the recovery link.
      </h2>
      <p className="mt-2 text-sm font-semibold text-[var(--charcoal)]/60">
        We’ll send you a reset link through Supabase Auth.
      </p>

      {message ? (
        <div className="mt-5 rounded-2xl border-2 border-[var(--charcoal)] bg-[#d4f8e8] px-4 py-3 text-sm font-semibold text-[var(--charcoal)]">
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
            className="w-full rounded-2xl border-2 border-[var(--charcoal)] bg-[var(--offwhite)] px-4 py-3 font-semibold text-[var(--charcoal)] outline-none"
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
    </div>
  );
}
