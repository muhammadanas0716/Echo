import Link from "next/link";
import SubmitButton from "@/app/components/app/SubmitButton";
import FormField from "@/app/components/ui/FormField";
import ErrorMessage from "@/app/components/ui/ErrorMessage";
import { googleAuthAction, signupAction } from "@/app/(auth)/actions";
import { publicLinks } from "@/lib/site-links";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const error = typeof params.error === "string" ? params.error : null;
  const next = typeof params.next === "string" ? params.next : "/dashboard";

  return (
    <div className="rounded-[2rem] border-3 border-[var(--charcoal)] bg-white p-8 shadow-[0_10px_0_#1a1a1a] sm:p-10">
      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-full border-2 border-[var(--charcoal)] bg-[#d4f8e8] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a]">
          New workspace
        </div>
        <Link
          href={publicLinks.pricing}
          className="rounded-full border-2 border-[var(--charcoal)] bg-[#fff7cf] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a] transition hover:-translate-y-0.5"
        >
          Compare plans
        </Link>
      </div>
      <h2 className="mt-4 font-heading text-3xl font-extrabold text-[var(--charcoal)] sm:text-[2.35rem]">
        Create your Echo account.
      </h2>
      <p className="mt-2 max-w-lg text-sm font-semibold leading-relaxed text-[var(--charcoal)]/60">
        Start with auth, then move straight into protected billing routes, subscriptions, customer
        portal access, and credits.
      </p>

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

      <form action={signupAction} className="space-y-4">
        <input type="hidden" name="next" value={next} />
        <FormField label="Full Name" required>
          <input
            type="text"
            name="fullName"
            required
            className="w-full rounded-[1.2rem] border-3 border-[var(--charcoal)] bg-white px-4 py-3.5 font-semibold text-[var(--charcoal)] shadow-[0_4px_0_#1a1a1a] outline-none transition focus:-translate-y-0.5 focus:shadow-[0_6px_0_#1a1a1a]"
          />
        </FormField>
        <FormField label="Email" required>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-[1.2rem] border-3 border-[var(--charcoal)] bg-white px-4 py-3.5 font-semibold text-[var(--charcoal)] shadow-[0_4px_0_#1a1a1a] outline-none transition focus:-translate-y-0.5 focus:shadow-[0_6px_0_#1a1a1a]"
          />
        </FormField>
        <FormField label="Password" required hint="Use at least 8 characters.">
          <input
            type="password"
            name="password"
            minLength={8}
            required
            className="w-full rounded-[1.2rem] border-3 border-[var(--charcoal)] bg-white px-4 py-3.5 font-semibold text-[var(--charcoal)] shadow-[0_4px_0_#1a1a1a] outline-none transition focus:-translate-y-0.5 focus:shadow-[0_6px_0_#1a1a1a]"
          />
        </FormField>
        <SubmitButton
          className="w-full bg-[#a6ea47] hover:-translate-y-0.5 hover:bg-[var(--mint)] hover:shadow-[0_6px_0_#1a1a1a]"
          pendingLabel="Creating account..."
        >
          Create Account
        </SubmitButton>
      </form>

      <div className="mt-6 text-sm font-semibold text-[var(--charcoal)]/65">
        Already have an account?{" "}
        <Link href={`/login?next=${encodeURIComponent(next)}`} className="underline decoration-2 underline-offset-4">
          Log in
        </Link>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[1.5rem] border-3 border-[var(--charcoal)] bg-[#d4e9ff] px-4 py-4 shadow-[0_4px_0_#1a1a1a]">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
            What unlocks next
          </p>
          <p className="mt-2 text-sm font-bold text-[var(--charcoal)]">
            Billing, credits, and account pages all open from the same authenticated shell.
          </p>
        </div>
        <div className="rounded-[1.5rem] border-3 border-[var(--charcoal)] bg-[#fff7cf] px-4 py-4 shadow-[0_4px_0_#1a1a1a]">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
            Billing-ready
          </p>
          <p className="mt-2 text-sm font-bold text-[var(--charcoal)]">
            After signup we can send you directly to billing for live Creem plan selection.
          </p>
        </div>
      </div>
    </div>
  );
}
