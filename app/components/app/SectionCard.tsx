type SectionCardProps = {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  accent?: string;
};

export default function SectionCard({
  title,
  eyebrow,
  children,
  accent = "bg-white",
}: SectionCardProps) {
  return (
    <section
      className={`rounded-[2rem] border-3 border-[var(--charcoal)] ${accent} p-6 shadow-[0_6px_0_#1a1a1a] sm:p-8`}
    >
      {eyebrow ? (
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/50">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 font-heading text-2xl font-extrabold text-[var(--charcoal)]">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}
