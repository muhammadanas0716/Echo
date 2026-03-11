/**
 * Reusable form field component
 * Provides consistent styling and structure for form inputs
 * Reduces code duplication across forms
 */

"use client";

import { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  hint?: string;
}

export default function FormField({
  label,
  required = false,
  error,
  children,
  hint,
}: FormFieldProps) {
  return (
    <div className="space-y-2.5">
      <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/55">
        {label}
        {required ? <span className="ml-1 text-[var(--coral)]">*</span> : null}
      </label>
      <div className="space-y-2">{children}</div>
      {hint && (
        <p className="text-xs font-semibold leading-relaxed text-[var(--charcoal)]/55">{hint}</p>
      )}
      {error && (
        <p className="text-sm font-semibold text-[var(--coral)]">{error}</p>
      )}
    </div>
  );
}
