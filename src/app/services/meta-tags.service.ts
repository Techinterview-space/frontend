import { Injectable } from "@angular/core";
import { Meta, MetaDefinition } from "@angular/platform-browser";
import { environment } from "@environments/environment";
import { TitleService } from "@services/title.service";

export interface CompanyMetaTags {
  companyName: string;
  rating: number;
  reviewsCount: number;
  slug: string;
}

@Injectable({
  providedIn: "root",
})
export class MetaTagService {

  public static readonly DEFAULT_IMAGE_URL = "https://techinterview.fra1.cdn.digitaloceanspaces.com/images/main_charts_500.png";

  constructor(
    private readonly title: TitleService,
    private readonly meta: Meta,
  ) {}

  /**
   * Updates meta tags for a company page.
   * Sets description, og:*, and twitter:* tags with company-specific content.
   */
  setCompanyMetaTags(company: CompanyMetaTags): void {
    const description = this.buildCompanyDescription(company);
    const pageUrl = `/companies/${company.slug}`;
    const title = `Отзывы о ${company.companyName} - Techinterview.space`;

    this.title.setTitle(title);
    this.removeTags();
    this.meta.removeTag('name="googlebot"');

    this.meta.addTags([
      { name: "googlebot", content: title },
      { property: "og:title", content: title },
      { name: "twitter:title", content: title },

      { name: "description", content: description },
      { property: "og:description", content: description },
      { name: "twitter:description", content: description },

      { property: "og:url", content: environment.baseUrl + pageUrl },
    ]);
  }

  returnDefaultMetaTags(): void {
    this.title.resetTitle();
    this.removeTags();
    this.meta.removeTag('name="googlebot"');

    const title = "Techinterview.space";
    const description =
      "Зарплаты в IT и отзывы о компаниях в Казахстане. Цифры, графики, звездочки. Всё как все мы любим";

    this.meta.addTags([
      { name: "googlebot", content: description },
      { name: "description", content: description },

      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: MetaTagService.DEFAULT_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:url", content: environment.baseUrl },

      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: MetaTagService.DEFAULT_IMAGE_URL },
      { property: "og:url", content: environment.baseUrl },
    ]);
  }

  private buildCompanyDescription(company: CompanyMetaTags): string {
    const ratingText =
      company.rating > 0
        ? `Рейтинг: ${company.rating.toFixed(1)}`
        : "Пока нет отзывов, но вы можете оставить первый";

    const result = `Отзывы о ${company.companyName}. ${ratingText}`;
    const reviewsText = this.pluralizeReviews(company.reviewsCount);

    return reviewsText ? `${result}, ${reviewsText}` : result;
  }

  private pluralizeReviews(count: number): string {
    if (count === 0) {
      return "";
    }

    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return `отзывов: ${count}`;
    }

    if (lastDigit === 1) {
      return `отзыв: ${count}`;
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
      return `отзыва: ${count}`;
    }

    return `отзывов: ${count}`;
  }

  /**
   * Sets meta tags for a static page with title, description, URL and optional image.
   */
  setPageMetaTags(
    title: string,
    description: string,
    url: string,
    imageUrl?: string | null,
    addTitlePostfix: boolean = true): void {
    const fullUrl = url.startsWith("/") ? environment.baseUrl + url : url;

    if (addTitlePostfix) {
      title = this.adjustTitle(title);
    }

    this.title.setTitle(title);
    this.removeTags();
    this.meta.removeTag('name="googlebot"');

    const tags: Array<MetaDefinition> = [
      { name: "googlebot", content: description },
      { property: "og:title", content: title },
      { name: "twitter:title", content: title },

      { name: "description", content: description },
      { property: "og:description", content: description },
      { name: "twitter:description", content: description },

      { property: "og:url", content: fullUrl },
    ];

    if (imageUrl) {
      tags.push({ property: "og:image", content: imageUrl });
      tags.push({ name: "twitter:image", content: imageUrl });
      tags.push({ name: "twitter:card", content: "summary_large_image" });
    }

    this.meta.addTags(tags);
  }

  private adjustTitle(title: string): string {
    title = title.replace(" - Techinterview.space", "");
    return title + " - Techinterview.space";
  }

  private removeTags(): void {
    this.meta.removeTag('name="description"');
    this.meta.removeTag('property="og:title"');
    this.meta.removeTag('name="twitter:title"');
    this.meta.removeTag('property="og:description"');
    this.meta.removeTag('name="twitter:description"');
    this.meta.removeTag('property="og:url"');
    this.meta.removeTag('property="og:image"');
    this.meta.removeTag('name="twitter:image"');
    this.meta.removeTag('name="twitter:card"');
  }
}
