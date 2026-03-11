type MetricCardProps = {
  label: string;
  value: string;
  detail?: string;
  accent?: string;
};

export default function MetricCard({
  label,
  value,
  detail,
  accent = "bg-white",
}: MetricCardProps) {
  return (
    <article
      className={`rounded-[1.75rem] border-3 border-[var(--charcoal)] ${accent} p-5 shadow-[0_6px_0_#1a1a1a]`}
    >
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
        {label}
      </p>
      <p className="mt-3 font-heading text-3xl font-extrabold text-[var(--charcoal)]">{value}</p>
      {detail ? (
        <p className="mt-2 text-sm font-semibold leading-relaxed text-[var(--charcoal)]/65">
          {detail}
        </p>
      ) : null}
    </article>
  );
}
