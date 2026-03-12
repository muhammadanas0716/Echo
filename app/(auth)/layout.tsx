import Link from "next/link";
import Image from "next/image";
import { publicLinks } from "@/lib/site-links";

export const dynamic = "force-dynamic";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#90ddf0_0%,#b8edfb_54%,#d4f8ff_100%)]">
      <div className="pointer-events-none absolute inset-0 dotted-sea opacity-60" />
      <Image
        src="/clouds/cloud1.svg"
        alt=""
        width={140}
        height={80}
        className="pointer-events-none absolute left-[2%] top-28 ocean-float opacity-90"
      />
      <Image
        src="/clouds/cloud2.svg"
        alt=""
        width={120}
        height={70}
        className="pointer-events-none absolute right-[4%] top-24 ocean-float-delayed opacity-90"
      />
      <Image
        src="/clouds/cloud3.svg"
        alt=""
        width={100}
        height={60}
        className="pointer-events-none absolute bottom-32 left-[13%] ocean-float-fast opacity-80"
      />
      <Image
        src="/clouds/cloud4.svg"
        alt=""
        width={110}
        height={65}
        className="pointer-events-none absolute bottom-28 right-[18%] ocean-float opacity-80"
      />

      <div className="absolute bottom-0 left-0 right-0 h-32">
        <svg
          className="absolute bottom-0 left-0 h-full w-full"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="auth-ground" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#95ddc1" />
              <stop offset="100%" stopColor="#7fd7b8" />
            </linearGradient>
          </defs>
          <path
            fill="url(#auth-ground)"
            stroke="var(--charcoal)"
            strokeWidth="2"
            d="M0,50 C90,10 180,90 270,50 C360,10 450,90 540,50 C630,10 720,90 810,50 C900,10 990,90 1080,50 C1170,10 1260,90 1350,50 C1410,10 1440,50 1440,50 L1440,100 L0,100 Z"
          />
        </svg>
      </div>

      <div className="relative flex min-h-screen flex-col items-center px-4 pt-12 pb-32 sm:px-6">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 rounded-xl border-2 border-[var(--charcoal)] bg-white px-5 py-2.5 shadow-[0_4px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_6px_0_#1a1a1a]"
        >
          <Image src="/logo.png" alt="Echo" width={28} height={28} className="h-7 w-7 object-cover" />
          <span className="font-heading text-base font-extrabold text-[var(--charcoal)]">Echo</span>
        </Link>

        <div className="w-full max-w-md">{children}</div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm font-semibold text-[var(--charcoal)]/70">
          <Link href={publicLinks.pricing} className="underline decoration-2 underline-offset-4 hover:text-[var(--charcoal)]">
            Pricing
          </Link>
          <Link href={publicLinks.home} className="underline decoration-2 underline-offset-4 hover:text-[var(--charcoal)]">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
