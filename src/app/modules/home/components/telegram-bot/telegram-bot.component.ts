import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ViewportScroller } from "@angular/common";
import { TitleService } from "@services/title.service";

@Component({
  selector: "app-telegram-bot",
  templateUrl: "./telegram-bot.component.html",
  styleUrls: ["./telegram-bot.component.scss"],
  standalone: false,
})
export class TelegramBotABoutComponent implements OnInit, OnDestroy {
  imageLinkToShowInModal: string | null = null;

  constructor(
    private readonly titleService: TitleService,
    private readonly route: ActivatedRoute,
    private readonly viewportScroller: ViewportScroller,
  ) {
    this.titleService.setTitle("О ботах в Telegram");
  }

  ngOnInit(): void {
    // Handle fragment scrolling for anchor links
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        // Small delay to ensure the DOM is fully rendered
        setTimeout(() => {
          this.viewportScroller.scrollToAnchor(fragment);
        }, 100);
      }
    });
  }

  openImage(link: string): void {
    this.imageLinkToShowInModal = link;
  }

  closeImage(): void {
    this.imageLinkToShowInModal = null;
  }

  ngOnDestroy(): void {
    this.titleService.resetTitle();
  }
}
