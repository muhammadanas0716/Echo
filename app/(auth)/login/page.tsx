import Link from "next/link";
import SubmitButton from "@/app/components/app/SubmitButton";
import FormField from "@/app/components/ui/FormField";
import ErrorMessage from "@/app/components/ui/ErrorMessage";
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
    <div className="rounded-[2rem] border-3 border-[var(--charcoal)] bg-white p-8 shadow-[0_10px_0_#1a1a1a] sm:p-10">
      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-full border-2 border-[var(--charcoal)] bg-[#fff7cf] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a]">
          Returning customer
        </div>
        <Link
          href={publicLinks.pricing}
          className="rounded-full border-2 border-[var(--charcoal)] bg-[#d4e9ff] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a] transition hover:-translate-y-0.5"
        >
          View plans
        </Link>
      </div>
      <h2 className="mt-4 font-heading text-3xl font-extrabold text-[var(--charcoal)] sm:text-[2.35rem]">
        Welcome back to Echo.
      </h2>
      <p className="mt-2 max-w-lg text-sm font-semibold leading-relaxed text-[var(--charcoal)]/60">
        Sign in to manage billing, inspect subscription status, and keep your credits ledger moving
        without leaving the app.
      </p>

      {message ? (
        <div className="mt-5 rounded-[1.4rem] border-3 border-[var(--charcoal)] bg-[#d4f8e8] px-4 py-4 text-sm font-semibold text-[var(--charcoal)] shadow-[0_4px_0_#1a1a1a]">
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
            className="w-full rounded-[1.2rem] border-3 border-[var(--charcoal)] bg-white px-4 py-3.5 font-semibold text-[var(--charcoal)] shadow-[0_4px_0_#1a1a1a] outline-none transition placeholder:text-[var(--charcoal)]/35 focus:-translate-y-0.5 focus:shadow-[0_6px_0_#1a1a1a]"
          />
        </FormField>
        <FormField label="Password" required>
          <input
            type="password"
            name="password"
            required
            className="w-full rounded-[1.2rem] border-3 border-[var(--charcoal)] bg-white px-4 py-3.5 font-semibold text-[var(--charcoal)] shadow-[0_4px_0_#1a1a1a] outline-none transition focus:-translate-y-0.5 focus:shadow-[0_6px_0_#1a1a1a]"
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

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[1.5rem] border-3 border-[var(--charcoal)] bg-[#fff7cf] px-4 py-4 shadow-[0_4px_0_#1a1a1a]">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
            After login
          </p>
          <p className="mt-2 text-sm font-bold text-[var(--charcoal)]">
            Open billing, review plan status, and launch the customer portal in one place.
          </p>
        </div>
        <div className="rounded-[1.5rem] border-3 border-[var(--charcoal)] bg-[#d4e9ff] px-4 py-4 shadow-[0_4px_0_#1a1a1a]">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
            Need a plan?
          </p>
          <p className="mt-2 text-sm font-bold text-[var(--charcoal)]">
            Start on pricing first, then we’ll route you directly into checkout-ready billing.
          </p>
        </div>
      </div>
    </div>
  );
}
