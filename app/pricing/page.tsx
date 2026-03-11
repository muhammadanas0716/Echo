import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import LandingNav from "../components/nav/LandingNav";
import OceanFooter from "../components/landing/OceanFooter";
import { starterPlans, creditPacks } from "@/lib/billing/catalog";
import { publicLinks } from "@/lib/site-links";
import { buildPageMetadata } from "@/lib/seo/metadata";

function PricingStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": "https://echo-ecru-nine.vercel.app/pricing#product",
        name: "Echo Pricing",
        description:
          "Subscription plans and credit top-up packs for Echo, including hosted checkout, portal access, webhook sync, and credits-based billing.",
        brand: { "@type": "Brand", name: "Echo" },
        category: "Software",
        offers: {
          "@type": "Offer",
          price: "19",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://echo-ecru-nine.vercel.app/pricing",
          seller: { "@type": "Organization", name: "Echo" },
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://echo-ecru-nine.vercel.app/pricing#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Where do I actually buy a plan?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Create an account first, then choose a plan inside the billing console where Creem checkout is wired in.",
            },
          },
          {
            "@type": "Question",
            name: "Do plans include credits?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Each subscription plan includes credits, and separate top-up packs are available for additional usage.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export const metadata: Metadata = buildPageMetadata({
  title: "Echo Pricing - plans, credits, and billing flows",
  description:
    "Explore Echo plans, annual discounts, credit allowances, and top-up packs. Sign up to continue into the billing console and checkout.",
  path: "/pricing",
  imagePath: "/pricing/opengraph-image",
  keywords: [
    "echo pricing",
    "saas billing starter pricing",
    "credits pricing",
    "creem pricing integration",
    "supabase saas starter pricing",
  ],
});

const faqs = [
  {
    q: "How do I start a subscription?",
    a: "Start with the signup flow, then head into the billing console where Echo creates the Creem checkout for the plan you choose.",
  },
  {
    q: "Can users upgrade or downgrade later?",
    a: "Yes. Echo includes in-app plan switching, proration-aware changes, and a customer portal fallback for edge cases.",
  },
  {
    q: "Are credits included in subscriptions?",
    a: "Yes. Every Echo plan includes recurring credits, and renewal webhooks can top them up automatically.",
  },
  {
    q: "Can I buy extra credits without changing plans?",
    a: "Yes. The billing console supports standalone top-up packs for bursty usage.",
  },
  {
    q: "What happens after cancellation?",
    a: "Cancellation is scheduled for period end, and access remains active until the current billing period finishes.",
  },
  {
    q: "Is there a customer portal?",
    a: "Yes. Echo includes a secure Creem portal redirect for payment methods, invoices, and other self-serve billing actions.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PricingStructuredData />
      <LandingNav
        variant="ocean"
        brandName="Echo"
        brandAlt="Echo logo"
        primaryLabel="Start Free"
        primaryHref={publicLinks.getStarted}
      />
      <div className="relative min-h-screen overflow-hidden bg-[#a9e9f4] page-transition">
        <section className="relative bg-[linear-gradient(180deg,#90ddf0_0%,#b8edfb_54%,#d4f8ff_100%)] px-4 pb-16 pt-36 sm:px-6 sm:pt-40 lg:px-8">
          <div className="pointer-events-none absolute inset-0 dotted-sea opacity-60" />
          <div className="relative mx-auto max-w-6xl text-center">
            <span className="inline-flex rounded-full border-2 border-[var(--charcoal)] bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--charcoal)] shadow-[0_4px_0_#1a1a1a]">
              Live billing paths
            </span>
            <h1 className="mx-auto mt-6 max-w-5xl text-balance font-heading text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--charcoal)] sm:text-6xl">
              Choose the Echo plan,
              <br />
              then continue straight into billing.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-balance text-lg font-medium text-[var(--charcoal)]/80 sm:text-xl">
              Public pricing now connects into the real app flow. Create an account, open billing,
              and purchase a subscription or top-up through Creem.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={publicLinks.getStarted}
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[var(--charcoal)] bg-[#a6ea47] px-7 py-3.5 font-heading text-lg font-bold text-[var(--charcoal)] shadow-[0_6px_0_#1a1a1a] transition hover:-translate-y-1 hover:shadow-[0_10px_0_#1a1a1a]"
              >
                Start Free
                <FiArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href={publicLinks.login}
                className="inline-flex items-center justify-center rounded-xl border-2 border-[var(--charcoal)] bg-white px-7 py-3.5 font-heading text-lg font-bold text-[var(--charcoal)] shadow-[0_6px_0_#1a1a1a] transition hover:-translate-y-1 hover:shadow-[0_10px_0_#1a1a1a]"
              >
                Log In To Billing
              </Link>
            </div>
          </div>
        </section>

        <section className="ripple-border-green relative overflow-hidden border-y-2 border-[var(--charcoal)] bg-[linear-gradient(180deg,#d0f8ea_0%,#95ddc1_100%)] px-4 py-20 sm:px-6 lg:px-8">
          <svg
            className="absolute -top-[1px] left-0 h-8 w-full text-[#7fd7b8]"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path fill="currentColor" d="M0,40 C90,0 180,80 270,40 C360,0 450,80 540,40 C630,0 720,80 810,40 C900,0 990,80 1080,40 C1170,0 1260,80 1350,40 C1410,12 1440,40 1440,40 L1440,0 L0,0 Z" />
          </svg>
          <div className="relative mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
                Subscriptions
              </p>
              <h2 className="mt-3 font-heading text-3xl font-extrabold text-[var(--charcoal)] sm:text-5xl">
                Three plans. Monthly or yearly.
              </h2>
            </div>

            <div className="grid gap-8 xl:grid-cols-3">
              {starterPlans.map((plan, index) => (
                <article
                  key={plan.key}
                  className={`relative rounded-[2rem] border-3 border-[var(--charcoal)] p-6 shadow-[0_10px_0_#1a1a1a] sm:p-8 ${
                    plan.popular ? "bg-[#99e8cf]" : "bg-white"
                  }`}
                  style={{ transform: `rotate(${index % 2 === 0 ? "-1deg" : "1deg"})` }}
                >
                  {plan.popular ? (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full border-2 border-[var(--charcoal)] bg-[var(--coral)] px-4 py-1 text-xs font-black uppercase tracking-[0.16em] text-white shadow-[0_3px_0_#1a1a1a]">
                      Most Popular
                    </div>
                  ) : null}

                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
                    {plan.tagline}
                  </p>
                  <h3 className="mt-3 font-heading text-3xl font-extrabold text-[var(--charcoal)]">
                    {plan.name}
                  </h3>
                  <p className="mt-3 text-sm font-semibold leading-relaxed text-[var(--charcoal)]/65">
                    {plan.description}
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                    <div className="rounded-2xl border-2 border-[var(--charcoal)] bg-[#d4e9ff] p-4 shadow-[0_4px_0_#1a1a1a]">
                      <p className="font-heading text-3xl font-black text-[var(--charcoal)]">
                        {plan.monthlyPriceLabel}
                      </p>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--charcoal)]/50">
                        Monthly
                      </p>
                      <p className="mt-2 text-sm font-bold text-[var(--charcoal)]">
                        {plan.monthlyCredits} credits per month
                      </p>
                    </div>
                    <div className="rounded-2xl border-2 border-[var(--charcoal)] bg-[#fef3c7] p-4 shadow-[0_4px_0_#1a1a1a]">
                      <p className="font-heading text-3xl font-black text-[var(--charcoal)]">
                        {plan.yearlyPriceLabel}
                      </p>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--charcoal)]/50">
                        Yearly
                      </p>
                      <p className="mt-2 text-sm font-bold text-[var(--charcoal)]">
                        {plan.yearlyCredits} credits per year
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-3 rounded-2xl border-2 border-[var(--charcoal)] bg-[var(--offwhite)] px-4 py-3 shadow-[0_3px_0_#1a1a1a]"
                      >
                        <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[var(--charcoal)] bg-[#a6ea47]">
                          <FiCheck className="h-3 w-3 text-[var(--charcoal)]" />
                        </span>
                        <span className="text-sm font-semibold text-[var(--charcoal)]">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-3">
                    <Link
                      href={publicLinks.getStarted}
                      className={`block rounded-xl border-2 border-[var(--charcoal)] px-5 py-3 text-center font-heading text-sm font-bold shadow-[0_5px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_7px_0_#1a1a1a] ${
                        plan.popular
                          ? "bg-[var(--charcoal)] text-white"
                          : "bg-white text-[var(--charcoal)]"
                      }`}
                    >
                      Choose {plan.name}
                    </Link>
                    <p className="text-center text-xs font-semibold text-[var(--charcoal)]/55">
                      Signup first, then finish checkout inside billing.
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-y-2 border-[var(--charcoal)] bg-[linear-gradient(180deg,#d5efff_0%,#bfe8ff_52%,#d9f8eb_100%)] px-4 py-20 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0 dotted-sea opacity-[0.08]" />
          <div className="relative mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
                Top-up packs
              </p>
              <h2 className="mt-3 font-heading text-3xl font-extrabold text-[var(--charcoal)] sm:text-5xl">
                Extra credits when usage spikes.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {creditPacks.map((pack, index) => (
                <article
                  key={pack.key}
                  className="rounded-[1.75rem] border-3 border-[var(--charcoal)] bg-white p-5 shadow-[0_8px_0_#1a1a1a]"
                  style={{ transform: `rotate(${index % 2 === 0 ? "-0.8deg" : "0.8deg"})` }}
                >
                  <p className="font-heading text-2xl font-extrabold text-[var(--charcoal)]">{pack.name}</p>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-[var(--charcoal)]/65">
                    {pack.description}
                  </p>
                  <div className="mt-5 rounded-2xl border-2 border-[var(--charcoal)] bg-[#fef3c7] p-4 shadow-[0_4px_0_#1a1a1a]">
                    <p className="font-heading text-4xl font-black text-[var(--charcoal)]">{pack.credits}</p>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--charcoal)]/50">
                      Credits
                    </p>
                    <p className="mt-3 text-lg font-black text-[var(--charcoal)]">{pack.priceLabel}</p>
                  </div>
                  <Link
                    href={publicLinks.getStarted}
                    className="mt-5 block rounded-xl border-2 border-[var(--charcoal)] bg-[#a6ea47] px-5 py-3 text-center font-heading text-sm font-bold text-[var(--charcoal)] shadow-[0_5px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_7px_0_#1a1a1a]"
                  >
                    Unlock In Billing
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ripple-border-blue relative overflow-hidden border-y-2 border-[var(--charcoal)] bg-[#2f58cf] px-4 py-20 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.13),transparent_38%),radial-gradient(circle_at_85%_78%,rgba(255,255,255,0.10),transparent_35%)]" />
          <div className="relative mx-auto max-w-4xl">
            <h2 className="text-center font-heading text-3xl font-extrabold tracking-[-0.02em] text-white sm:text-5xl">
              Billing questions, answered clearly.
            </h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border-2 border-[var(--charcoal)] bg-[#d6e2ff] p-5 shadow-[0_6px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_8px_0_#1a1a1a]"
                >
                  <h3 className="font-heading font-bold text-[var(--charcoal)]">{faq.q}</h3>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-[var(--charcoal)]/80">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-t-2 border-[var(--charcoal)] bg-[#1b3a95] px-4 py-20 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.12),transparent_36%),radial-gradient(circle_at_82%_74%,rgba(255,255,255,0.08),transparent_40%)]" />
          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-extrabold tracking-[-0.02em] text-white sm:text-4xl">
              Ready to turn pricing into a real checkout?
            </h2>
            <p className="mt-4 text-lg font-semibold text-white/85">
              Create an account now, then continue into the billing console to choose a plan or buy top-ups.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={publicLinks.getStarted}
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[var(--charcoal)] bg-[#a6ea47] px-8 py-3.5 font-heading text-lg font-bold text-[var(--charcoal)] shadow-[0_5px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_8px_0_#1a1a1a]"
              >
                Start Free
                <FiArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href={publicLinks.login}
                className="inline-flex items-center justify-center rounded-xl border-2 border-[var(--charcoal)] bg-white px-8 py-3.5 font-heading text-lg font-bold text-[var(--charcoal)] shadow-[0_5px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_8px_0_#1a1a1a]"
              >
                Log In
              </Link>
            </div>
          </div>
        </section>

        <OceanFooter />
      </div>
    </>
  );
}
