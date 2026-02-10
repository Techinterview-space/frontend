import { AfterViewInit, Component, ElementRef } from "@angular/core";
import { PrismLoaderService } from "@shared/services/prism-loader.service";

@Component({
  selector: "app-design-system",
  templateUrl: "./design-system.component.html",
  styleUrls: ["./design-system.component.scss"],
  standalone: false,
})
export class DesignSystemComponent implements AfterViewInit {
  codeExample = `function greet(name: string): string {
  return \`Hello, \${name}!\`;
}`;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly prismLoader: PrismLoaderService,
  ) {}

  ngAfterViewInit(): void {
    this.prismLoader
      .loadAndHighlight(this.elementRef.nativeElement)
      .catch(() => undefined);
  }
}
