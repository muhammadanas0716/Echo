/**
 * Reusable error message component
 * Provides consistent error display styling across the application
 */

"use client";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className="rounded-[1.4rem] border-3 border-[var(--charcoal)] bg-[#ffd7d2] px-4 py-4 shadow-[0_4px_0_#1a1a1a]">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/55">
        Heads up
      </p>
      <p className="mt-2 text-sm font-semibold leading-relaxed text-[var(--charcoal)]">{message}</p>
    </div>
  );
}
