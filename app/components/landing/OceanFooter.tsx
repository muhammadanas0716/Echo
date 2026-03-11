import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiMail, FiZap, FiShield, FiBarChart2 } from "react-icons/fi";

const HIGHLIGHTS = [
  { icon: FiZap, text: "Website chatbots", color: "bg-[var(--sun)]" },
  { icon: FiShield, text: "Shopify support", color: "bg-[var(--mint)]" },
  { icon: FiBarChart2, text: "Discord bots", color: "bg-[var(--pink)]" },
  { icon: FiMail, text: "Slack bots soon", color: "bg-[var(--lavender)]" },
];

export default function OceanFooter() {
  return (
    <footer className="relative overflow-hidden border-t-3 border-[var(--charcoal)] bg-[linear-gradient(180deg,#90ddf0_0%,#b8edfb_40%,#d4f8ff_100%)]">
      <div className="pointer-events-none absolute inset-0 dotted-sea opacity-40" />

      <Image
        src="/clouds/cloud1.svg"
        alt=""
        aria-hidden
        width={220}
        height={120}
        className="pointer-events-none absolute right-[3%] top-12 w-20 sm:w-32 ocean-float opacity-60"
      />
      <Image
        src="/clouds/cloud3.svg"
        alt=""
        aria-hidden
        width={220}
        height={120}
        className="pointer-events-none absolute left-[4%] top-16 w-16 sm:w-24 ocean-float-delayed opacity-50"
      />
      <Image
        src="/clouds/cloud2.svg"
        alt=""
        aria-hidden
        width={220}
        height={120}
        className="pointer-events-none absolute left-[40%] top-8 w-14 sm:w-20 ocean-float-fast opacity-40"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-10 pt-24 sm:px-8">
        <div className="rounded-[2rem] border-3 border-[var(--charcoal)] bg-[#99e8cf] p-8 shadow-[0_10px_0_#1a1a1a] sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
            <div>
              <div className="mb-3 inline-flex rounded-full border-2 border-[var(--charcoal)] bg-white px-3 py-1 text-xs font-black uppercase tracking-wider text-[var(--charcoal)]">
                Ready to launch
              </div>
              <h2 className="font-heading text-3xl font-extrabold leading-tight text-[var(--charcoal)] sm:text-4xl lg:text-5xl">
                Give your support team an AI layer that understands the work.
              </h2>
              <p className="mt-3 max-w-lg text-base font-semibold text-[var(--charcoal)]/60">
                From ecommerce questions to product troubleshooting, Echo helps customers self-serve while keeping humans focused on the hard cases.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="mailto:hello@echobills.space?subject=Echo%20Demo"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-3 border-[var(--charcoal)] bg-[#a6ea47] px-6 py-4 font-heading text-lg font-extrabold text-[var(--charcoal)] shadow-[0_5px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_7px_0_#1a1a1a]"
              >
                Book demo <FiArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-xl border-3 border-[var(--charcoal)] bg-white px-6 py-4 font-bold text-[var(--charcoal)] shadow-[0_5px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_7px_0_#1a1a1a]"
              >
                See pricing
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((h) => (
            <div
              key={h.text}
              className={`flex items-center gap-3 rounded-xl border-3 border-[var(--charcoal)] ${h.color} px-4 py-3.5 shadow-[0_4px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_6px_0_#1a1a1a]`}
            >
              <h.icon className="h-5 w-5 text-[var(--charcoal)]" />
              <span className="text-sm font-bold text-[var(--charcoal)]">{h.text}</span>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
          <div className="shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border-3 border-[var(--charcoal)] bg-[var(--mint)] shadow-[0_4px_0_#1a1a1a]">
                <Image src="/logo.png" alt="Echo" width={56} height={56} className="h-full w-full object-cover" />
              </div>
              <span className="font-heading text-3xl font-extrabold text-[var(--charcoal)]">Echo</span>
            </div>
            <p className="mt-4 max-w-xs text-sm font-semibold leading-relaxed text-[var(--charcoal)]/60">
              Custom AI support agents for websites, Shopify stores, product docs, and echommunities.
            </p>
            <div className="mt-4 flex gap-2">
              <a
                href="https://x.com/echobills"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-[var(--charcoal)] bg-white text-xs font-black text-[var(--charcoal)] shadow-[0_2px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:bg-[var(--pink)] hover:shadow-[0_3px_0_#1a1a1a]"
                aria-label="X / Twitter"
              >
                X
              </a>
              <a
                href="mailto:hello@echobills.space"
                className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-[var(--charcoal)] bg-white shadow-[0_2px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:bg-[var(--sun)] hover:shadow-[0_3px_0_#1a1a1a]"
                aria-label="Email"
              >
                <FiMail className="h-4 w-4 text-[var(--charcoal)]" />
              </a>
            </div>
          </div>

          <div className="flex flex-1 flex-wrap gap-x-10 gap-y-6">
            <div>
              <h4 className="mb-3 text-[10px] font-black uppercase tracking-widest text-[var(--charcoal)]/40">Product</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Pricing", href: "/pricing" },
                  { label: "Book demo", href: "mailto:hello@echobills.space?subject=Echo%20Demo" },
                  { label: "About", href: "/about" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="rounded-lg border-2 border-[var(--charcoal)] bg-white px-3 py-1.5 text-xs font-bold text-[var(--charcoal)] shadow-[0_2px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:bg-[var(--mint)] hover:shadow-[0_3px_0_#1a1a1a]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-3 text-[10px] font-black uppercase tracking-widest text-[var(--charcoal)]/40">Legal</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "About", href: "/about" },
                  { label: "Privacy", href: "/privacy" },
                  { label: "Terms", href: "/terms" },
                  { label: "Cookies", href: "/cookies" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="rounded-lg border-2 border-[var(--charcoal)] bg-white px-3 py-1.5 text-xs font-bold text-[var(--charcoal)] shadow-[0_2px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:bg-[var(--lavender)] hover:shadow-[0_3px_0_#1a1a1a]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-3 text-[10px] font-black uppercase tracking-widest text-[var(--charcoal)]/40">Reach us</h4>
              <div className="flex flex-wrap gap-2">
                <a
                  href="mailto:hello@echobills.space"
                  className="rounded-lg border-2 border-[var(--charcoal)] bg-[var(--sun)] px-3 py-1.5 text-xs font-bold text-[var(--charcoal)] shadow-[0_2px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_3px_0_#1a1a1a]"
                >
                  hello@echobills.space
                </a>
                <a
                  href="https://x.com/echobills"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border-2 border-[var(--charcoal)] bg-[var(--pink)] px-3 py-1.5 text-xs font-bold text-[var(--charcoal)] shadow-[0_2px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_3px_0_#1a1a1a]"
                >
                  Follow on X
                </a>
              </div>
            </div>
          </div>

          <div className="shrink-0">
            <div className="rounded-xl border-2 border-[var(--charcoal)] bg-white p-3 shadow-[0_3px_0_#1a1a1a]">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#a6ea47]" />
                <span className="text-[10px] font-black uppercase tracking-wider text-[var(--charcoal)]/60">
                  All systems operational
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-[1.5rem] border-3 border-[var(--charcoal)] bg-white/70 px-6 py-5 shadow-[0_3px_0_#1a1a1a]">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-[var(--charcoal)]/50">© {new Date().getFullYear()} Echo</span>
              <span className="hidden h-1 w-1 rounded-full bg-[var(--charcoal)]/30 sm:block" />
              <span className="hidden text-sm font-semibold text-[var(--charcoal)]/50 sm:block">
                Built for teams turning support into a product advantage.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full border-2 border-[var(--charcoal)] bg-[#a6ea47] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[var(--charcoal)]">
                Custom setup
              </span>
              <span className="rounded-full border-2 border-[var(--charcoal)] bg-[var(--sun)] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[var(--charcoal)]">
                Website + Shopify
              </span>
              <span className="rounded-full border-2 border-[var(--charcoal)] bg-[var(--mint)] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[var(--charcoal)]">
                Slack soon
              </span>
            </div>
          </div>
        </div>
      </div>

      <svg
        className="pointer-events-none relative z-0 -mb-px h-16 w-full text-[#7fd7b8]"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path fill="currentColor" d="M0,30 C90,0 180,60 270,30 C360,0 450,60 540,30 C630,0 720,60 810,30 C900,0 990,60 1080,30 C1170,0 1260,60 1350,30 C1410,10 1440,30 1440,30 L1440,80 L0,80 Z" />
      </svg>
    </footer>
  );
}
