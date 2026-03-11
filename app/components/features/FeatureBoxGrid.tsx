/**
 * FeatureBoxGrid Component
 * 
 * Renders a responsive grid of feature boxes.
 * Displays feature cards in a row on desktop and stacked on mobile.
 */

import FeatureBox from "./FeatureBox";
import { FEATURE_BOXES } from "@/lib/constants";

export default function FeatureBoxGrid() {
  return (
    <div className="mb-12 px-4">
      <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
        {FEATURE_BOXES.map((feature, index) => (
          <FeatureBox
            key={index}
            title={feature.title}
            description={feature.description}
            variant={feature.variant}
          />
        ))}
      </div>
    </div>
  );
}

