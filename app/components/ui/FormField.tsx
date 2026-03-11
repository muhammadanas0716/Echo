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
    <div>
      <label className="block text-sm font-semibold text-[var(--charcoal)] mb-2">
        {label} {required && "*"}
      </label>
      {children}
      {hint && (
        <p className="text-xs text-[var(--charcoal)] opacity-60 mt-1">{hint}</p>
      )}
      {error && (
        <p className="text-sm text-[var(--coral)] mt-1">{error}</p>
      )}
    </div>
  );
}

