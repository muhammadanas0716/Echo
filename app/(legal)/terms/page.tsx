import type { Metadata } from "next";
import {
  FiFileText,
  FiCheckCircle,
  FiAlertCircle,
  FiRefreshCw,
  FiXCircle,
  FiMail,
  FiShield,
} from "react-icons/fi";

export const metadata: Metadata = {
  title: "Terms of Service - Echo",
  description:
    "Detailed Terms of Service for Echo, including service usage, payments, customer content, and AI limitations.",
};

const sections = [
  {
    icon: FiCheckCircle,
    title: "1. The service",
    color: "bg-[var(--mint)]",
    intro:
      "Echo provides software for creating, managing, and operating AI-assisted support workflows.",
    points: [
      "The service may include AI support agents, knowledge ingestion, agent configuration, routing logic, analytics, credits, and related support tooling.",
      "Some features are available on free plans, while others require a paid plan or future rollout.",
      "We may add, remove, rename, or change features as the product evolves.",
      "The service is offered on an as-available basis and may improve, change, or occasionally break while it is being actively developed.",
    ],
  },
  {
    icon: FiShield,
    title: "2. Your access and materials",
    color: "bg-[#d4e9ff]",
    intro:
      "You are responsible for the information, materials, and instructions you provide to us.",
    points: [
      "You must provide accurate contact and billing information.",
      "If teammates or contractors work with us through your organization, you are responsible for making sure they are authorized to do so.",
      "You are responsible for what your agents are configured to say, route, or surface based on the content you provide.",
      "You should promptly tell us if shared materials were sent in error or should no longer be used.",
    ],
  },
  {
    icon: FiAlertCircle,
    title: "3. Customer content and acceptable use",
    color: "bg-[var(--sun)]",
    intro:
      "You keep ownership of your content, but you need the right to use whatever you connect or upload.",
    points: [
      "You retain ownership of the materials you upload or connect, including documentation, policies, transcripts, FAQs, and related echontent.",
      "You give us the limited rights needed to host, process, index, route, and display that content in order to operate the service for you.",
      "You must not upload content you do not have rights to use.",
      "You must not use the service for unlawful activity, abusive automation, malware, spam, harassment, credential theft, or attempts to gain unauthorized access.",
      "You must not intentionally configure agents to mislead users in ways that create fraud, legal exposure, or material harm.",
    ],
  },
  {
    icon: FiRefreshCw,
    title: "4. Payments, credits, and refunds",
    color: "bg-[var(--pink)]",
    intro:
      "Paid plans and credit packs are governed by the pricing displayed at purchase time.",
    points: [
      "Free access remains free unless you choose to upgrade.",
      "Paid plans may be monthly, lifetime, or another format clearly displayed at checkout.",
      "AI credits or similar usage-based entitlements may be required for certain features.",
      "Payments are processed by third-party providers such as Polar. We do not store your full card details.",
      "Refunds are handled according to the pricing page or any separate written agreement.",
      "If a payment fails, paid features may be limited, paused, or removed until the issue is resolved.",
    ],
  },
  {
    icon: FiXCircle,
    title: "5. AI limitations and your responsibility",
    color: "bg-[var(--lavender)]",
    intro:
      "AI systems can be useful and still be imperfect. That reality matters here.",
    points: [
      "Echo can help route, draft, summarize, and answer support questions, but it may still generate incomplete or incorrect output.",
      "You are responsible for deciding how much autonomy your agents have and whether certain workflows require human review.",
      "The service should not be treated as legal, medical, financial, or other regulated professional advice unless you separately validate it for that use.",
      "You should review high-risk workflows, especially where refunds, access permissions, compliance issues, or irreversible actions are involved.",
    ],
  },
  {
    icon: FiFileText,
    title: "6. Suspension, termination, and changes",
    color: "bg-[#ffd7d2]",
    intro:
      "Either side can end the relationship, but there are some rules around how that works.",
    points: [
      "You can stop using the service at any time.",
      "We may suspend or terminate service for customers that violate these terms, create security risk, or abuse the platform.",
      "We may change the service, the terms, or the pricing from time to time. Material changes will be reflected on the site or otherwise communicated where appropriate.",
      "If the service is discontinued, we will try to provide reasonable notice and practical export access where feasible.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <div className="mb-10 text-center">
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border-2 border-[var(--charcoal)] bg-white px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a]">
          <FiFileText className="h-3.5 w-3.5" />
          Terms
        </div>
        <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[var(--charcoal)] sm:text-5xl">
          Terms, written like a human.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-relaxed text-[var(--charcoal)]/60">
          These terms are meant to be readable. They still matter legally, but the intent is simple: be clear about what the service does, what you are responsible for, and what we are responsible for.
        </p>
      </div>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <section
            key={section.title}
            className="rounded-[2rem] border-3 border-[var(--charcoal)] bg-white p-6 shadow-[0_6px_0_#1a1a1a] sm:p-8"
            style={{ transform: `rotate(${index % 2 === 0 ? "-0.4deg" : "0.4deg"})` }}
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
              {section.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full border border-[var(--charcoal)] bg-[var(--charcoal)]" />
                  <span className="text-sm font-semibold leading-relaxed text-[var(--charcoal)]/80">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-10 rounded-[2rem] border-3 border-[var(--charcoal)] bg-[#d4e9ff] p-6 shadow-[0_6px_0_#1a1a1a] sm:p-8">
        <h3 className="font-heading text-xl font-extrabold text-[var(--charcoal)]">The practical summary</h3>
        <div className="mt-4 space-y-3 text-sm font-semibold leading-relaxed text-[var(--charcoal)]/72">
          <p>
            Use the product in good faith. Upload only content you are allowed to use. Understand that AI can still make mistakes. Review high-risk workflows carefully.
          </p>
          <p>
            We will keep building the service, securing it, and trying to communicate changes clearly. We are not promising perfection, but we are promising that the product will not be framed as something simpler or safer than it really is.
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <a
          href="mailto:hello@echobills.space"
          className="inline-flex items-center gap-2 rounded-xl border-3 border-[var(--charcoal)] bg-white px-5 py-3 font-heading font-bold text-[var(--charcoal)] shadow-[0_4px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_6px_0_#1a1a1a]"
        >
          <FiMail className="h-4 w-4" />
          Questions? hello@echobills.space
        </a>
        <p className="mt-4 text-xs font-semibold text-[var(--charcoal)]/40">
          Last updated: March 2026
        </p>
      </div>
    </>
  );
}
