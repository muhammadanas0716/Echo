/**
 * HeroDescription Component
 * 
 * Displays the hero section description/subtitle.
 * Provides context and value proposition below the main heading.
 */

interface HeroDescriptionProps {
  text: string;
}

export default function HeroDescription({ text }: HeroDescriptionProps) {
  return (
    <p className="text-lg sm:text-xl text-[var(--charcoal)] opacity-75 max-w-2xl mx-auto leading-snug font-medium">
      {text}
    </p>
  );
}
