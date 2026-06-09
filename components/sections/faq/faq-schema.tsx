import { faqJsonLd, servicesFaq, type FaqItem } from "@/lib/faq-content";

// Invisible FAQPage JSON-LD for Google rich results + AI engine extraction.
// Drop <FaqJsonLd /> anywhere on the page that shows the FAQ. Pairs with your
// own visible FAQ UI element, which reads `servicesFaq` from lib/faq-content.ts.
export function FaqJsonLd({ items = servicesFaq }: { items?: FaqItem[] }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(items)) }}
    />
  );
}
