import { Injectable } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { environment } from "@environments/environment";
import { TitleService } from "@services/title.service";

@Injectable({
  providedIn: 'root'
})
export class MetaTagService {
  constructor(
    private readonly title: TitleService,
    private readonly meta: Meta) {}

  updateChartMetaTags(
    title: string,
    description: string,
    url: string): void {

    this.title.setTitle(title);
    url = url.startsWith('/') ? url : `/${url}`;

    this.removeTags();
    this.meta.addTags([
      { property: 'og:title', content: title },
      { name: 'twitter:title', content: title },

      { name: 'description', content: description },
      { property: 'og:description', content: description },
      { name: 'twitter:description', content: description },

      { property: 'og:url', content: environment.baseUrl + url },
    ]);
  }

  returnDefaultMetaTags(): void {
    this.removeTags();

    const title = 'Techinterview.space';
    const description = 'Зарплаты в IT в Казахстане. Цифры, графики, фильтр. Всё как все мы любим';

    this.meta.addTags([
      { property: 'og:title', content: title },
      { name: 'twitter:title', content: title },

      { name: 'description', content: description },
      { property: 'og:description', content: description },
      { name: 'twitter:description', content: description },

      { property: 'og:url', content: environment.baseUrl },
    ]);
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
