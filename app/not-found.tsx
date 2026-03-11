"use client";

import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft, FiCompass, FiHome, FiSearch } from "react-icons/fi";

const quickLinks = [
  { label: "Go home", href: "/", icon: FiHome, bg: "bg-[#a6ea47]" },
  { label: "See pricing", href: "/pricing", icon: FiSearch, bg: "bg-[#d4e9ff]" },
  { label: "Read about us", href: "/about", icon: FiCompass, bg: "bg-[#fef3c7]" },
];

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[linear-gradient(170deg,#90ddf0_0%,#b8edfb_46%,#d4f8ff_100%)] px-4 py-14">
      <div className="pointer-events-none absolute inset-0 dotted-sea opacity-[0.08]" />

      <Image src="/clouds/cloud1.svg" alt="" aria-hidden width={220} height={120} className="pointer-events-none absolute left-[5%] top-[12%] w-24 opacity-45 ocean-float sm:w-32" />
      <Image src="/clouds/cloud2.svg" alt="" aria-hidden width={220} height={120} className="pointer-events-none absolute right-[8%] top-[18%] w-18 opacity-35 ocean-float-delayed sm:w-24" />
      <Image src="/clouds/cloud3.svg" alt="" aria-hidden width={220} height={120} className="pointer-events-none absolute bottom-[16%] left-[12%] w-16 opacity-30 ocean-float-fast sm:w-20" />
      <Image src="/clouds/cloud4.svg" alt="" aria-hidden width={220} height={120} className="pointer-events-none absolute bottom-[12%] right-[10%] w-20 opacity-30 ocean-float sm:w-24" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="text-center lg:text-left">
            <div className="relative mb-6 inline-block">
              <div className="absolute -inset-2 rounded-[2rem] border-3 border-[var(--charcoal)] bg-[var(--charcoal)]" />
              <div className="relative rounded-[2rem] border-3 border-[var(--charcoal)] bg-[var(--pink)] px-10 py-6">
                <p className="select-none font-heading text-8xl font-black leading-none text-[var(--charcoal)] sm:text-9xl">
                  404
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--charcoal)] bg-white px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a]">
              <span className="h-2 w-2 rounded-full bg-[var(--coral)]" />
              Page not found
            </div>
            <h1 className="mt-5 font-heading text-3xl font-extrabold tracking-tight text-[var(--charcoal)] sm:text-5xl">
              This page is not here.
            </h1>
            <p className="mt-4 max-w-lg text-sm font-semibold leading-relaxed text-[var(--charcoal)]/65">
              The link may be outdated, the page may have moved, or it may never have existed in the first place. The good news is the rest of the site should still be fine.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl border-3 border-[var(--charcoal)] bg-[#a6ea47] px-6 py-3 font-heading text-sm font-extrabold text-[var(--charcoal)] shadow-[0_5px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_7px_0_#1a1a1a]"
              >
                <FiHome className="h-4 w-4" />
                Go home
              </Link>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 rounded-xl border-3 border-[var(--charcoal)] bg-white px-6 py-3 font-heading text-sm font-bold text-[var(--charcoal)] shadow-[0_5px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_7px_0_#1a1a1a]"
              >
                <FiArrowLeft className="h-4 w-4" />
                Go back
              </button>
            </div>
          </div>

          <div className="rounded-[2rem] border-3 border-[var(--charcoal)] bg-white p-6 shadow-[0_8px_0_#1a1a1a] sm:p-8">
            <h2 className="font-heading text-xl font-extrabold text-[var(--charcoal)] sm:text-2xl">
              Try one of these instead
            </h2>
            <div className="mt-5 grid gap-4">
              {quickLinks.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-4 rounded-2xl border-3 border-[var(--charcoal)] ${item.bg} p-4 shadow-[0_5px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_7px_0_#1a1a1a]`}
                  style={{ transform: `rotate(${index === 1 ? "0.6deg" : "-0.6deg"})` }}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-[var(--charcoal)] bg-white shadow-[0_3px_0_#1a1a1a]">
                    <item.icon className="h-4.5 w-4.5 text-[var(--charcoal)]" />
                  </div>
                  <div>
                    <p className="font-heading text-base font-extrabold text-[var(--charcoal)]">{item.label}</p>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--charcoal)]/50">
                      {item.href}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6 rounded-xl border-2 border-[var(--charcoal)] bg-[#d4e9ff] px-4 py-3 shadow-[0_3px_0_#1a1a1a]">
              <p className="text-xs font-black uppercase tracking-widest text-[var(--charcoal)]/50">
                Helpful note
              </p>
              <p className="mt-1 text-sm font-semibold text-[var(--charcoal)]/70">
                If you arrived from an old bookmark or shared link, the page structure may have changed during the repurpose.
              </p>
            </div>
          </div>
        </div>
      </div>

      <svg className="pointer-events-none absolute bottom-0 left-0 h-20 w-full text-[#7fd7b8]" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path fill="currentColor" d="M0,30 C90,0 180,60 270,30 C360,0 450,60 540,30 C630,0 720,60 810,30 C900,0 990,60 1080,30 C1170,0 1260,60 1350,30 C1410,10 1440,30 1440,30 L1440,80 L0,80 Z" />
      </svg>
    </div>
  );
}
