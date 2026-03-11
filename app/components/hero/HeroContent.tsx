/**
 * HeroContent Component
 * 
 * Combines the hero heading and description into a single content block.
 * Provides consistent spacing and layout for the hero section text.
 */

import HeroHeading from "./HeroHeading";
import HeroDescription from "./HeroDescription";
import { HERO_CONTENT } from "@/lib/constants";

export default function HeroContent() {
  return (
    <div className="mb-12 px-4">
      <HeroHeading text={HERO_CONTENT.heading} />
      <HeroDescription text={HERO_CONTENT.description} />
    </div>
  );
}

