/**
 * LifetimeBadge Component
 * 
 * Displays a promotional badge showing the lifetime plan offer.
 * Text changes on hover to reveal the pricing information.
 * Used to encourage signups.
 */

import { LIFETIME_BADGE } from "@/lib/constants";

export default function LifetimeBadge() {
  return (
    <div className="lifetime-badge group">
      <span className="group-hover:hidden">{LIFETIME_BADGE.defaultText}</span>
      <span className="hidden group-hover:inline">{LIFETIME_BADGE.hoverText}</span>
    </div>
  );
}

