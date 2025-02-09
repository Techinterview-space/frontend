import { Component, OnDestroy } from "@angular/core";
import { TitleService } from "@services/title.service";

@Component({
    selector: "app-telegram-bot",
    templateUrl: "./telegram-bot.component.html",
    styleUrls: ["./telegram-bot.component.scss"],
    standalone: false
})
export class TelegramBotABoutComponent implements OnDestroy {
  imageLinkToShowInModal: string | null = null;

  constructor(private readonly titleService: TitleService) {
    this.titleService.setTitle("О телеграм боте");
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
