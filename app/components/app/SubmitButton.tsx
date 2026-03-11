"use client";

import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  children: React.ReactNode;
  pendingLabel?: string;
  className?: string;
};

export default function SubmitButton({
  children,
  pendingLabel = "Working...",
  className = "",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`rounded-xl border-2 border-[var(--charcoal)] px-4 py-2.5 font-heading text-sm font-bold text-[var(--charcoal)] shadow-[0_4px_0_#1a1a1a] transition disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
