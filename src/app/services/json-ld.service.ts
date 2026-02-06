import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class JsonLdService {
  private static readonly SCRIPT_TYPE = "application/ld+json";
  private static readonly ATTR_ID = "data-json-ld";

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  setJsonLd(data: object, id: string): void {
    this.removeJsonLd(id);

    const script = this.document.createElement("script");
    script.type = JsonLdService.SCRIPT_TYPE;
    script.setAttribute(JsonLdService.ATTR_ID, id);
    script.textContent = JSON.stringify(data);
    this.document.head.appendChild(script);
  }

  removeJsonLd(id: string): void {
    const existing = this.document.head.querySelector(
      `script[${JsonLdService.ATTR_ID}="${id}"]`,
    );
    if (existing) {
      existing.remove();
    }
  }

  setDatasetSchema(
    name: string,
    description: string,
    url: string,
    dateModified: string,
  ): void {
    this.setJsonLd(
      {
        "@context": "https://schema.org",
        "@type": "Dataset",
        name,
        description,
        creator: {
          "@type": "Organization",
          name: "Techinterview.space",
          url: "https://techinterview.space",
        },
        publisher: {
          "@type": "Organization",
          name: "Techinterview.space",
          url: "https://techinterview.space",
        },
        license: "https://techinterview.space/agreements/privacy-policy",
        temporalCoverage: "2020/..",
        spatialCoverage: {
          "@type": "Place",
          name: "Kazakhstan",
        },
        url,
        dateModified,
      },
      "dataset",
    );
  }

  setEmployerAggregateRating(
    companyName: string,
    companyUrl: string,
    ratingValue: number,
    reviewCount: number,
  ): void {
    this.setJsonLd(
      {
        "@context": "https://schema.org",
        "@type": "EmployerAggregateRating",
        itemReviewed: {
          "@type": "Organization",
          name: companyName,
          url: companyUrl,
        },
        ratingValue,
        reviewCount,
        bestRating: 5,
        worstRating: 1,
      },
      "employer-rating",
    );
  }

  setReviews(
    companyName: string,
    reviews: Array<{ rating: number; datePublished: string }>,
  ): void {
    const reviewSchemas = reviews.map((r) => ({
      "@context": "https://schema.org",
      "@type": "Review",
      itemReviewed: {
        "@type": "Organization",
        name: companyName,
      },
      author: {
        "@type": "Person",
        name: "Anonymous",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      publisher: {
        "@type": "Organization",
        name: "Techinterview.space",
        url: "https://techinterview.space",
      },
      datePublished: r.datePublished,
    }));

    this.setJsonLd(reviewSchemas, "reviews");
  }

  setBreadcrumbList(
    items: Array<{ name: string; url?: string }>,
  ): void {
    const itemListElement = items.map((item, index) => {
      const element: Record<string, unknown> = {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
      };
      if (item.url) {
        element["item"] = item.url;
      }
      return element;
    });

    this.setJsonLd(
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement,
      },
      "breadcrumb",
    );
  }

  removeAll(): void {
    const scripts = this.document.head.querySelectorAll(
      `script[${JsonLdService.ATTR_ID}]`,
    );
    scripts.forEach((s) => s.remove());
  }
}
