"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = window.setTimeout(() => setIsVisible(true), 0);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t-3 border-[var(--charcoal)] shadow-[0_-4px_0_#000]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-[var(--charcoal)]">
            We use cookies for basic analytics and preferences. Details are on the cookies page.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleReject}
            className="px-4 py-2 border-2 border-[var(--charcoal)] rounded-xl bg-white hover:bg-[var(--sun)] text-[var(--charcoal)] font-semibold transition"
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 border-3 border-[var(--charcoal)] rounded-xl bg-[var(--pink)] hover:bg-[var(--mint)] text-[var(--charcoal)] font-bold shadow-[0_4px_0_#000] hover:shadow-[0_6px_0_#000] transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
