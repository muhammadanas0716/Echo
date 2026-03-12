import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiMail, FiLock } from "react-icons/fi";
import SubmitButton from "@/app/components/app/SubmitButton";
import FormField from "@/app/components/ui/FormField";
import ErrorMessage from "@/app/components/ui/ErrorMessage";
import PasswordInput from "@/app/components/ui/PasswordInput";
import { googleAuthAction, loginAction } from "@/app/(auth)/actions";
import { publicLinks } from "@/lib/site-links";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const error = typeof params.error === "string" ? params.error : null;
  const message = typeof params.message === "string" ? params.message : null;
  const next = typeof params.next === "string" ? params.next : "/dashboard";

  return (
    <div className="rounded-[2rem] border-2 border-[var(--charcoal)] bg-white p-8 shadow-[0_12px_0_#1a1a1a] sm:p-10">
      <div className="mb-6 flex items-center gap-2 rounded-xl border-2 border-[var(--charcoal)] bg-[#d4e9ff] px-4 py-2 w-fit">
        <Image src="/logo.png" alt="" width={24} height={24} className="h-6 w-6 object-cover" />
        <span className="font-heading text-sm font-extrabold text-[var(--charcoal)]">Echo</span>
      </div>

      <span className="inline-flex rounded-xl border-2 border-[var(--charcoal)] bg-[#a6ea47] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a]">
        Welcome back
      </span>
      <h1 className="mt-5 font-heading text-3xl font-extrabold text-[var(--charcoal)] sm:text-4xl">
        Sign in to Echo
      </h1>
      <p className="mt-2 text-sm font-medium text-[var(--charcoal)]/60">
        Your subscriptions missed you.
      </p>

      {message ? (
        <div className="mt-5 rounded-xl border-2 border-[var(--charcoal)] bg-[#d4f8e8] px-4 py-3 text-sm font-semibold text-[var(--charcoal)]">
          {message}
        </div>
      ) : null}
      <div className="mt-4">
        <ErrorMessage message={error ?? ""} />
      </div>

      <form action={googleAuthAction} className="mt-6">
        <input type="hidden" name="next" value={next} />
        <SubmitButton
          className="w-full rounded-xl border-2 border-[var(--charcoal)] bg-[#d4e9ff] shadow-[0_4px_0_#1a1a1a] hover:-translate-y-0.5 hover:shadow-[0_6px_0_#1a1a1a]"
          pendingLabel="Redirecting..."
        >
          Continue with Google
        </SubmitButton>
      </form>

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-[var(--charcoal)]/15" />
        <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/40">
          Or
        </span>
        <div className="h-px flex-1 bg-[var(--charcoal)]/15" />
      </div>

      <form action={loginAction} className="space-y-5">
        <input type="hidden" name="next" value={next} />
        <FormField label="Email" required>
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--charcoal)]/40" />
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-xl border-2 border-[var(--charcoal)]/20 bg-white py-3.5 pl-12 pr-4 font-medium text-[var(--charcoal)] outline-none transition placeholder:text-[var(--charcoal)]/40 focus:border-[var(--charcoal)] focus:ring-2 focus:ring-[var(--charcoal)]/10"
            />
          </div>
        </FormField>
        <FormField label="Password" required>
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-[var(--charcoal)]/40" />
            <PasswordInput name="password" required placeholder="••••••••" />
          </div>
        </FormField>
        <SubmitButton
          className="w-full rounded-xl border-2 border-[var(--charcoal)] bg-[#a6ea47] px-5 py-3.5 font-heading text-base font-bold shadow-[0_5px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_7px_0_#1a1a1a]"
          pendingLabel="Signing in..."
        >
          <span className="flex items-center justify-center gap-2">
            Sign In
            <FiArrowRight className="h-4 w-4" />
          </span>
        </SubmitButton>
      </form>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm font-medium text-[var(--charcoal)]/70">
        <Link href="/forgot-password" className="underline decoration-2 underline-offset-4 hover:text-[var(--charcoal)]">
          Forgot password?
        </Link>
        <span>
          Don&apos;t have an account?{" "}
          <Link
            href={`/signup?next=${encodeURIComponent(next)}`}
            className="font-bold underline decoration-2 underline-offset-4 text-[var(--charcoal)] hover:no-underline"
          >
            Sign up free
          </Link>
        </span>
      </div>
    </div>
  );
}
