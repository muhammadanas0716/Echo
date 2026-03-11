import Link from "next/link";
import SubmitButton from "@/app/components/app/SubmitButton";
import FormField from "@/app/components/ui/FormField";
import ErrorMessage from "@/app/components/ui/ErrorMessage";
import { googleAuthAction, loginAction } from "@/app/(auth)/actions";

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
    <div className="rounded-[2rem] border-3 border-[var(--charcoal)] bg-white p-8 shadow-[0_10px_0_#1a1a1a] sm:p-10">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
        Log in
      </p>
      <h2 className="mt-3 font-heading text-3xl font-extrabold text-[var(--charcoal)]">
        Welcome back.
      </h2>
      <p className="mt-2 text-sm font-semibold text-[var(--charcoal)]/60">
        Sign in to manage billing, credits, and protected routes.
      </p>

      {message ? (
        <div className="mt-5 rounded-2xl border-2 border-[var(--charcoal)] bg-[#d4f8e8] px-4 py-3 text-sm font-semibold text-[var(--charcoal)]">
          {message}
        </div>
      ) : null}

      <div className="mt-5">
        <ErrorMessage message={error ?? ""} />
      </div>

      <form action={googleAuthAction} className="mt-6">
        <input type="hidden" name="next" value={next} />
        <SubmitButton
          className="w-full bg-[#d4e9ff] hover:-translate-y-0.5 hover:bg-[#c9e0ff] hover:shadow-[0_6px_0_#1a1a1a]"
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

      <form action={loginAction} className="space-y-4">
        <input type="hidden" name="next" value={next} />
        <FormField label="Email" required>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-2xl border-2 border-[var(--charcoal)] bg-[var(--offwhite)] px-4 py-3 font-semibold text-[var(--charcoal)] outline-none"
          />
        </FormField>
        <FormField label="Password" required>
          <input
            type="password"
            name="password"
            required
            className="w-full rounded-2xl border-2 border-[var(--charcoal)] bg-[var(--offwhite)] px-4 py-3 font-semibold text-[var(--charcoal)] outline-none"
          />
        </FormField>
        <SubmitButton
          className="w-full bg-[#a6ea47] hover:-translate-y-0.5 hover:bg-[var(--mint)] hover:shadow-[0_6px_0_#1a1a1a]"
          pendingLabel="Logging in..."
        >
          Log In
        </SubmitButton>
      </form>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm font-semibold text-[var(--charcoal)]/65">
        <Link href="/forgot-password" className="underline decoration-2 underline-offset-4">
          Forgot password?
        </Link>
        <Link href={`/signup?next=${encodeURIComponent(next)}`} className="underline decoration-2 underline-offset-4">
          Create account
        </Link>
      </div>
    </div>
  );
}
