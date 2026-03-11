import type { Metadata } from "next";
import { FiCheck, FiX, FiArrowRight } from "react-icons/fi";
import LandingNav from "../components/nav/LandingNav";
import OceanFooter from "../components/landing/OceanFooter";
import { buildPageMetadata } from "@/lib/seo/metadata";

function PricingStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": "https://echobills.space/pricing#product",
        name: "Support Co Launch Pricing",
        description:
          "Early launch pricing for AI support agents across websites, Shopify stores, docs, and community channels.",
        brand: { "@type": "Brand", name: "Support Co" },
        category: "Software",
        offers: {
          "@type": "Offer",
          price: "39",
          priceCurrency: "USD",
          priceValidUntil: "2027-12-31",
          availability: "https://schema.org/InStock",
          url: "https://echobills.space/pricing",
          seller: { "@type": "Organization", name: "Support Co" },
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://echobills.space/pricing#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is the lifetime plan really one payment?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. It is a one-time early-adopter payment for lifetime access to the features included in that plan and future updates that ship into it.",
            },
          },
          {
            "@type": "Question",
            name: "Do you support Shopify and Discord?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Paid plans support website and Shopify chatbots today, Discord support bots, and early access to upcoming Slack support bot releases.",
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
  title: "Support Co Pricing - early launch plans for AI support teams",
  description:
    "Early launch pricing for teams building AI support agents for websites, Shopify stores, docs, and community channels.",
  path: "/pricing",
  imagePath: "/pricing/opengraph-image",
  keywords: [
    "ai support pricing",
    "website chatbot pricing",
    "shopify support bot pricing",
    "discord support bot pricing",
    "customer support automation pricing",
    "support co pricing",
  ],
});

const plans = [
  {
    name: "Sandbox",
    price: "$0",
    period: "forever",
    description: "Prototype one agent before you go live",
    bg: "bg-[#d4e9ff]",
    shadow: "shadow-[0_10px_0_#1a1a1a]",
    rotate: "-2deg",
    features: [
      { text: "1 website chatbot", included: true },
      { text: "Basic docs upload", included: true },
      { text: "Up to 3 knowledge sources", included: true },
      { text: "10 AI support credits", included: true },
      { text: "Branded agent preview", included: true },
      { text: "Encrypted storage", included: true },
      { text: "Shopify support", included: false },
      { text: "Codebase ingestion", included: false },
      { text: "Discord support bot", included: false },
    ],
    ctaLabel: "Request Sandbox",
    ctaHref: "mailto:hello@echobills.space?subject=Sandbox%20Request",
  },
  {
    name: "Pilot Monthly",
    price: "$1.99",
    period: "month",
    description: "Beta pricing for early live teams",
    bg: "bg-[#fef3c7]",
    shadow: "shadow-[0_10px_0_#1a1a1a]",
    rotate: "0deg",
    features: [
      { text: "Website + Shopify chatbots", included: true },
      { text: "Docs + codebase ingestion", included: true },
      { text: "Custom tone and routing", included: true },
      { text: "50 AI support credits", included: true },
      { text: "Unlimited knowledge sources", included: true },
      { text: "Encrypted support data", included: true },
      { text: "Discord support bot", included: true },
      { text: "Priority support", included: true },
      { text: "Slack bot waitlist", included: true },
    ],
    ctaLabel: "Start Monthly",
    ctaHref: "mailto:hello@echobills.space?subject=Pilot%20Monthly%20Plan",
  },
  {
    name: "Founding Lifetime",
    price: "$39",
    period: "once",
    description: "Limited early-adopter access while rollout stays tight",
    bg: "bg-[#99e8cf]",
    shadow: "shadow-[0_12px_0_#1a1a1a]",
    rotate: "2deg",
    popular: true,
    features: [
      { text: "Everything in Monthly", included: true },
      { text: "Pay once, keep access", included: true },
      { text: "Every future update in plan", included: true },
      { text: "Early access to new channels", included: true },
      { text: "Custom setup guidance", included: true },
      { text: "Priority support", included: true },
      { text: "No recurring rebill", included: true },
    ],
    ctaLabel: "Claim Lifetime",
    ctaHref: "mailto:hello@echobills.space?subject=Founding%20Lifetime%20Plan",
  },
];

const faqs = [
  {
    q: "Is the lifetime plan really one payment?",
    a: "Yes. Pay once and keep access to the features included in that plan, plus the future updates that roll into it.",
  },
  {
    q: "Can I start free and upgrade later?",
    a: "Yes. You can start with the Sandbox setup, then move to Monthly or Lifetime when you want broader channel coverage and deeper knowledge ingestion.",
  },
  {
    q: "Why is pricing low right now?",
    a: "Because this is early launch pricing. We are keeping rollout tight, shipping fast, and rewarding early teams that are willing to grow with the product.",
  },
  {
    q: "What can I connect?",
    a: "Docs, help-center content, policies, FAQs, internal notes, and codebase material. Paid plans are where the deeper ingestion really opens up.",
  },
  {
    q: "Do you support Shopify and Discord?",
    a: "Yes. Paid plans support website and Shopify chatbots today, plus Discord support bots. Slack support bots are on the roadmap and included through early access paths.",
  },
  {
    q: "Is there a refund policy?",
    a: "Yes. Paid plans include a 14-day money-back window. If the fit is wrong, email us and we will sort it out.",
  },
  {
    q: "Does Sandbox expire?",
    a: "No. Sandbox stays available for testing and small setups, with tighter limits on knowledge sources and channel coverage.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PricingStructuredData />
      <LandingNav
        variant="ocean"
        brandName="Support Co"
        brandAlt="Support Co logo"
        primaryLabel="Book Demo"
        primaryHref="mailto:hello@echobills.space?subject=Support%20Co%20Demo"
      />
      <div className="relative min-h-screen overflow-hidden bg-[#a9e9f4] page-transition">
        <section className="relative bg-[linear-gradient(180deg,#90ddf0_0%,#b8edfb_54%,#d4f8ff_100%)] px-4 pb-16 pt-36 sm:px-6 sm:pt-40 lg:px-8">
          <div className="pointer-events-none absolute inset-0 dotted-sea opacity-60" />
          <div className="relative mx-auto max-w-6xl">
            <h1 className="mx-auto max-w-4xl text-balance text-center font-heading text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--charcoal)] sm:text-6xl">
              Pick the support setup
              <br />
              that fits your team.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-center text-lg font-medium text-[var(--charcoal)]/80 sm:text-xl">
              Early launch pricing for teams setting up website, Shopify, and Discord support with real product knowledge behind every answer.
            </p>
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
          <div className="relative mx-auto max-w-5xl">
            <div className="grid gap-8 lg:grid-cols-3 lg:gap-8">
              {plans.map((plan) => (
                <article
                  key={plan.name}
                  className={`relative rounded-[2rem] border-2 border-[var(--charcoal)] ${plan.bg} p-6 ${plan.shadow} transition-all hover:-translate-y-1 hover:shadow-[0_14px_0_#1a1a1a] sm:p-8`}
                  style={{ transform: `rotate(${plan.rotate})` }}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full border-2 border-[var(--charcoal)] bg-[var(--coral)] px-4 py-1.5 text-xs font-bold text-white shadow-[0_3px_0_#1a1a1a]">
                      FOUNDING FAVORITE
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="font-heading text-2xl font-extrabold text-[var(--charcoal)]">{plan.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-[var(--charcoal)]/75">{plan.description}</p>
                  </div>
                  <div className="mb-6">
                    <span className="font-heading text-5xl font-black text-[var(--charcoal)]">{plan.price}</span>
                    <span className="ml-1 text-lg font-semibold text-[var(--charcoal)]/60">/{plan.period}</span>
                  </div>
                  <ul className="mb-8 space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        {feature.included ? (
                          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-[var(--charcoal)] bg-[var(--charcoal)]">
                            <FiCheck className="h-3 w-3 text-white" />
                          </div>
                        ) : (
                          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-[var(--charcoal)] bg-[#edf8f4]">
                            <FiX className="h-3 w-3 text-[var(--charcoal)]/50" />
                          </div>
                        )}
                        <span
                          className={`text-sm font-semibold ${
                            feature.included ? "text-[var(--charcoal)]" : "text-[var(--charcoal)]/50"
                          }`}
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={plan.ctaHref}
                    className={`block w-full rounded-xl border-2 border-[var(--charcoal)] px-6 py-3.5 text-center font-heading font-bold shadow-[0_5px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_8px_0_#1a1a1a] ${
                      plan.popular
                        ? "bg-[var(--charcoal)] text-white hover:bg-[#333]"
                        : "bg-white text-[var(--charcoal)]"
                    }`}
                  >
                    {plan.ctaLabel}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ripple-border-blue relative overflow-hidden border-y-2 border-[var(--charcoal)] bg-[#2f58cf] px-4 py-20 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.13),transparent_38%),radial-gradient(circle_at_85%_78%,rgba(255,255,255,0.10),transparent_35%)]" />
          <div className="relative mx-auto max-w-4xl">
            <h2 className="text-center font-heading text-3xl font-extrabold tracking-[-0.02em] text-white sm:text-5xl">
              Frequently Asked Questions
            </h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border-2 border-[var(--charcoal)] bg-[#d6e2ff] p-5 shadow-[0_6px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_8px_0_#1a1a1a]"
                >
                  <h3 className="font-heading font-bold text-[var(--charcoal)]">{faq.q}</h3>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-[var(--charcoal)]/80">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-t-2 border-[var(--charcoal)] bg-[#1b3a95] px-4 py-20 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.12),transparent_36%),radial-gradient(circle_at_82%_74%,rgba(255,255,255,0.08),transparent_40%)]" />
          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-extrabold tracking-[-0.02em] text-white sm:text-4xl">
              Ready to launch your first support agent?
            </h2>
            <p className="mt-4 text-lg font-semibold text-white/85">
              Start in Sandbox or lock in the founding plan while early launch pricing is still active.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="mailto:hello@echobills.space?subject=Support%20Co%20Pricing"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[var(--charcoal)] bg-[#a6ea47] px-8 py-3.5 font-heading text-lg font-bold text-[var(--charcoal)] shadow-[0_5px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_8px_0_#1a1a1a]"
              >
                Talk Through Pricing
                <FiArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </section>

        <OceanFooter />
      </div>
    </>
  );
}
