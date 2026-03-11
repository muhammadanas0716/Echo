import type { Metadata } from "next";
import Link from "next/link";
import {
  FiArrowRight,
  FiHeart,
  FiTarget,
  FiMail,
  FiCode,
  FiMessageCircle,
  FiShield,
} from "react-icons/fi";

export const metadata: Metadata = {
  title: "About Support Co - Why this exists",
  description:
    "A more honest look at why Support Co exists, what it is trying to solve, and how it is being built.",
};

const principles = [
  {
    icon: FiTarget,
    title: "Truth beats polish",
    description:
      "A smooth-looking bot that gives the wrong answer is worse than a slower experience that stays grounded in real product knowledge.",
    color: "bg-[var(--mint)]",
  },
  {
    icon: FiMessageCircle,
    title: "Support is not just chat",
    description:
      "Real support work includes policies, refunds, billing edge cases, technical troubleshooting, and emotionally tense moments. We try to respect that complexity.",
    color: "bg-[var(--pink)]",
  },
  {
    icon: FiCode,
    title: "The codebase matters",
    description:
      "Too many support tools act like the product ends at the help center. In reality, the codebase often contains the clearest picture of what actually ships.",
    color: "bg-[var(--sun)]",
  },
  {
    icon: FiShield,
    title: "Trust is a feature",
    description:
      "If customers and teams are going to route sensitive support questions through AI, the product has to take privacy, scope, and security seriously from the start.",
    color: "bg-[var(--lavender)]",
  },
];

const realityChecks = [
  "This is not pretending to be a giant enterprise platform with a hundred departments behind it.",
  "It is being built carefully, in the open, with a bias toward useful product behavior over inflated claims.",
  "Some parts are opinionated because support systems become messy fast when everything is allowed to mix together.",
  "The goal is not to automate humans away. The goal is to remove repetitive noise so humans can focus on the difficult cases.",
];

export default function AboutPage() {
  return (
    <>
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border-2 border-[var(--charcoal)] bg-white px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a]">
          <FiHeart className="h-3.5 w-3.5" />
          About
        </div>
        <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[var(--charcoal)] sm:text-5xl">
          A more honest version
          <br />
          of why this exists.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-relaxed text-[var(--charcoal)]/60">
          Support Co exists because most AI support products still feel too detached from the actual work of support. They look impressive in demos, but the moment a customer asks something messy, cross-functional, or specific to the real product, the illusion breaks.
        </p>
      </div>

      <div className="rounded-[2rem] border-3 border-[var(--charcoal)] bg-white p-6 shadow-[0_7px_0_#1a1a1a] sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h2 className="font-heading text-2xl font-extrabold text-[var(--charcoal)] sm:text-3xl">
              What kept feeling wrong
            </h2>
            <div className="mt-5 space-y-4 text-sm font-semibold leading-relaxed text-[var(--charcoal)]/72">
              <p>
                Most companies do not have one clean source of truth. They have fragments. A help center. Internal docs. Slack decisions. Ticket macros. Billing rules. Store policies. Release notes. Product behavior that only makes full sense if you read the code.
              </p>
              <p>
                Customers do not care where the answer lives. They just want a correct answer now. That means support teams end up doing translation work all day: taking scattered internal knowledge and converting it into something reliable and fast.
              </p>
              <p>
                A lot of AI support tools flatten that reality into one general-purpose bot. That sounds efficient, but it often creates a different problem: everything starts bleeding into everything else. Billing logic interferes with product answers. Refund policy language leaks into onboarding replies. Internal notes get mixed with public-facing guidance.
              </p>
              <p>
                Support Co is built around the idea that support systems need structure, routing, and scoped knowledge. One front door. Multiple specialist agents. Clear boundaries between what each agent should know and what it should not.
              </p>
            </div>
          </div>

          <div className="rounded-[1.8rem] border-3 border-[var(--charcoal)] bg-[#d4e9ff] p-6 shadow-[0_6px_0_#1a1a1a]">
            <span className="inline-flex rounded-full border-2 border-[var(--charcoal)] bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[var(--charcoal)]">
              Reality Check
            </span>
            <ul className="mt-5 space-y-3">
              {realityChecks.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border border-[var(--charcoal)] bg-[var(--charcoal)]" />
                  <span className="text-sm font-semibold leading-relaxed text-[var(--charcoal)]/72">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-xl border-2 border-[var(--charcoal)] bg-white px-4 py-3 shadow-[0_3px_0_#1a1a1a]">
              <p className="text-xs font-black uppercase tracking-widest text-[var(--charcoal)]/50">
                What this means in practice
              </p>
              <p className="mt-2 text-sm font-semibold text-[var(--charcoal)]/72">
                The product is trying to be dependable before it tries to be huge.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-[2rem] border-3 border-[var(--charcoal)] bg-[#99e8cf] p-6 shadow-[0_7px_0_#1a1a1a] sm:p-10">
        <h2 className="font-heading text-2xl font-extrabold text-[var(--charcoal)] sm:text-3xl">
          What Support Co is trying to be
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {[
            "A place where support knowledge can stay structured instead of collapsing into one giant prompt.",
            "A workflow where one main chatbot can route incoming questions to the right specialist agent.",
            "A system where billing, product, onboarding, and policy answers can live in separate scopes.",
            "A product that takes security, encryption, and controlled access seriously because support data is not trivial.",
          ].map((item, index) => (
            <div
              key={item}
              className="rounded-2xl border-3 border-[var(--charcoal)] bg-white p-5 shadow-[0_5px_0_#1a1a1a]"
              style={{ transform: `rotate(${index % 2 === 0 ? "-1deg" : "1deg"})` }}
            >
              <p className="text-sm font-semibold leading-relaxed text-[var(--charcoal)]/75">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 space-y-5">
        <h2 className="text-center font-heading text-2xl font-extrabold text-[var(--charcoal)]">
          Principles behind the product
        </h2>
        {principles.map((item) => (
          <div
            key={item.title}
            className="flex items-start gap-4 rounded-2xl border-3 border-[var(--charcoal)] bg-white p-5 shadow-[0_5px_0_#1a1a1a] sm:p-6"
          >
            <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border-2 border-[var(--charcoal)] ${item.color} shadow-[0_3px_0_#1a1a1a]`}>
              <item.icon className="h-5 w-5 text-[var(--charcoal)]" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-extrabold text-[var(--charcoal)]">{item.title}</h3>
              <p className="mt-1 text-sm font-semibold leading-relaxed text-[var(--charcoal)]/62">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-[2rem] border-3 border-[var(--charcoal)] bg-[#fef3c7] p-6 shadow-[0_8px_0_#1a1a1a] sm:p-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h2 className="font-heading text-2xl font-extrabold text-[var(--charcoal)] sm:text-3xl">
              Still early. Still serious.
            </h2>
            <p className="mt-3 text-sm font-semibold leading-relaxed text-[var(--charcoal)]/72">
              The honest version is simple: this product is still early, still evolving, and still opinionated. But that is also the point. It is being shaped around real support constraints instead of being polished into something vague enough to impress everyone for ten seconds.
            </p>
            <p className="mt-3 text-sm font-semibold leading-relaxed text-[var(--charcoal)]/72">
              If that approach matches how you think about support, it will probably make sense. If you need a giant all-things-to-all-teams platform right this second, it may not. Better to be clear about that than to fake certainty.
            </p>
          </div>
          <div className="rounded-[1.6rem] border-3 border-[var(--charcoal)] bg-white p-5 shadow-[0_5px_0_#1a1a1a]">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
              Reach out directly
            </p>
            <p className="mt-3 text-sm font-semibold leading-relaxed text-[var(--charcoal)]/72">
              If you want to talk about how you handle support today, what your edge cases are, or where AI keeps failing your team, that is the most useful conversation to have.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-3 border-[var(--charcoal)] bg-[#a6ea47] px-5 py-3 font-heading text-sm font-extrabold text-[var(--charcoal)] shadow-[0_5px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_7px_0_#1a1a1a]"
              >
                See pricing <FiArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="mailto:hello@echobills.space?subject=Support%20Co%20Demo"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-3 border-[var(--charcoal)] bg-white px-5 py-3 font-heading text-sm font-bold text-[var(--charcoal)] shadow-[0_5px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_7px_0_#1a1a1a]"
              >
                <FiMail className="h-4 w-4" />
                Book demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
