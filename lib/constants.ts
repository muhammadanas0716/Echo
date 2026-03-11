/**
 * Constants and configuration data for the Echobills landing page.
 * Centralizes all static data including FAQ items and feature boxes.
 *
 * This file serves as the single source of truth for all content data,
 * making it easy to update text, add new features, or modify configurations.
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FeatureBox {
  title: string;
  description: string;
  variant: "primary" | "secondary" | "tertiary";
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What does Echobills do?",
    answer:
      "Echobills helps you manage all your subscriptions in one place. Track renewals, get reminders, split bills with family members, view spending analytics to optimize your subscription costs. Never miss a renewal or pay for unused services again.",
  },
  {
    question: "How do I add my subscriptions?",
    answer:
      "You can add subscriptions manually inside Echobills and organize them with categories, receipts, and renewal dates. You can also create shared links to let family members add subscriptions for bill splitting.",
  },
  {
    question: "Can I split subscription costs with family?",
    answer:
      "Yes! Echobills supports bill splitting where you can split costs with family members (like 80-20 splits), set up shared links for easy access, and manage who pays what. Perfect for managing household subscriptions together.",
  },
  {
    question: "What kind of analytics do you provide?",
    answer:
      "Echobills provides detailed spending graphs, subscription trends, renewal calendars, cost breakdowns by category, and AI-powered insights to help you identify unused subscriptions or opportunities to save money.",
  },
  {
    question: "How do renewal reminders work?",
    answer:
      "Echobills sends you reminders before each subscription renews. You can customize when you want to be notified (e.g., 7 days before, 3 days before, 1 day before). Never be surprised by an unexpected charge again.",
  },
  {
    question: "Who should use this?",
    answer:
      "Anyone with multiple subscriptions - streaming services, software, apps, memberships, or any recurring payments. Echobills is perfect for individuals and families who want to stay on top of their subscription spending.",
  },
  {
    question: "How is this different from other subscription trackers?",
    answer:
      "Echobills combines powerful analytics, bill splitting features, and beautiful visualizations. We focus on helping you actually save money, not just track it. Our AI analyzes your usage patterns and suggests optimizations.",
  },
  {
    question: "Is it free?",
    answer:
      "Yes! We have a free forever plan with up to 3 subscriptions. Want unlimited? Get lifetime access for just $39 — one-time payment, no recurring fees ever.",
  },
];

export const FEATURE_BOXES: FeatureBox[] = [
  {
    title: "Renewal Reminders",
    description: "Never miss a renewal date",
    variant: "primary",
  },
  {
    title: "Bill Splitting",
    description: "Split subscription costs with family",
    variant: "secondary",
  },
];

export const HERO_CONTENT = {
  heading: "All your recurring payments in one place",
  description:
    "Track renewals, get reminders, split bills with family, view analytics, and use AI to optimize your subscription spending. Never pay for unused services again.",
};

export const DEV_PILL_CONTENT = {
  emoji: "👋",
  text: "Welcome to Echobills",
};

export const LIFETIME_BADGE = {
  defaultText:
    "Free forever • $39 lifetime for unlimited",
  hoverText: "Pay once, own forever — just $39 lifetime",
};
