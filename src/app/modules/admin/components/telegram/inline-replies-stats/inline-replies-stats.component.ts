import { Component, OnDestroy, OnInit } from "@angular/core";
import { PageParams, defaultPageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { TelegramBotService } from "@services/telegram-bot.service";
import { TelegramBotUsage, TelegramInlineReplyStats } from "@models/telegram";

@Component({
  templateUrl: "./inline-replies-stats.component.html",
  standalone: false,
})
export class InlineRepliesStatsComponent implements OnInit, OnDestroy {
  stats: TelegramInlineReplyStats | null = null;

  constructor(
    private readonly service: TelegramBotService,
    titleService: TitleService,
  ) {
    titleService.setTitle("Использование бота");
  }

  ngOnInit(): void {
    this.service
      .getTelegramInlineReplyStats()
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.stats = x;
      });
  }

  ngOnDestroy(): void {
    // ignored
  }
}
