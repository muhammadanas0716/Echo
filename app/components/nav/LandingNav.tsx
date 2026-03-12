"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { publicLinks } from "@/lib/site-links";

type LandingNavProps = {
  variant?: "default" | "ocean";
  brandName?: string;
  brandAlt?: string;
  primaryLabel?: string;
  primaryHref?: string;
};

export default function LandingNav({
  variant = "ocean",
  brandName = "Echo",
  brandAlt = "Echo logo",
  primaryLabel = "Start Free",
  primaryHref = publicLinks.getStarted,
}: LandingNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const isOcean = variant === "ocean";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 z-50 ${
        isOcean
          ? "top-0 bg-transparent px-4 pt-4 sm:px-6"
          : "top-0 border-b-3 border-[var(--charcoal)] bg-[var(--offwhite)]/80 backdrop-blur-sm"
      }`}
    >
      {!isOcean && (
        <div className="border-b border-white/15 bg-gradient-to-r from-purple-700 via-purple-600 to-fuchsia-600 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-2 py-2 text-xs font-semibold tracking-wide sm:text-sm">
              <span className="rounded-full border border-white/40 bg-white/15 px-2 py-0.5 text-[10px] uppercase sm:text-xs">
                Lifetime Deal
              </span>
              <span className="font-black">$39</span>
              <span className="opacity-90">one-time payment</span>
            </div>
          </div>
        </div>
      )}

      <div
        className={`mx-auto transition-all duration-500 ease-out ${
          isOcean ? (scrolled ? "max-w-3xl" : "max-w-6xl") : "max-w-7xl px-4 sm:px-6 lg:px-8"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 ease-out ${
            isOcean
              ? `rounded-[2rem] border-2 border-[var(--charcoal)] bg-white px-4 shadow-[0_6px_0_#1a1a1a] sm:px-6 ${
                  scrolled ? "min-h-[3.5rem]" : "min-h-[4.7rem]"
                }`
              : "h-16 sm:h-20"
          }`}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="group pointer-events-auto flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 sm:gap-3"
            >
              <div
                className={`flex items-center justify-center overflow-hidden ${
                  isOcean
                    ? "h-11 w-11 rounded-xl border-2 border-[var(--charcoal)] bg-[var(--mint)]"
                    : "h-10 w-10 rounded-xl border-2 border-[var(--charcoal)] bg-[var(--pink)] shadow-[0_2px_0_#000] transition-all group-hover:shadow-[0_4px_0_#000] sm:h-12 sm:w-12 sm:border-3"
                }`}
              >
                <Image
                  src="/logo.png"
                  alt={brandAlt}
                  width={44}
                  height={44}
                  className="h-full w-full object-cover"
                />
              </div>
              <span
                className={`font-heading font-black text-[var(--charcoal)] transition-opacity hover:opacity-80 ${
                  isOcean ? "text-2xl" : "text-xl sm:text-2xl"
                }`}
              >
                {brandName}
              </span>
            </Link>
          </div>

          <div
            className={`pointer-events-auto flex items-center ${
              isOcean ? "gap-2 sm:gap-3" : "gap-2 sm:gap-4"
            }`}
          >
            <Link
              href="/pricing"
              className={`hidden rounded-xl border-2 border-transparent px-3.5 py-2 font-bold text-[var(--charcoal)] transition sm:block ${
                isOcean ? "text-sm hover:border-[var(--charcoal)]/30 hover:bg-[var(--charcoal)]/5" : "text-sm hover:bg-[var(--charcoal)]/5"
              }`}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className={`hidden rounded-xl border-2 border-transparent px-3.5 py-2 font-bold text-[var(--charcoal)] transition md:block ${
                isOcean ? "text-sm hover:border-[var(--charcoal)]/30 hover:bg-[var(--charcoal)]/5" : "text-sm hover:bg-[var(--charcoal)]/5"
              }`}
            >
              About
            </Link>
            <Link
              href={publicLinks.login}
              className={`hidden rounded-xl border-2 border-transparent px-3.5 py-2 font-bold text-[var(--charcoal)] transition 2xl:block ${
                isOcean ? "text-sm hover:border-[var(--charcoal)]/30 hover:bg-[var(--charcoal)]/5" : "text-sm hover:bg-[var(--charcoal)]/5"
              }`}
            >
              Log In
            </Link>
            <Link
              href={publicLinks.demoNote}
              className={`hidden rounded-xl border-2 border-[var(--charcoal)] font-bold text-[var(--charcoal)] transition xl:block ${
                isOcean
                  ? "bg-white px-4 py-2 text-sm shadow-[0_3px_0_#1a1a1a] hover:-translate-y-0.5 hover:shadow-[0_5px_0_#1a1a1a]"
                  : "bg-white px-4 py-2 text-sm shadow-[0_2px_0_#000] hover:-translate-y-0.5 hover:bg-[var(--offwhite)]"
              }`}
            >
              Docs
            </Link>
            <Link
              href={primaryHref}
              className={`rounded-xl border-2 border-[var(--charcoal)] font-bold text-[var(--charcoal)] transition ${
                isOcean
                  ? "bg-[#a6ea47] px-4 py-2 text-sm shadow-[0_4px_0_#1a1a1a] hover:-translate-y-0.5 hover:bg-[var(--mint)] hover:shadow-[0_6px_0_#1a1a1a] sm:px-5"
                  : "bg-[var(--pink)] px-4 py-2 text-sm shadow-[0_2px_0_#000] hover:-translate-y-0.5 hover:bg-[var(--mint)] hover:shadow-[0_4px_0_#000] sm:px-6 sm:py-2.5 sm:text-base sm:border-3"
              }`}
            >
              {primaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
