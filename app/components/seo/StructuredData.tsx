import { FAQ_ITEMS } from "@/lib/constants";
import { getSiteUrl } from "@/lib/site-url";

interface StructuredDataProps {
  url?: string;
  title?: string;
  description?: string;
  image?: string;
  hasFAQ?: boolean;
  dateModified?: string;
}

export default function StructuredData({
  url,
  title = "Echo - Manage all RECURRING things: one for all.",
  description = "Track renewals, get reminders, view analytics, and use AI to optimize your subscription spending. Discord Bot, Chrome Extension. Also manage your credit card bills; when I said you can manage all recurring things: I meant it.",
  image,
  hasFAQ = true,
  dateModified,
}: StructuredDataProps) {
  const baseUrl = getSiteUrl();
  const pageUrl = url ?? baseUrl;
  const pageImage = image || `${baseUrl}/thumbnail.png`;
  const resolvedUrl = pageUrl.startsWith("http") ? pageUrl : `${baseUrl}${pageUrl}`;

  const graphNodes: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#org`,
      name: "Echo",
      url: baseUrl,
      description:
        "Track renewals, get reminders, view analytics, and use AI to optimize your subscription spending. Discord Bot, Chrome Extension. Also manage your credit card bills; when I said you can manage all recurring things: I meant it.",
      logo: {
        "@type": "ImageObject",
        "@id": `${baseUrl}/#logo`,
        url: `${baseUrl}/logo.png`,
        width: 512,
        height: 512,
      },
      image: `${baseUrl}/logo.png`,
      sameAs: ["https://x.com/echobills"],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "Customer Support",
          email: "hello@echobills.space",
          availableLanguage: ["en"],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: "Echo",
      description: "Manage all RECURRING things: one for all.",
      publisher: { "@id": `${baseUrl}/#org` },  
      potentialAction: {
        "@type": "SearchAction",
        target: `${baseUrl}/?search={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Offer",
      "@id": `${baseUrl}/#offer`,
      url: `${baseUrl}/pricing`,
      price: "29",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceValidUntil: "2027-12-31",
      description: "Lifetime access - one-time payment, no subscriptions",
      seller: { "@id": `${baseUrl}/#org` },
    },
    {
      "@type": "Product",
      "@id": `${baseUrl}/#product`,
      name: "Echo Pro",
      description:
        "Track renewals, get reminders, view analytics, and use AI to optimize your subscription spending. Discord Bot, Chrome Extension. Also manage your credit card bills; when I said you can manage all recurring things: I meant it.",
      brand: { "@id": `${baseUrl}/#org` },
      category: "Productivity Software",
      image: pageImage,
      offers: { "@id": `${baseUrl}/#offer` },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "127",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${baseUrl}/#app`,
      name: "Echo",
      operatingSystem: "Web, iOS, Android",
      applicationCategory: "FinanceApplication",
      description:
        "Track renewals, get reminders, view analytics, and use AI to optimize your subscription spending. Discord Bot, Chrome Extension. Also manage your credit card bills; when I said you can manage all recurring things: I meant it.",
      image: pageImage,
      screenshot: `${baseUrl}/thumbnail.png`,
      offers: { "@id": `${baseUrl}/#offer` },
      featureList: [
        "Unlimited subscription tracking",
        "Renewal reminders and notifications",
        "Spending analytics and insights",
        "Cost optimization recommendations",
        "Category organization",
        "CSV and PDF export",
        "Budget tracking",
      ],
      publisher: { "@id": `${baseUrl}/#org` },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "127",
      },
    },
    {
      "@type": "WebPage",
      "@id": `${resolvedUrl}#webpage`,
      url: resolvedUrl,
      name: title,
      description: description,
      isPartOf: { "@id": `${baseUrl}/#website` },
      about: { "@id": `${baseUrl}/#app` },
      inLanguage: "en-US",
      datePublished: "2024-01-01",
      ...(dateModified && { dateModified }),
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: pageImage,
        width: 1200,
        height: 630,
      },
      ...(hasFAQ && { mainEntity: { "@id": `${resolvedUrl}#faq` } }),
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: baseUrl,
          },
        ],
      },
    },
  ];

  if (hasFAQ) {
    graphNodes.push({
      "@type": "FAQPage",
      "@id": `${resolvedUrl}#faq`,
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  const graph = {
    "@context": "https://schema.org",
    "@graph": graphNodes,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
