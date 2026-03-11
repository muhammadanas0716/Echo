/**
 * DevPill Component
 * 
 * Displays a development status badge at the top of the hero section.
 * Indicates that the product is currently in development.
 * Uses the project's design system with yellow/black color scheme.
 */

import { DEV_PILL_CONTENT } from "@/lib/constants";

export default function DevPill() {
  return (
    <div className="dev-pill">
      <span>{DEV_PILL_CONTENT.emoji}</span>
      <span>{DEV_PILL_CONTENT.text}</span>
    </div>
  );
}

