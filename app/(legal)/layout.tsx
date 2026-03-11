import Image from "next/image";
import Link from "next/link";
import LandingNav from "../components/nav/LandingNav";
import OceanFooter from "../components/landing/OceanFooter";
import { publicLinks } from "@/lib/site-links";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LandingNav
        variant="ocean"
        brandName="Echo"
        brandAlt="Echo logo"
        primaryLabel="Start Free"
        primaryHref={publicLinks.getStarted}
      />
      <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#90ddf0_0%,#b8edfb_54%,#d4f8ff_100%)]">
        <div className="pointer-events-none absolute inset-0 dotted-sea opacity-50" />

        <Image src="/clouds/cloud1.svg" alt="" aria-hidden width={220} height={120} className="pointer-events-none absolute left-[3%] top-28 w-20 sm:w-32 ocean-float opacity-60" />
        <Image src="/clouds/cloud2.svg" alt="" aria-hidden width={220} height={120} className="pointer-events-none absolute right-[5%] top-36 w-16 sm:w-28 ocean-float-delayed opacity-50" />

        <div className="relative z-10 mx-auto max-w-4xl px-5 pb-20 pt-36 sm:px-8 sm:pt-40">
          <div className="mb-8 flex justify-center">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 rounded-full border-2 border-[var(--charcoal)] bg-white px-5 py-2.5 shadow-[0_4px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_6px_0_#1a1a1a]"
            >
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border-2 border-[var(--charcoal)] bg-[var(--mint)]">
                <Image src="/logo.png" alt="Echo" width={32} height={32} className="h-full w-full object-cover" />
              </div>
              <span className="font-heading text-lg font-extrabold text-[var(--charcoal)]">Echo</span>
            </Link>
          </div>

          {children}
        </div>
      </div>
      <OceanFooter />
    </>
  );
}
