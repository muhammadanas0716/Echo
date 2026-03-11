"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiRefreshCw, FiHome, FiMail } from "react-icons/fi";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#1c3d98_0%,#264fbe_45%,#153175_100%)] px-4 py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.12),transparent_28%),radial-gradient(circle_at_78%_76%,rgba(255,255,255,0.08),transparent_32%)]" />
      <Image src="/clouds/cloud2.svg" alt="" aria-hidden width={220} height={120} className="pointer-events-none absolute left-[6%] top-16 w-18 opacity-20 ocean-float" />
      <Image src="/clouds/cloud4.svg" alt="" aria-hidden width={220} height={120} className="pointer-events-none absolute right-[8%] bottom-20 w-20 opacity-15 ocean-float-delayed" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] max-w-4xl items-center justify-center">
        <div className="grid w-full gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="text-center lg:text-left">
            <p className="font-heading text-[7rem] font-black leading-none text-white/10 sm:text-[10rem]">
              500
            </p>
            <div className="inline-flex rounded-full border-2 border-white/15 bg-white/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-white/80">
              Server error
            </div>
            <h1 className="mt-5 font-heading text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Something broke on our side.
            </h1>
            <p className="mt-4 max-w-lg text-sm font-semibold leading-relaxed text-white/72">
              The request reached the app, but something failed before we could finish the page. Try again first. If the issue keeps happening, there is probably a real bug worth reporting.
            </p>
          </div>

          <div className="rounded-[2rem] border-3 border-[var(--charcoal)] bg-[#d6e2ff] p-6 shadow-[0_10px_0_#1a1a1a] sm:p-8">
            <h2 className="font-heading text-xl font-extrabold text-[var(--charcoal)] sm:text-2xl">
              What you can do now
            </h2>
            <div className="mt-5 grid gap-4">
              <button
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 rounded-xl border-3 border-[var(--charcoal)] bg-[#a6ea47] px-5 py-3 font-heading text-sm font-extrabold text-[var(--charcoal)] shadow-[0_5px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_7px_0_#1a1a1a]"
              >
                <FiRefreshCw className="h-4 w-4" />
                Try again
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-3 border-[var(--charcoal)] bg-white px-5 py-3 font-heading text-sm font-bold text-[var(--charcoal)] shadow-[0_5px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_7px_0_#1a1a1a]"
              >
                <FiHome className="h-4 w-4" />
                Go home
              </Link>
              <a
                href="mailto:hello@echobills.space?subject=Support%20Co%20Error%20Report"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-3 border-[var(--charcoal)] bg-[#fef3c7] px-5 py-3 font-heading text-sm font-bold text-[var(--charcoal)] shadow-[0_5px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_7px_0_#1a1a1a]"
              >
                <FiMail className="h-4 w-4" />
                Report it
              </a>
            </div>

            <div className="mt-6 rounded-xl border-2 border-[var(--charcoal)] bg-white px-4 py-3 shadow-[0_3px_0_#1a1a1a]">
              <p className="text-[10px] font-black uppercase tracking-widest text-[var(--charcoal)]/50">
                What happened
              </p>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-[var(--charcoal)]/72">
                This page is shown when the route crashed after loading started. It is not necessarily your fault, and retrying may work if the failure was temporary.
              </p>
            </div>

            {process.env.NODE_ENV === "development" && error.message && (
              <div className="mt-6 rounded-xl border-2 border-[var(--charcoal)] bg-[#1a1a1a] px-4 py-3 shadow-[0_3px_0_#1a1a1a]">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/50">
                  Dev detail
                </p>
                <p className="mt-2 break-all font-mono text-xs text-white/80">{error.message}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
