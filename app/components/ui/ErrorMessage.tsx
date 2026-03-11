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
    <div className="bg-[var(--coral)]/10 border-2 border-[var(--coral)] rounded-xl p-3 text-[var(--coral)] text-sm">
      {message}
    </div>
  );
}

