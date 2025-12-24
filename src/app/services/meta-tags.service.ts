import { Injectable } from "@angular/core";
import { Meta } from "@angular/platform-browser";
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
  constructor(
    private readonly title: TitleService,
    private readonly meta: Meta,
  ) {}

  updateChartMetaTags(title: string, description: string, url: string): void {
    this.title.setTitle(title);
    url = url.startsWith("/") ? url : `/${url}`;

    this.removeTags();
    this.meta.addTags([
      { property: "og:title", content: title },
      { name: "twitter:title", content: title },

      { name: "description", content: description },
      { property: "og:description", content: description },
      { name: "twitter:description", content: description },

      { property: "og:url", content: environment.baseUrl + url },
    ]);
  }

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
    this.removeTags();
    this.meta.removeTag('name="googlebot"');

    const title = "Techinterview.space";
    const description =
      "Зарплаты в IT и отзывы о компаниях в Казахстане. Цифры, графики, звездочки. Всё как все мы любим";

    this.meta.addTags([
      { name: "googlebot", content: description },
      { property: "og:title", content: title },
      { name: "twitter:title", content: title },

      { name: "description", content: description },
      { property: "og:description", content: description },
      { name: "twitter:description", content: description },

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

  private removeTags(): void {
    this.meta.removeTag('name="description"');
    this.meta.removeTag('property="og:title"');
    this.meta.removeTag('name="twitter:title"');
    this.meta.removeTag('property="og:description"');
    this.meta.removeTag('name="twitter:description"');
    this.meta.removeTag('property="og:url"');
  }
}
