import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
  FiCheckCircle,
  FiCloud,
  FiCode,
  FiCreditCard,
  FiDatabase,
  FiLock,
  FiPlay,
  FiRefreshCw,
  FiShield,
  FiZap,
} from "react-icons/fi";
import LandingNav from "@/app/components/nav/LandingNav";
import OceanFooter from "@/app/components/landing/OceanFooter";
import { publicLinks } from "@/lib/site-links";
import { buildPageMetadata, toAbsoluteUrl } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Note on the demo - What Echo ships, proves, and how to run it locally",
  description:
    "A detailed walkthrough of the Echo demo: what is live, how auth and billing work together, how webhook sync behaves, and how to spin the starter up locally.",
  path: "/note-on-the-demo",
  keywords: [
    "echo demo",
    "supabase creem starter",
    "next.js billing starter",
    "creem webhooks",
    "supabase auth starter",
  ],
});

const liveSiteUrl = toAbsoluteUrl("/");
const webhookUrl = toAbsoluteUrl("/api/webhooks/creem");
const callbackUrl = toAbsoluteUrl("/auth/callback");

const includedModules = [
  {
    icon: FiShield,
    title: "Auth and protected routes",
    description:
      "Supabase email/password, Google OAuth, session-aware redirects, and server-enforced route protection.",
    tone: "bg-[#d4e9ff]",
  },
  {
    icon: FiCreditCard,
    title: "Real billing surface",
    description:
      "Creem checkout, customer portal access, plan switching, cancel-at-period-end, and top-up purchases.",
    tone: "bg-[#fff7cf]",
  },
  {
    icon: FiRefreshCw,
    title: "Webhook-synced state",
    description:
      "Subscription status and credit grants reconcile from verified webhooks instead of client guesses.",
    tone: "bg-[#d4f8e8]",
  },
  {
    icon: FiDatabase,
    title: "Credits + local records",
    description:
      "Users, subscriptions, balances, ledger entries, and webhook events live in Supabase with RLS.",
    tone: "bg-[#ffd7d2]",
  },
];

const demoFlow = [
  {
    step: "01",
    title: "Start on the public site",
    body: "The landing and pricing pages route into sign-up or billing instead of dead-end demo CTAs.",
  },
  {
    step: "02",
    title: "Authenticate with Supabase",
    body: "Customers can sign up with email/password or Google and are synced into local user records.",
  },
  {
    step: "03",
    title: "Choose a plan in billing",
    body: "The billing page launches Creem checkout for subscriptions or one-off credit top-up packs.",
  },
  {
    step: "04",
    title: "Let Creem send webhooks",
    body: "Successful subscription and payment events post to the webhook route and are signature-verified.",
  },
  {
    step: "05",
    title: "Sync local subscription state",
    body: "Webhook handlers update entitlement, period dates, cancellation flags, and credit grants.",
  },
  {
    step: "06",
    title: "Unlock the protected app",
    body: "Entitled users can access dashboard and credits pages while inactive users are redirected cleanly.",
  },
];

const securityNotes = [
  "Auth checks happen server-side in layouts, server actions, and route handlers.",
  "Creem subscription and credit truth is owned by server-side reconciliation, not by browser state.",
  "Webhook processing is idempotent through stored event records to prevent duplicate grants.",
  "Supabase Row Level Security restricts reads to the current user's rows.",
  "Credit grants and debits use SQL functions so balance changes stay atomic.",
  "Admin billing tools are restricted by the configured ADMIN_EMAILS allowlist.",
];

const routeNotes = [
  {
    path: "/pricing",
    summary: "Public plan surface that routes into sign-up and billing-aware flows.",
  },
  {
    path: "/signup?next=%2Fbilling",
    summary: "Fastest way to test auth and land directly on the billing screen after account creation.",
  },
  {
    path: "/billing",
    summary: "Core demo route for plan purchase, plan changes, portal access, and cancellation.",
  },
  {
    path: "/credits",
    summary: "Shows wallet balances, recent ledger entries, and the sample debit flow.",
  },
  {
    path: "/dashboard",
    summary: "Protected customer area unlocked by entitled subscription state.",
  },
  {
    path: "/admin/billing",
    summary: "Admin-only operational view for recent webhook events and manual credit adjustments.",
  },
];

const localCommands = `npm install
npm run lint
npm run build
npm run dev`;

const environmentSnippet = `NEXT_PUBLIC_SITE_URL=http://localhost:4000
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
CREEM_API_KEY=creem_test_your_api_key
CREEM_WEBHOOK_SECRET=your_creem_webhook_secret
NEXT_PUBLIC_CREEM_TEST_MODE=true

NEXT_PUBLIC_CREEM_ECHO_STARTER_MONTHLY_PRODUCT_ID=prod_echo_starter_monthly
NEXT_PUBLIC_CREEM_ECHO_STARTER_YEARLY_PRODUCT_ID=prod_echo_starter_yearly
NEXT_PUBLIC_CREEM_ECHO_PRO_MONTHLY_PRODUCT_ID=prod_echo_pro_monthly
NEXT_PUBLIC_CREEM_ECHO_PRO_YEARLY_PRODUCT_ID=prod_echo_pro_yearly
NEXT_PUBLIC_CREEM_ECHO_SCALE_MONTHLY_PRODUCT_ID=prod_echo_scale_monthly
NEXT_PUBLIC_CREEM_ECHO_SCALE_YEARLY_PRODUCT_ID=prod_echo_scale_yearly
NEXT_PUBLIC_CREEM_ECHO_SMALL_TOPUP_PRODUCT_ID=prod_echo_small_topup
NEXT_PUBLIC_CREEM_ECHO_GROWTH_TOPUP_PRODUCT_ID=prod_echo_growth_topup
NEXT_PUBLIC_CREEM_ECHO_SCALE_TOPUP_PRODUCT_ID=prod_echo_scale_topup

ADMIN_EMAILS=founder@example.com,ops@example.com`;

const customizationNotes = [
  "Paste your real Creem product IDs first so the plan cards and top-up packs become live checkout actions.",
  "Run the Supabase SQL migration before testing webhooks, credits, or protected routes.",
  "Replace the placeholder social/contact values like hello@echobills.space and @echobills once your final brand handles are ready.",
  "Edit plan copy, prices, and features in the billing catalog if you want to reposition the offer before publishing.",
];

export default function DemoNotePage() {
  return (
    <>
      <LandingNav
        variant="ocean"
        brandName="Echo"
        brandAlt="Echo logo"
        primaryLabel="Start Free"
        primaryHref={publicLinks.getStarted}
      />

      <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#90ddf0_0%,#b8edfb_50%,#d4f8ff_100%)]">
        <div className="pointer-events-none absolute inset-0 dotted-sea opacity-40" />

        <Image
          src="/clouds/cloud1.svg"
          alt=""
          aria-hidden
          width={220}
          height={120}
          className="pointer-events-none absolute left-[4%] top-28 w-20 sm:w-32 ocean-float opacity-60"
        />
        <Image
          src="/clouds/cloud2.svg"
          alt=""
          aria-hidden
          width={220}
          height={120}
          className="pointer-events-none absolute right-[6%] top-36 w-16 sm:w-24 ocean-float-delayed opacity-55"
        />
        <Image
          src="/clouds/cloud3.svg"
          alt=""
          aria-hidden
          width={220}
          height={120}
          className="pointer-events-none absolute right-[24%] top-20 w-14 sm:w-20 ocean-float-fast opacity-45"
        />

        <main className="relative z-10 mx-auto max-w-6xl px-5 pb-20 pt-36 sm:px-8 sm:pt-40">
          <section className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--charcoal)] bg-white px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a]">
                <FiCloud className="h-3.5 w-3.5" />
                Note on the demo
              </div>
              <h1 className="mt-5 font-heading text-4xl font-extrabold leading-[0.96] text-[var(--charcoal)] sm:text-6xl">
                What this demo proves,
                <br />
                what is live,
                <br />
                and how to run it.
              </h1>
              <p className="mt-5 max-w-2xl text-base font-semibold leading-relaxed text-[var(--charcoal)]/65">
                Echo is not just a polished landing page with fake app screenshots behind it. This demo is
                the working starter surface: public marketing pages, Supabase auth, protected routes,
                Creem billing, webhook-driven sync, credits, and admin billing ops all connected inside one
                Next.js App Router project.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={publicLinks.pricing}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-3 border-[var(--charcoal)] bg-[#a6ea47] px-5 py-3 font-heading text-sm font-extrabold text-[var(--charcoal)] shadow-[0_5px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_7px_0_#1a1a1a]"
                >
                  See pricing
                  <FiArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={publicLinks.getStarted}
                  className="inline-flex items-center justify-center rounded-xl border-3 border-[var(--charcoal)] bg-white px-5 py-3 font-heading text-sm font-bold text-[var(--charcoal)] shadow-[0_5px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_7px_0_#1a1a1a]"
                >
                  Create account
                </Link>
                <Link
                  href={publicLinks.billing}
                  className="inline-flex items-center justify-center rounded-xl border-3 border-[var(--charcoal)] bg-[#d4e9ff] px-5 py-3 font-heading text-sm font-bold text-[var(--charcoal)] shadow-[0_5px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_7px_0_#1a1a1a]"
                >
                  Open billing
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border-3 border-[var(--charcoal)] bg-white p-6 shadow-[0_8px_0_#1a1a1a] sm:p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
                Demo at a glance
              </p>
              <div className="mt-4 space-y-3">
                {[
                  { label: "Live site", value: liveSiteUrl.replace(/\/$/, "") },
                  { label: "Auth callback", value: callbackUrl },
                  { label: "Webhook route", value: webhookUrl },
                  { label: "Core stack", value: "Next.js + Supabase + Creem + Tailwind" },
                ].map((item, index) => (
                  <div
                    key={item.label}
                    className="rounded-[1.4rem] border-3 border-[var(--charcoal)] px-4 py-4 shadow-[0_4px_0_#1a1a1a]"
                    style={{ backgroundColor: ["#d4e9ff", "#fff7cf", "#d4f8e8", "#ffd7d2"][index] }}
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/45">
                      {item.label}
                    </p>
                    <p className="mt-2 break-all text-sm font-bold leading-relaxed text-[var(--charcoal)]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {includedModules.map((item, index) => (
              <article
                key={item.title}
                className={`rounded-[1.8rem] border-3 border-[var(--charcoal)] p-5 shadow-[0_6px_0_#1a1a1a] ${item.tone}`}
                style={{ transform: `rotate(${index % 2 === 0 ? "-1deg" : "1deg"})` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-[var(--charcoal)] bg-white shadow-[0_3px_0_#1a1a1a]">
                  <item.icon className="h-5 w-5 text-[var(--charcoal)]" />
                </div>
                <h2 className="mt-4 font-heading text-xl font-extrabold text-[var(--charcoal)]">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-[var(--charcoal)]/68">
                  {item.description}
                </p>
              </article>
            ))}
          </section>

          <section className="mt-12 rounded-[2rem] border-3 border-[var(--charcoal)] bg-white p-6 shadow-[0_8px_0_#1a1a1a] sm:p-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
                  How it works
                </p>
                <h2 className="mt-3 font-heading text-3xl font-extrabold text-[var(--charcoal)] sm:text-4xl">
                  The full product flow in six steps.
                </h2>
              </div>
              <div className="rounded-full border-2 border-[var(--charcoal)] bg-[#d4f8e8] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a]">
                Real routes, not mock screens
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {demoFlow.map((item, index) => (
                <article
                  key={item.step}
                  className="rounded-[1.7rem] border-3 border-[var(--charcoal)] bg-[var(--offwhite)] p-5 shadow-[0_5px_0_#1a1a1a]"
                  style={{ transform: `rotate(${index % 2 === 0 ? "-0.8deg" : "0.8deg"})` }}
                >
                  <div className="inline-flex rounded-full border-2 border-[var(--charcoal)] bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)] shadow-[0_2px_0_#1a1a1a]">
                    Step {item.step}
                  </div>
                  <h3 className="mt-4 font-heading text-xl font-extrabold text-[var(--charcoal)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-[var(--charcoal)]/68">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-12 grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
            <div className="rounded-[2rem] border-3 border-[var(--charcoal)] bg-[#99e8cf] p-6 shadow-[0_8px_0_#1a1a1a] sm:p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
                Security model
              </p>
              <h2 className="mt-3 font-heading text-3xl font-extrabold text-[var(--charcoal)]">
                Built to be demoable without being careless.
              </h2>
              <div className="mt-6 space-y-3">
                {securityNotes.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[1.4rem] border-3 border-[var(--charcoal)] bg-white px-4 py-4 shadow-[0_4px_0_#1a1a1a]"
                  >
                    <FiLock className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[var(--charcoal)]" />
                    <p className="text-sm font-semibold leading-relaxed text-[var(--charcoal)]/72">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border-3 border-[var(--charcoal)] bg-white p-6 shadow-[0_8px_0_#1a1a1a] sm:p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
                Routes to try
              </p>
              <h2 className="mt-3 font-heading text-3xl font-extrabold text-[var(--charcoal)]">
                Best pages for testing the starter.
              </h2>
              <div className="mt-6 space-y-3">
                {routeNotes.map((route, index) => (
                  <div
                    key={route.path}
                    className="rounded-[1.4rem] border-3 border-[var(--charcoal)] px-4 py-4 shadow-[0_4px_0_#1a1a1a]"
                    style={{ backgroundColor: ["#d4e9ff", "#fff7cf", "#ffd7d2", "#d4f8e8", "#ffffff", "#f3e8ff"][index] }}
                  >
                    <p className="font-heading text-lg font-extrabold text-[var(--charcoal)]">{route.path}</p>
                    <p className="mt-1 text-sm font-semibold leading-relaxed text-[var(--charcoal)]/68">
                      {route.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-12 rounded-[2rem] border-3 border-[var(--charcoal)] bg-[#fff7cf] p-6 shadow-[0_8px_0_#1a1a1a] sm:p-10">
            <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
                  Spin it up locally
                </p>
                <h2 className="mt-3 font-heading text-3xl font-extrabold text-[var(--charcoal)] sm:text-4xl">
                  Clone it, wire the keys, and run the full flow.
                </h2>
                <div className="mt-5 space-y-4 text-sm font-semibold leading-relaxed text-[var(--charcoal)]/72">
                  <p>
                    Use the same production concepts locally: Supabase callback URL, Creem product IDs, and
                    webhook route. The starter is already structured for App Router SSR auth, protected app
                    routes, and billing lifecycle updates.
                  </p>
                  <p>
                    Start by copying <code className="rounded bg-white px-1.5 py-0.5">.env.example</code> to
                    <code className="ml-1 rounded bg-white px-1.5 py-0.5">.env.local</code>, run the
                    Supabase migration, create the Creem products using
                    <code className="ml-1 rounded bg-white px-1.5 py-0.5">creem-products.txt</code>, then boot
                    the app.
                  </p>
                </div>

                <div className="mt-6 grid gap-3">
                  {[
                    `Add ${callbackUrl.replace(liveSiteUrl.replace(/\/$/, ""), "http://localhost:4000")}`,
                    "Enable email/password and Google in Supabase Auth.",
                    "Set Creem's webhook to your local tunnel or deployed webhook URL.",
                    "Use test-mode product IDs first so plan purchases are safe to validate.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-[1.4rem] border-3 border-[var(--charcoal)] bg-white px-4 py-4 shadow-[0_4px_0_#1a1a1a]"
                    >
                      <FiCheckCircle className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[var(--charcoal)]" />
                      <p className="text-sm font-semibold leading-relaxed text-[var(--charcoal)]/72">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-5">
                <div className="rounded-[1.8rem] border-3 border-[var(--charcoal)] bg-white p-5 shadow-[0_6px_0_#1a1a1a]">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border-2 border-[var(--charcoal)] bg-[#d4e9ff] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)] shadow-[0_2px_0_#1a1a1a]">
                    <FiPlay className="h-3.5 w-3.5" />
                    Commands
                  </div>
                  <pre className="overflow-x-auto rounded-[1.4rem] border-3 border-[var(--charcoal)] bg-[var(--charcoal)] px-4 py-4 text-xs font-semibold leading-6 text-white shadow-[0_4px_0_#1a1a1a]">
                    <code>{localCommands}</code>
                  </pre>
                </div>

                <div className="rounded-[1.8rem] border-3 border-[var(--charcoal)] bg-white p-5 shadow-[0_6px_0_#1a1a1a]">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border-2 border-[var(--charcoal)] bg-[#d4f8e8] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)] shadow-[0_2px_0_#1a1a1a]">
                    <FiCode className="h-3.5 w-3.5" />
                    Required env shape
                  </div>
                  <pre className="max-h-[24rem] overflow-auto rounded-[1.4rem] border-3 border-[var(--charcoal)] bg-[var(--charcoal)] px-4 py-4 text-xs font-semibold leading-6 text-white shadow-[0_4px_0_#1a1a1a]">
                    <code>{environmentSnippet}</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-12 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] border-3 border-[var(--charcoal)] bg-white p-6 shadow-[0_8px_0_#1a1a1a] sm:p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
                What to customize first
              </p>
              <h2 className="mt-3 font-heading text-3xl font-extrabold text-[var(--charcoal)]">
                The quickest path from demo to your own product.
              </h2>
              <div className="mt-6 space-y-3">
                {customizationNotes.map((item, index) => (
                  <div
                    key={item}
                    className="rounded-[1.4rem] border-3 border-[var(--charcoal)] px-4 py-4 shadow-[0_4px_0_#1a1a1a]"
                    style={{ backgroundColor: ["#d4e9ff", "#fff7cf", "#ffd7d2", "#d4f8e8"][index] }}
                  >
                    <p className="text-sm font-semibold leading-relaxed text-[var(--charcoal)]/72">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border-3 border-[var(--charcoal)] bg-[#d4e9ff] p-6 shadow-[0_8px_0_#1a1a1a] sm:p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
                Use this page as a checklist
              </p>
              <h2 className="mt-3 font-heading text-3xl font-extrabold text-[var(--charcoal)]">
                If you can test these, the starter is wired correctly.
              </h2>
              <div className="mt-6 space-y-3">
                {[
                  "Create an account and land on /billing.",
                  "Buy a plan or a top-up pack in Creem test mode.",
                  "Watch the webhook insert into webhook_events and update subscriptions.",
                  "Confirm /dashboard and /credits unlock for an entitled user.",
                  "Try a plan change, portal jump, and cancel-at-period-end flow.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[1.4rem] border-3 border-[var(--charcoal)] bg-white px-4 py-4 shadow-[0_4px_0_#1a1a1a]"
                  >
                    <FiZap className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[var(--charcoal)]" />
                    <p className="text-sm font-semibold leading-relaxed text-[var(--charcoal)]/72">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={publicLinks.login}
                  className="inline-flex items-center justify-center rounded-xl border-3 border-[var(--charcoal)] bg-white px-5 py-3 font-heading text-sm font-bold text-[var(--charcoal)] shadow-[0_5px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_7px_0_#1a1a1a]"
                >
                  Log in to test
                </Link>
                <Link
                  href={publicLinks.billing}
                  className="inline-flex items-center justify-center rounded-xl border-3 border-[var(--charcoal)] bg-[#a6ea47] px-5 py-3 font-heading text-sm font-extrabold text-[var(--charcoal)] shadow-[0_5px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_7px_0_#1a1a1a]"
                >
                  Open demo billing
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>

      <OceanFooter />
    </>
  );
}
