import { Component, OnDestroy, OnInit } from "@angular/core";
import { defaultPageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { TelegramBotService } from "@services/telegram-bot.service";
import { TelegramUserSettings } from "@models/telegram";

@Component({
  templateUrl: "./telegram-user-settings.component.html",
})
export class TelegramUserSettingsComponent implements OnInit, OnDestroy {
  items: Array<TelegramUserSettings> | null = null;
  source: PaginatedList<TelegramUserSettings> | null = null;
  currentPage: number = 1;

  constructor(
    private readonly service: TelegramBotService,
    titleService: TitleService
  ) {
    titleService.setTitle("Использование бота");
  }

  ngOnInit(): void {
    this.items = null;
    this.source = null;

    this.loadData(this.currentPage);
  }

  loadData(pageToRequest: number): void {
    this.items = null;
    this.source = null;
    this.currentPage = pageToRequest;

    this.service
      .getUserSettings({
        page: this.currentPage,
        pageSize: defaultPageParams.pageSize,
      })
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.items = x.results;
        this.source = x;
      });
  }

  ngOnDestroy(): void {
    // ignored
  }
}
