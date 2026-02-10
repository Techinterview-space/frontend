import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { PrismLoaderService } from "@shared/services/prism-loader.service";

@Component({
  selector: "app-text-with-linebreaks",
  templateUrl: "./text-with-linebreaks.component.html",
  styleUrls: ["./text-with-linebreaks.component.scss"],
  standalone: false,
})
export class TextWithLinebreaksComponent implements OnInit, OnChanges {
  @Input()
  source: string | null = null;

  hasText = false;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly prismLoader: PrismLoaderService,
  ) {}

  ngOnInit(): void {
    this.updateStateAndHighlight();
  }

  ngOnChanges(_: SimpleChanges): void {
    this.updateStateAndHighlight();
  }

  private updateStateAndHighlight(): void {
    this.hasText = this.source != null && this.source.length > 0;

    if (!this.hasText) {
      return;
    }

    queueMicrotask(() => {
      this.prismLoader
        .loadAndHighlight(this.elementRef.nativeElement)
        .catch(() => undefined);
    });
  }
}
