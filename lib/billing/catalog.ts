import { env } from "@/lib/env";

export type BillingInterval = "monthly" | "yearly";
export type PlanKey = "starter" | "pro" | "scale";
export type TopupKey = "small" | "medium" | "large";

export type StarterPlan = {
  key: PlanKey;
  name: string;
  tagline: string;
  description: string;
  popular?: boolean;
  monthlyPriceLabel: string;
  yearlyPriceLabel: string;
  monthlyCredits: number;
  yearlyCredits: number;
  monthlyProductId?: string;
  yearlyProductId?: string;
  features: string[];
};

export type CreditPack = {
  key: TopupKey;
  name: string;
  credits: number;
  priceLabel: string;
  productId?: string;
  description: string;
};

export const starterPlans: StarterPlan[] = [
  {
    key: "starter",
    name: "Echo Starter",
    tagline: "First paying customers",
    description: "A clean baseline for shipping your first real SaaS billing flow.",
    monthlyPriceLabel: "$19",
    yearlyPriceLabel: "$190",
    monthlyCredits: 100,
    yearlyCredits: 1200,
    monthlyProductId: env.products.starter.monthly,
    yearlyProductId: env.products.starter.yearly,
    features: [
      "Email/password + Google OAuth",
      "Hosted checkout and portal",
      "Webhook-synced subscriptions",
      "100 credits per month",
    ],
  },
  {
    key: "pro",
    name: "Echo Pro",
    tagline: "Launch seriously",
    description: "The default paid plan for most SaaS teams and AI products.",
    popular: true,
    monthlyPriceLabel: "$49",
    yearlyPriceLabel: "$490",
    monthlyCredits: 350,
    yearlyCredits: 4200,
    monthlyProductId: env.products.pro.monthly,
    yearlyProductId: env.products.pro.yearly,
    features: [
      "Everything in Starter",
      "Upgrade and downgrade flows",
      "Customer billing portal",
      "350 credits per month",
    ],
  },
  {
    key: "scale",
    name: "Echo Scale",
    tagline: "Heavier billing logic",
    description: "For products that want credits, top-ups, and a fuller billing back office.",
    monthlyPriceLabel: "$99",
    yearlyPriceLabel: "$990",
    monthlyCredits: 900,
    yearlyCredits: 10800,
    monthlyProductId: env.products.scale.monthly,
    yearlyProductId: env.products.scale.yearly,
    features: [
      "Everything in Pro",
      "Admin billing visibility",
      "Higher usage allowance",
      "900 credits per month",
    ],
  },
];

export const creditPacks: CreditPack[] = [
  {
    key: "small",
    name: "Echo Small Top-up",
    credits: 100,
    priceLabel: "$15",
    productId: env.topups.small,
    description: "Quick extra usage for launches and demos.",
  },
  {
    key: "medium",
    name: "Echo Growth Top-up",
    credits: 500,
    priceLabel: "$59",
    productId: env.topups.medium,
    description: "The sweet spot for teams with bursty usage.",
  },
  {
    key: "large",
    name: "Echo Scale Top-up",
    credits: 2000,
    priceLabel: "$199",
    productId: env.topups.large,
    description: "For heavier AI and automation workloads.",
  },
];

export function getPlan(key: PlanKey) {
  return starterPlans.find((plan) => plan.key === key);
}

export function getPlanByProductId(productId?: string | null) {
  if (!productId) return null;
  return (
    starterPlans.find(
      (plan) => plan.monthlyProductId === productId || plan.yearlyProductId === productId
    ) ?? null
  );
}

export function getPlanIntervalByProductId(productId?: string | null): BillingInterval | null {
  if (!productId) return null;
  for (const plan of starterPlans) {
    if (plan.monthlyProductId === productId) return "monthly";
    if (plan.yearlyProductId === productId) return "yearly";
  }
  return null;
}

export function getCreditsForPlan(planKey: string, interval: BillingInterval | null) {
  const plan = getPlan(planKey as PlanKey);
  if (!plan) return 0;
  return interval === "yearly" ? plan.yearlyCredits : plan.monthlyCredits;
}

export function getCreditPackByProductId(productId?: string | null) {
  if (!productId) return null;
  return creditPacks.find((pack) => pack.productId === productId) ?? null;
}
