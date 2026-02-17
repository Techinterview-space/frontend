import { Component, Input, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: "app-loading-spinner",
  templateUrl: "./loading-spinner.component.html",
  styleUrls: ["./loading-spinner.component.scss"],
  standalone: false,
})
export class LoadingSpinnerComponent implements OnInit, OnDestroy {
  @Input()
  style = "spinner-border-lg";

  @Input()
  delayMs = 750;

  static LoadingCatUrl =
    "https://techinterview.fra1.cdn.digitaloceanspaces.com/gif/loading_cat.gif";

  loadingUrl = "";
  loadingAlt = "Loading cat GIF";
  showPreloader = true;
  private delayTimerId: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    // Delay heavy GIF loading so fast responses avoid a multi-MB transfer.
    this.delayTimerId = setTimeout(() => {
      this.loadingUrl = LoadingSpinnerComponent.LoadingCatUrl;
    }, this.delayMs);
  }

  ngOnDestroy(): void {
    if (this.delayTimerId != null) {
      clearTimeout(this.delayTimerId);
      this.delayTimerId = null;
    }
  }

  onGifLoaded(): void {
    this.showPreloader = false;
  }
}
