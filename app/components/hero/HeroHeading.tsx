/**
 * HeroHeading Component
 * 
 * Displays the main hero heading text.
 * Large, bold typography optimized for readability and impact.
 */

interface HeroHeadingProps {
  text: string;
}

export default function HeroHeading({ text }: HeroHeadingProps) {
  return (
    <h1 className="big-heading mb-4 sm:mb-5 leading-tight">
      {text}
    </h1>
  );
}
