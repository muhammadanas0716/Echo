/**
 * Reusable form actions component
 * Provides consistent button styling and layout for form submissions
 * Used across all forms for consistency
 */

"use client";

interface FormActionsProps {
  onCancel: () => void;
  onSubmit: () => void;
  submitLabel: string;
  cancelLabel?: string;
  isLoading?: boolean;
}

export default function FormActions({
  onCancel,
  onSubmit,
  submitLabel,
  cancelLabel = "Cancel",
  isLoading = false,
}: FormActionsProps) {
  return (
    <div className="flex gap-3 pt-2">
      <button
        type="button"
        onClick={onCancel}
        className="flex-1 px-6 py-3 border-2 border-[var(--charcoal)] rounded-xl bg-white hover:bg-[var(--sun)] shadow-[0_2px_0_#000] transition font-semibold text-[var(--charcoal)]"
      >
        {cancelLabel}
      </button>
      <button
        type="submit"
        onClick={onSubmit}
        disabled={isLoading}
        className="flex-1 px-6 py-3 border-2 border-[var(--charcoal)] rounded-xl bg-[var(--mint)] hover:bg-[var(--teal)] shadow-[0_2px_0_#000] transition disabled:opacity-50 font-semibold text-[var(--charcoal)]"
      >
        {isLoading ? "Saving..." : submitLabel}
      </button>
    </div>
  );
}

