import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

interface PrismApi {
  highlightAll(): void;
  highlightElement(element: Element): void;
}

@Injectable({
  providedIn: "root",
})
export class PrismLoaderService {
  private readonly isBrowser: boolean;
  private loadPromise: Promise<void> | null = null;
  private prism: PrismApi | null = null;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  async loadAndHighlight(container?: ParentNode): Promise<void> {
    if (!this.isBrowser) {
      return;
    }

    await this.ensureLoaded();
    this.highlight(container);
  }

  private async ensureLoaded(): Promise<void> {
    if (this.prism) {
      return;
    }

    if (this.loadPromise) {
      await this.loadPromise;
      return;
    }

    this.loadPromise = (async () => {
      const prismModule = await import("prismjs");

      await Promise.all([
        import("prismjs/components/prism-csharp"),
        import("prismjs/components/prism-css"),
      ]);

      this.prism = (prismModule.default ?? prismModule) as PrismApi;
    })();

    await this.loadPromise;
  }

  private highlight(container?: ParentNode): void {
    if (!this.prism) {
      return;
    }

    if (!container) {
      this.prism.highlightAll();
      return;
    }

    const codeBlocks = container.querySelectorAll("pre code");
    codeBlocks.forEach((block) => this.prism!.highlightElement(block));
  }
}
