import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  keywords?: string;
  ogImage?: string;
  jsonLd?: Record<string, any> | Record<string, any>[];
  noindex?: boolean;
}

const SITE_URL = "https://vakildesk.lovable.app";
const DEFAULT_OG = "https://vakildesk.lovable.app/og-image.png";

export function SEO({
  title,
  description,
  canonicalPath,
  keywords,
  ogImage = DEFAULT_OG,
  jsonLd,
  noindex,
}: SEOProps) {
  const fullTitle = title.includes("VakilDesk") ? title : `${title} | VakilDesk`;
  const canonical = canonicalPath
    ? `${SITE_URL}${canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`}`
    : undefined;

  const jsonLdArray = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description.slice(0, 158)} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description.slice(0, 158)} />
      <meta property="og:type" content="website" />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="VakilDesk" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description.slice(0, 158)} />
      <meta name="twitter:image" content={ogImage} />

      {/* Geo (India focus) */}
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />

      {jsonLdArray.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

export const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VakilDesk",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    email: "support@vakildesk.com",
    contactType: "customer support",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
};

export const SOFTWARE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "VakilDesk",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "AI-powered legal practice management software for Indian advocates and law firms. Manage cases, hearings, documents, clients, and team collaboration.",
  url: SITE_URL,
  offers: [
    {
      "@type": "Offer",
      name: "Solo",
      price: "499",
      priceCurrency: "INR",
      priceValidUntil: "2027-12-31",
    },
    {
      "@type": "Offer",
      name: "Firm",
      price: "799",
      priceCurrency: "INR",
      priceValidUntil: "2027-12-31",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "127",
  },
  featureList: [
    "Case management",
    "Hearing reminders",
    "Document storage",
    "Client portal",
    "Team collaboration",
    "AI case summaries",
  ],
};

export function buildFAQSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}

export function buildBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}