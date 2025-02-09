import { Component, OnDestroy, OnInit } from "@angular/core";
import { PageParams, defaultPageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { TelegramBotService } from "@services/telegram-bot.service";
import { StatDataCacheChangeSubscription } from "@models/telegram";

@Component({
  templateUrl: "./stat-data-cache-records.component.html",
  standalone: false,
})
export class StatDataCacheRecordsComponent implements OnInit, OnDestroy {
  items: Array<StatDataCacheChangeSubscription> | null = null;
  source: PaginatedList<StatDataCacheChangeSubscription> | null = null;
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
      .getStatDataChangeSubscriptions({
        page: this.currentPage,
        pageSize: defaultPageParams.pageSize,
      })
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.items = x.results;
        this.source = x;
      });
  }

  activate(item: StatDataCacheChangeSubscription): void {
    this.service
      .activateStatDataChangeSubscription(item.id)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.loadData(this.currentPage);
      });
  }

  deactivate(item: StatDataCacheChangeSubscription): void {
    this.service
      .deactivateStatDataChangeSubscription(item.id)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.loadData(this.currentPage);
      });
  }

  ngOnDestroy(): void {
    // ignored
  }
}
