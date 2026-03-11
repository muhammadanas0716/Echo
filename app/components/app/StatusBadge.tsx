import { titleCase } from "@/lib/formatters";

type StatusBadgeProps = {
  status?: string | null;
};

const statusStyles: Record<string, string> = {
  active: "bg-[#a6ea47]",
  trialing: "bg-[var(--sun)]",
  past_due: "bg-[#ffd7d2]",
  scheduled_cancel: "bg-[#d4e9ff]",
  canceled: "bg-[#f2f2f2]",
  paused: "bg-[#f2f2f2]",
  unpaid: "bg-[#ffd7d2]",
  expired: "bg-[#f2f2f2]",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const normalized = status ?? "inactive";
  return (
    <span
      className={`inline-flex rounded-full border-2 border-[var(--charcoal)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)] ${
        statusStyles[normalized] ?? "bg-white"
      }`}
    >
      {titleCase(normalized)}
    </span>
  );
}
