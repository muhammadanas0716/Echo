import type { Metadata } from "next";
import {
  FiShield,
  FiDatabase,
  FiEye,
  FiLock,
  FiTrash2,
  FiMail,
  FiServer,
  FiUserCheck,
} from "react-icons/fi";

export const metadata: Metadata = {
  title: "Privacy Policy - Support Co",
  description:
    "Detailed privacy information about what Support Co collects, why it collects it, how it secures it, and how you can control it.",
};

const sections = [
  {
    icon: FiDatabase,
    title: "1. Information we collect",
    color: "bg-[var(--mint)]",
    intro:
      "We collect the information needed to run the website, respond to inquiries, and deliver the service we describe.",
    items: [
      "Contact details you send us, such as your name, email address, company name, and the information included in your message.",
      "Project and support context you choose to share with us during demos, onboarding discussions, or implementation planning.",
      "Site usage data such as page visits, device data, referrers, and basic diagnostics.",
      "Operational records such as support emails, scheduling details, and internal notes needed to follow up on legitimate business conversations.",
      "Billing-related metadata from payment providers, without storing your full card details ourselves.",
    ],
  },
  {
    icon: FiEye,
    title: "2. How we use that information",
    color: "bg-[var(--pink)]",
    intro:
      "We use your data to communicate clearly, operate the service, and improve what we ship.",
    items: [
      "To answer inquiries, schedule demos, and discuss fit.",
      "To plan, deliver, and support customer implementations.",
      "To maintain the platform, debug issues, measure performance, and improve features.",
      "To process purchases, prevent abuse, and provide customer support.",
      "To comply with legal obligations when they apply.",
    ],
  },
  {
    icon: FiLock,
    title: "3. Security and access",
    color: "bg-[var(--sun)]",
    intro:
      "We treat support data like operational data, not like disposable marketing content.",
    items: [
      "Data is encrypted in transit and protected at rest.",
      "Access to sensitive materials is limited to what is reasonably necessary to operate, secure, or support the service.",
      "We use scoped internal access practices and operational controls to reduce unnecessary exposure.",
      "We monitor and review the platform for security issues, but no internet service can promise perfect security.",
    ],
  },
  {
    icon: FiServer,
    title: "4. Service providers and infrastructure",
    color: "bg-[#d4e9ff]",
    intro:
      "Some parts of the service rely on third-party infrastructure providers.",
    items: [
      "We may use third-party providers for hosting, analytics, payments, email delivery, scheduling, storage, and AI processing.",
      "Those providers only receive the data reasonably necessary for their role in operating the service.",
      "Using the service means data may be processed by these providers as part of normal operation.",
      "We try to choose providers that are credible, practical, and appropriate for the job.",
    ],
  },
  {
    icon: FiUserCheck,
    title: "5. What we do not do",
    color: "bg-[#ffd7d2]",
    intro:
      "There are a few lines we try to keep very clear.",
    items: [
      "We do not sell your information to advertisers or data brokers.",
      "We do not treat your support content as ad inventory.",
      "We do not store your full payment card details.",
      "We do not promise that AI-generated responses are infallible or suitable for every regulated use case.",
    ],
  },
  {
    icon: FiTrash2,
    title: "6. Retention, deletion, and control",
    color: "bg-[var(--lavender)]",
    intro:
      "You should be able to remove your data and control how much remains in the system.",
    items: [
      "You can ask us to delete inquiry records or implementation materials you previously shared, subject to legal and operational limits.",
      "We may retain limited records for security, fraud prevention, billing reconciliation, or legal compliance where necessary.",
      "Where practical, we provide export paths before deletion.",
      "Deletion requests are handled according to our operational retention and backup processes, which may require some time to complete fully.",
      "If you have a privacy-related request, email us directly.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <div className="mb-10 text-center">
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border-2 border-[var(--charcoal)] bg-white px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a]">
          <FiShield className="h-3.5 w-3.5" />
          Privacy
        </div>
        <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[var(--charcoal)] sm:text-5xl">
          Privacy, without hand-waving.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-relaxed text-[var(--charcoal)]/60">
          Support Co works with support data, which often means customer conversations, billing context, and internal operational knowledge. That deserves more than a vague privacy promise.
        </p>
      </div>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <section
            key={section.title}
            className="rounded-[2rem] border-3 border-[var(--charcoal)] bg-white p-6 shadow-[0_6px_0_#1a1a1a] sm:p-8"
            style={{ transform: `rotate(${index % 2 === 0 ? "-0.35deg" : "0.35deg"})` }}
          >
            <div className="mb-5 flex items-center gap-3">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl border-2 border-[var(--charcoal)] ${section.color} shadow-[0_3px_0_#1a1a1a]`}>
                <section.icon className="h-5 w-5 text-[var(--charcoal)]" />
              </div>
              <h2 className="font-heading text-xl font-extrabold text-[var(--charcoal)] sm:text-2xl">
                {section.title}
              </h2>
            </div>
            <p className="text-sm font-semibold leading-relaxed text-[var(--charcoal)]/72">
              {section.intro}
            </p>
            <ul className="mt-4 space-y-3">
              {section.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full border border-[var(--charcoal)] bg-[var(--charcoal)]" />
                  <span className="text-sm font-semibold leading-relaxed text-[var(--charcoal)]/80">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-10 rounded-[2rem] border-3 border-[var(--charcoal)] bg-[#99e8cf] p-6 shadow-[0_6px_0_#1a1a1a] sm:p-8">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-heading text-xl font-extrabold text-[var(--charcoal)]">
              Need a privacy answer that is not covered here?
            </h3>
            <p className="mt-1 text-sm font-semibold text-[var(--charcoal)]/60">
              Ask directly. It is better to be specific than to pretend every edge case fits a template.
            </p>
          </div>
          <a
            href="mailto:hello@echobills.space"
            className="inline-flex items-center gap-2 rounded-xl border-3 border-[var(--charcoal)] bg-white px-5 py-3 font-heading font-bold text-[var(--charcoal)] shadow-[0_4px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_6px_0_#1a1a1a]"
          >
            <FiMail className="h-4 w-4" />
            hello@echobills.space
          </a>
        </div>
      </div>

      <p className="mt-8 text-center text-xs font-semibold text-[var(--charcoal)]/40">
        Last updated: March 2026
      </p>
    </>
  );
}
