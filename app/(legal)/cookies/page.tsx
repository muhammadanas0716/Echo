import type { Metadata } from "next";
import { FiInfo, FiToggleRight, FiMail, FiLock, FiBarChart2, FiSliders } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Cookie Policy - Support Co",
  description:
    "Detailed cookie and browser storage information for Support Co, including analytics, preferences, and third-party behavior.",
};

const cookies = [
  {
    icon: FiLock,
    name: "Site operation and consent memory",
    badge: "Essential",
    badgeColor: "bg-[var(--mint)]",
    description:
      "These values remember your cookie preference and help the site behave consistently from page to page.",
    details: [
      "Used to store whether you accepted or rejected the cookie banner.",
      "May support lightweight site behavior and browser compatibility.",
      "Does not turn this marketing site into a member portal.",
    ],
    canDisable: false,
  },
  {
    icon: FiBarChart2,
    name: "Analytics and diagnostics",
    badge: "Minimal",
    badgeColor: "bg-[#a6ea47]",
    description:
      "We use lightweight analytics and operational signals to understand product usage, page performance, and breakage patterns.",
    details: [
      "Used to understand which pages and features are being used.",
      "Helps identify performance issues and product problems.",
      "Not intended to power ads or cross-site profiling.",
    ],
    canDisable: false,
  },
  {
    icon: FiSliders,
    name: "Preferences and interface memory",
    badge: "Functional",
    badgeColor: "bg-[var(--sun)]",
    description:
      "Small values may be stored to remember how the interface looked or behaved the last time you used it.",
    details: [
      "Examples include UI state, basic preferences, or convenience settings.",
      "These values improve usability but are not usually security-critical.",
      "You can usually clear them in your browser settings.",
    ],
    canDisable: true,
  },
  {
    icon: FiInfo,
    name: "Third-party advertising trackers",
    badge: "None by intent",
    badgeColor: "bg-[var(--pink)]",
    description:
      "We do not intentionally run the kind of third-party ad trackers normally associated with retargeting, surveillance advertising, or behavioral profiling.",
    details: [
      "No ad-tech stack by design.",
      "No social embed tracking on these policy pages.",
      "No attempt to turn your browser into a marketing asset.",
    ],
    canDisable: false,
  },
];

export default function CookiesPage() {
  return (
    <>
      <div className="mb-10 text-center">
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border-2 border-[var(--charcoal)] bg-white px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a]">
          <FiInfo className="h-3.5 w-3.5" />
          Cookies
        </div>
        <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[var(--charcoal)] sm:text-5xl">
          Browser storage, explained plainly.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-relaxed text-[var(--charcoal)]/60">
          This page covers cookies and similar browser storage used by Support Co. The short version: we use what is needed to run the site, and we try to avoid the manipulative tracking patterns people have learned to hate.
        </p>
      </div>

      <div className="space-y-5">
        {cookies.map((cookie, index) => (
          <section
            key={cookie.name}
            className="rounded-[2rem] border-3 border-[var(--charcoal)] bg-white p-6 shadow-[0_6px_0_#1a1a1a] sm:p-8"
            style={{ transform: `rotate(${index % 2 === 0 ? "-0.3deg" : "0.3deg"})` }}
          >
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[var(--charcoal)] bg-[#d4e9ff] shadow-[0_3px_0_#1a1a1a]">
                <cookie.icon className="h-4.5 w-4.5 text-[var(--charcoal)]" />
              </div>
              <h2 className="font-heading text-lg font-extrabold text-[var(--charcoal)] sm:text-xl">
                {cookie.name}
              </h2>
              <span className={`rounded-full border-2 border-[var(--charcoal)] ${cookie.badgeColor} px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-[var(--charcoal)]`}>
                {cookie.badge}
              </span>
            </div>
            <p className="text-sm font-semibold leading-relaxed text-[var(--charcoal)]/72">
              {cookie.description}
            </p>
            <ul className="mt-4 space-y-2">
              {cookie.details.map((detail) => (
                <li key={detail} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full border border-[var(--charcoal)] bg-[var(--charcoal)]" />
                  <span className="text-sm font-semibold text-[var(--charcoal)]/78">{detail}</span>
                </li>
              ))}
            </ul>
            {cookie.canDisable && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border-2 border-[var(--charcoal)] bg-[var(--offwhite)] px-4 py-2.5">
                <FiToggleRight className="h-4 w-4 text-[var(--charcoal)]/60" />
                <span className="text-xs font-bold text-[var(--charcoal)]/60">
                  You can usually clear or disable this through your browser settings
                </span>
              </div>
            )}
          </section>
        ))}
      </div>

      <div className="mt-10 rounded-[2rem] border-3 border-[var(--charcoal)] bg-[#fef3c7] p-6 shadow-[0_6px_0_#1a1a1a] sm:p-8">
        <h3 className="font-heading text-xl font-extrabold text-[var(--charcoal)]">The useful version</h3>
        <div className="mt-4 space-y-3 text-sm font-semibold leading-relaxed text-[var(--charcoal)]/72">
          <p>
            Some browser storage is necessary for consent memory and basic site behavior. Some storage helps with diagnostics and product improvement. Some just remembers preferences.
          </p>
          <p>
            What we try not to do is use browser storage as a backdoor to run a surveillance-style marketing system. If that ever changes materially, this page should change too.
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
