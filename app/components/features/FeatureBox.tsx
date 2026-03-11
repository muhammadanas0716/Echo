/**
 * FeatureBox Component
 * 
 * Displays a feature card with title and description.
 * Supports three visual variants (primary, secondary, tertiary) with different color schemes.
 * Used in the hero section to showcase key product features.
 */

interface FeatureBoxProps {
  title: string;
  description: string;
  variant: "primary" | "secondary" | "tertiary";
}

export default function FeatureBox({ title, description, variant }: FeatureBoxProps) {
  return (
    <div className={`feature-box feature-box-${variant}`}>
      <div className="feature-box-content">
        <div className="feature-box-title">{title}</div>
        <div className="feature-box-text">{description}</div>
      </div>
    </div>
  );
}

