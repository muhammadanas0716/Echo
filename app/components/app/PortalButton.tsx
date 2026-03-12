"use client";

import { useState } from "react";

type PortalButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export default function PortalButton({ children, className = "" }: PortalButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/portal");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to get portal");
      window.open(data.url, "_blank", "noopener,noreferrer");
    } catch {
      window.location.href = "/billing?error=portal-unavailable";
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={className}
    >
      {loading ? "Opening..." : children}
    </button>
  );
}
