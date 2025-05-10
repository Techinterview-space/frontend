import { Component, OnDestroy, OnInit } from "@angular/core";
import { PageParams, defaultPageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { TelegramBotService } from "@services/telegram-bot.service";
import { TelegramBotUsage } from "@models/telegram";
import { BotUsageTableRow } from "./bot-usage-table-row";

@Component({
  templateUrl: "./telegram-bot-usages.component.html",
  standalone: false,
})
export class TelegramBotUsagesComponent implements OnInit, OnDestroy {
  items: Array<BotUsageTableRow> | null = null;
  source: PaginatedList<TelegramBotUsage> | null = null;
  currentPage: number = 1;

  constructor(
    private readonly service: TelegramBotService,
    titleService: TitleService,
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
      .botUsages({
        page: this.currentPage,
        pageSize: defaultPageParams.pageSize,
      })
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.items = x.results.map((x) => new BotUsageTableRow(x));
        this.source = x;
      });
  }

  ngOnDestroy(): void {
    // ignored
  }
}
