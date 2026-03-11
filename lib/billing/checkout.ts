import { env } from "@/lib/env";

type CheckoutHrefInput = {
  productId: string;
  referenceId: string;
  email?: string | null;
  successPath?: string;
  metadata?: Record<string, string | number | null>;
};

export function buildCheckoutHref({
  productId,
  referenceId,
  email,
  successPath = "/dashboard?checkout=success",
  metadata,
}: CheckoutHrefInput) {
  const params = new URLSearchParams();
  params.set("productId", productId);
  params.set("referenceId", referenceId);
  params.set("successUrl", `${env.siteUrl}${successPath}`);

  if (email) {
    params.set("customer", JSON.stringify({ email }));
  }

  if (metadata) {
    params.set("metadata", JSON.stringify(metadata));
  }

  return `/checkout?${params.toString()}`;
}
