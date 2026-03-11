/**
 * Feature Gallery Component
 *
 * A premium split-layout for landing page feature screenshots.
 */

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FiGrid, FiPieChart, FiZap, FiMaximize2 } from "react-icons/fi";
import type { IconType } from "react-icons";

type FeatureItem = {
  id: string;
  title: string;
  description: string;
  image: string;
};

type FeatureGroup = {
  id: "core" | "automation" | "visuals";
  label: string;
  summary: string;
  accentClass: string;
  icon: IconType;
  items: FeatureItem[];
};

const FEATURE_GROUPS: FeatureGroup[] = [
  {
    id: "core",
    label: "Core Views",
    summary: "Everyday screens that keep subscriptions organized.",
    accentClass: "bg-[var(--mint)]",
    icon: FiGrid,
    items: [
      {
        id: "dashboard",
        title: "Dashboard overview",
        description: "Total spend, renewals, and changes in one clean snapshot.",
        image: "/image.png",
      },
      {
        id: "subscriptions",
        title: "Subscription library",
        description: "Browse every subscription with logos, status, and totals.",
        image: "/image.png",
      },
      {
        id: "payment-info",
        title: "Payment info and credits",
        description: "Track cards, credits, and billing cycles in one place.",
        image: "/image.png",
      },
      {
        id: "credit-cards",
        title: "Credit card add",
        description: "Add card bills alongside app subscriptions for real totals.",
        image: "/image.png",
      },
      {
        id: "paying-since",
        title: "Paying since",
        description: "See tenure and long-term cost at a glance.",
        image: "/image.png",
      },
    ],
  },
  {
    id: "automation",
    label: "Automation",
    summary: "Capture, categorize, and summarize with less effort.",
    accentClass: "bg-[var(--sun)]",
    icon: FiZap,
    items: [
      {
        id: "ai-chat",
        title: "AI chat",
        description: "Ask natural language questions and get instant insights.",
        image: "/image.png",
      },
      {
        id: "receipts",
        title: "Receipt vault",
        description: "Store invoices and receipts inside each subscription.",
        image: "/image.png",
      },
    ],
  },
  {
    id: "visuals",
    label: "Analytics + Visuals",
    summary: "Find patterns fast with bold spending visuals.",
    accentClass: "bg-[var(--lavender)]",
    icon: FiPieChart,
    items: [
      {
        id: "analytics",
        title: "Analytics overview",
        description: "Breakdowns by month and category with real trends.",
        image: "/image.png",
      },
      {
        id: "treemap",
        title: "Treemap",
        description: "Spot the biggest spenders immediately by size.",
        image: "/image.png",
      },
      {
        id: "bubbles",
        title: "Bubble cloud",
        description: "Clusters subscriptions by size for quick comparisons.",
        image: "/image.png",
      },
      {
        id: "calendar",
        title: "Renewal calendar",
        description: "See upcoming charges across the month.",
        image: "/image.png",
      },
      {
        id: "constellation",
        title: "Constellation",
        description: "Explore spend clusters by category gravity.",
        image: "/image.png",
      },
      {
        id: "spectrum",
        title: "Spectrum ring",
        description: "Radial share view with a monthly pulse overlay.",
        image: "/image.png",
      },
    ],
  },
];

export default function BentoGrid() {
  const [activeGroupId, setActiveGroupId] = useState<FeatureGroup["id"]>(FEATURE_GROUPS[0].id);
  const [activeItemId, setActiveItemId] = useState(FEATURE_GROUPS[0].items[0].id);
  const [lightboxItem, setLightboxItem] = useState<FeatureItem | null>(null);

  useEffect(() => {
    if (!lightboxItem) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxItem(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxItem]);

  const activeGroup = FEATURE_GROUPS.find((group) => group.id === activeGroupId) ?? FEATURE_GROUPS[0];
  const activeItem = activeGroup.items.find((item) => item.id === activeItemId) ?? activeGroup.items[0];
  const activeIndex = activeGroup.items.findIndex((item) => item.id === activeItem.id) + 1;
  const totalScreens = FEATURE_GROUPS.reduce((sum, group) => sum + group.items.length, 0);
  const handleGroupSelect = (groupId: FeatureGroup["id"]) => {
    const nextGroup = FEATURE_GROUPS.find((group) => group.id === groupId) ?? FEATURE_GROUPS[0];
    setActiveGroupId(nextGroup.id);
    setActiveItemId(nextGroup.items[0].id);
  };

  return (
    <section className="relative w-full max-w-[90rem] mx-auto px-4 mb-20">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,_var(--offwhite)_0%,_#ffffff_100%)]" />
      <div className="absolute -top-24 left-1/2 h-56 w-[32rem] -translate-x-1/2 rounded-full bg-[var(--mint)] opacity-20 blur-[120px]" />
      <div className="absolute -bottom-24 right-10 h-48 w-48 rounded-full bg-[var(--lavender)] opacity-20 blur-[110px]" />

      <div className="mb-12 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--lavender)] border-2 border-[var(--charcoal)] rounded-full text-sm font-bold text-[var(--charcoal)] mb-4 shadow-[0_2px_0_#000]">
          Feature Studio
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold font-heading text-[var(--charcoal)] mb-3">
          A guided tour of everything Echobills does
        </h2>
        <p className="text-lg sm:text-xl text-[var(--charcoal)] opacity-70 max-w-3xl mx-auto">
          Pick a chapter, skim the screens, and dive into every detail without leaving the page.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-[var(--charcoal)] opacity-70">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[var(--charcoal)] bg-white">
            {totalScreens} screens
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[var(--charcoal)] bg-white">
            Click any screen for full view
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 transition-all duration-700 opacity-100 translate-y-0 lg:grid-cols-[0.44fr_0.56fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border-3 border-[var(--charcoal)] bg-white p-5 shadow-[0_6px_0_#000]">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--charcoal)] opacity-60">Chapters</p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
              {FEATURE_GROUPS.map((group) => {
                const Icon = group.icon;
                const isActive = group.id === activeGroupId;

                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => handleGroupSelect(group.id)}
                    className={`rounded-2xl border-2 p-4 text-left shadow-[0_4px_0_#000] transition ${
                      isActive
                        ? "border-[var(--charcoal)] bg-[var(--charcoal)] text-white"
                        : "border-[var(--charcoal)] bg-[var(--offwhite)] text-[var(--charcoal)] hover:bg-white"
                    }`}
                    aria-pressed={isActive}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-[var(--charcoal)] ${
                            isActive ? "bg-white text-[var(--charcoal)]" : group.accentClass
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </span>
                        <div>
                          <p className="text-sm font-bold">{group.label}</p>
                          <p className={`text-xs ${isActive ? "text-white/70" : "text-[var(--charcoal)] opacity-70"}`}>
                            {group.summary}
                          </p>
                        </div>
                      </div>
                      <span className={`text-xs font-bold ${isActive ? "text-white" : "text-[var(--charcoal)]"}`}>
                        {group.items.length}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border-3 border-[var(--charcoal)] bg-white p-5 shadow-[0_6px_0_#000]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--charcoal)] opacity-60">Screens</p>
                <p className="text-sm text-[var(--charcoal)] opacity-70">
                  Select a screen to preview
                </p>
              </div>
              <span className="text-xs font-bold text-[var(--charcoal)]">
                {activeGroup.items.length} items
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {activeGroup.items.map((item, index) => {
                const isActive = item.id === activeItem.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveItemId(item.id)}
                    className={`w-full rounded-2xl border-2 px-4 py-3 text-left shadow-[0_3px_0_#000] transition ${
                      isActive
                        ? "border-[var(--charcoal)] bg-[var(--charcoal)] text-white"
                        : "border-[var(--charcoal)] bg-[var(--offwhite)] text-[var(--charcoal)] hover:bg-white"
                    }`}
                    aria-pressed={isActive}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-[var(--charcoal)] text-xs font-bold ${
                          isActive ? "bg-white text-[var(--charcoal)]" : "bg-white text-[var(--charcoal)]"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-sm font-bold leading-snug">
                          {item.title}
                        </p>
                        <p className={`mt-1 text-xs leading-snug ${isActive ? "text-white/70" : "text-[var(--charcoal)] opacity-70"}`}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-3xl border-3 border-[var(--charcoal)] bg-white shadow-[0_8px_0_#000]">
            <div className={`absolute -top-20 right-0 h-40 w-40 rounded-full opacity-30 blur-[90px] ${activeGroup.accentClass}`} />
            <div className="absolute -bottom-20 left-0 h-52 w-52 rounded-full bg-[var(--peach)] opacity-20 blur-[100px]" />

            <div className="relative p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-[var(--charcoal)] text-xs font-bold text-[var(--charcoal)] shadow-[0_2px_0_#000] ${activeGroup.accentClass}`}
                >
                  {activeGroup.label}
                </span>
                <span className="text-xs font-bold text-[var(--charcoal)] opacity-70">
                  Screen {activeIndex} of {activeGroup.items.length}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setLightboxItem(activeItem)}
                className="mt-5 w-full text-left cursor-zoom-in"
                aria-label={`Open ${activeItem.title} full screen`}
              >
                <div className="rounded-2xl border-2 border-[var(--charcoal)] bg-[var(--offwhite)] p-3 shadow-[0_4px_0_#000] transition hover:-translate-y-0.5 hover:shadow-[0_7px_0_#000]">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-white">
                    <Image
                      key={activeItem.id}
                      src={activeItem.image}
                      alt={activeItem.title}
                      fill
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      className="object-contain transition duration-300"
                    />
                  </div>
                </div>
              </button>

              <div className="mt-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[var(--charcoal)] bg-white text-xs font-semibold text-[var(--charcoal)]">
                    <FiMaximize2 className="w-3.5 h-3.5" />
                    Tap for full view
                  </span>
                </div>
                <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-[var(--charcoal)]">
                  {activeItem.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-[var(--charcoal)] opacity-80">
                  {activeItem.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-[var(--charcoal)]">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[var(--charcoal)] bg-white">
                    {activeGroup.label}
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[var(--charcoal)] bg-white">
                    Built for clarity
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border-3 border-[var(--charcoal)] bg-white p-6 shadow-[0_6px_0_#000]">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--charcoal)] opacity-60">Why it works</p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  title: "Big visuals",
                  text: "Every screen is legible and full-size by default.",
                },
                {
                  title: "Guided flow",
                  text: "Grouped chapters keep the story easy to skim.",
                },
                {
                  title: "Full context",
                  text: "Each view comes with a crisp explanation.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border-2 border-[var(--charcoal)] bg-[var(--offwhite)] p-4 shadow-[0_3px_0_#000]"
                >
                  <p className="text-sm font-bold text-[var(--charcoal)]">{item.title}</p>
                  <p className="mt-1 text-xs text-[var(--charcoal)] opacity-70">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6"
          onClick={() => setLightboxItem(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxItem(null)}
              className="absolute -top-4 right-0 z-10 rounded-full border-2 border-[var(--charcoal)] bg-white px-3 py-1 text-xs font-bold text-[var(--charcoal)] shadow-[0_3px_0_#000] hover:bg-[var(--offwhite)]"
            >
              Close
            </button>
            <div className="relative h-[75vh] sm:h-[82vh] overflow-hidden rounded-3xl border-3 border-[var(--charcoal)] bg-white shadow-[0_10px_0_#000]">
              <Image
                src={lightboxItem.image}
                alt={lightboxItem.title}
                fill
                sizes="(min-width: 1024px) 80vw, 100vw"
                className="object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 border-t-2 border-[var(--charcoal)] bg-white/90 p-4">
                <h4 className="text-lg font-bold text-[var(--charcoal)]">{lightboxItem.title}</h4>
                <p className="text-sm text-[var(--charcoal)] opacity-75">
                  {lightboxItem.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
