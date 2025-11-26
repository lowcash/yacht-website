import { useEffect } from 'react';

// Meta tags for SEO - sets document metadata
export function MetaTags() {
  useEffect(() => {
    // OG Image URL - dynamically constructed from current origin
    // Works on localhost, staging, and production
    const ogImageUrl = `${window.location.origin}/og-image.png`;

    // Set document title
    document.title = "Pink Lady Yacht Support Services • Premium Yacht Management in Thailand";

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Professional yacht support services in Thailand. Provisioning, logistics, maintenance, bunkering, and yacht management in Phuket, Krabi, and Koh Samui.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Professional yacht support services in Thailand. Provisioning, logistics, maintenance, bunkering, and yacht management in Phuket, Krabi, and Koh Samui.';
      document.head.appendChild(meta);
    }

    // Set meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'Yacht Support Services, Yacht Management Thailand, Phuket Yacht Services, Marine Support Services, Yacht Provisioning, Yacht Logistics, Yacht Maintenance, Bunkering Services, Pink Lady Yacht');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'Yacht Support Services, Yacht Management Thailand, Phuket Yacht Services, Marine Support Services, Yacht Provisioning, Yacht Logistics, Yacht Maintenance, Bunkering Services, Pink Lady Yacht';
      document.head.appendChild(meta);
    }

    // Set meta author
    const metaAuthor = document.querySelector('meta[name="author"]');
    if (metaAuthor) {
      metaAuthor.setAttribute('content', 'Pink Lady Yacht Support Services');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'author';
      meta.content = 'Pink Lady Yacht Support Services';
      document.head.appendChild(meta);
    }

    // Set Open Graph tags
    const ogTags = [
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
      { property: 'og:title', content: 'Pink Lady Yacht Support Services - Premium Yacht Management in Thailand' },
      { property: 'og:description', content: 'Professional yacht support services in Thailand. Provisioning, logistics, maintenance, bunkering, and yacht management in Phuket, Krabi, and Koh Samui.' },
      { property: 'og:image', content: ogImageUrl },
    ];

    ogTags.forEach(({ property, content }) => {
      const existing = document.querySelector(`meta[property="${property}"]`);
      if (existing) {
        existing.setAttribute('content', content);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.content = content;
        document.head.appendChild(meta);
      }
    });

    // Set Twitter tags
    const twitterTags = [
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:url', content: window.location.href },
      { property: 'twitter:title', content: 'Pink Lady Yacht Support Services - Premium Yacht Management in Thailand' },
      { property: 'twitter:description', content: 'Professional yacht support services in Thailand. Provisioning, logistics, maintenance, bunkering, and yacht management in Phuket, Krabi, and Koh Samui.' },
      { property: 'twitter:image', content: ogImageUrl },
    ];

    twitterTags.forEach(({ property, content }) => {
      const existing = document.querySelector(`meta[property="${property}"]`);
      if (existing) {
        existing.setAttribute('content', content);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.content = content;
        document.head.appendChild(meta);
      }
    });

    // Set canonical URL - tells Google this is the main version
    const canonicalUrl = window.location.origin + window.location.pathname;
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonical) {
      canonical.href = canonicalUrl;
    } else {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = canonicalUrl;
      document.head.appendChild(canonical);
    }

    // Add JSON-LD structured data for rich search results
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Pink Lady Yacht Support Services",
      "description": "Professional yacht support services in Thailand including provisioning, logistics, maintenance, bunkering, formalities, banking services, yacht management, and sales & charter.",
      "url": window.location.origin,
      "telephone": "+66851904836",
      "email": "pinkladyyachtingservices@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "Thailand",
        "addressRegion": "Phuket, Krabi, Koh Samui"
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Phuket"
        },
        {
          "@type": "City",
          "name": "Krabi"
        },
        {
          "@type": "City",
          "name": "Koh Samui"
        }
      ],
      "priceRange": "$$",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Yacht Support Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Yacht Provisioning"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Yacht Logistics"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Yacht Maintenance"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Bunkering Services"
            }
          }
        ]
      }
    };

    // Remove existing structured data if any
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, []);

  return null;
}