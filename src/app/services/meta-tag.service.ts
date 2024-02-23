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
      { name: 'og:title', content: title },
      { name: 'twitter:title', content: title },

      { name: 'og:description', content: description },
      { name: 'twitter:description', content: description },

      { name: 'og:url', content: environment.baseUrl + url },
    ]);
  }

  returnDefaultMetaTags(): void {
    this.removeTags();

    const title = 'Tech.Interview';
    const description = 'Here you can store your technical interview notes and share them';

    this.meta.addTags([
      { name: 'og:title', content: title },
      { name: 'twitter:title', content: title },

      { name: 'og:description', content: description },
      { name: 'twitter:description', content: description },

      { name: 'og:url', content: environment.baseUrl },
    ]);
  }

  private removeTags(): void {
    this.meta.removeTag('property="og:title"');
    this.meta.removeTag('name="twitter:title"');
    this.meta.removeTag('property="og:description"');
    this.meta.removeTag('name="twitter:description"');
    this.meta.removeTag('property="og:url"');
  }
}
