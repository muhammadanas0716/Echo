import Link from "next/link";
import { FiLock } from "react-icons/fi";
import SubmitButton from "@/app/components/app/SubmitButton";
import FormField from "@/app/components/ui/FormField";
import ErrorMessage from "@/app/components/ui/ErrorMessage";
import PasswordInput from "@/app/components/ui/PasswordInput";
import { resetPasswordAction } from "@/app/(auth)/actions";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const error = typeof params.error === "string" ? params.error : null;

  return (
    <div className="rounded-[2rem] border-2 border-[var(--charcoal)] bg-white p-8 shadow-[0_12px_0_#1a1a1a] sm:p-10">
      <span className="inline-flex rounded-xl border-2 border-[var(--charcoal)] bg-[#ffd7d2] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a]">
        Set password
      </span>
      <h1 className="mt-5 font-heading text-3xl font-extrabold text-[var(--charcoal)] sm:text-4xl">
        Reset your password
      </h1>
      <p className="mt-2 text-sm font-medium text-[var(--charcoal)]/60">
        Enter your new password below.
      </p>

      <div className="mt-5">
        <ErrorMessage message={error ?? ""} />
      </div>

      <form action={resetPasswordAction} className="mt-6 space-y-5">
        <FormField label="New password" required hint="At least 8 characters.">
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-[var(--charcoal)]/40" />
            <PasswordInput name="password" minLength={8} required placeholder="••••••••" />
          </div>
        </FormField>
        <FormField label="Confirm password" required>
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-[var(--charcoal)]/40" />
            <PasswordInput name="confirmPassword" minLength={8} required placeholder="••••••••" />
          </div>
        </FormField>
        <SubmitButton
          className="w-full rounded-xl border-2 border-[var(--charcoal)] bg-[#a6ea47] shadow-[0_5px_0_#1a1a1a] hover:-translate-y-0.5 hover:shadow-[0_7px_0_#1a1a1a]"
          pendingLabel="Updating..."
        >
          Update Password
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
