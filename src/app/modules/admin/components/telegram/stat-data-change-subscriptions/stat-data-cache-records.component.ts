import { Component, OnDestroy, OnInit } from "@angular/core";
import { defaultPageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { StatDataCacheChangeSubscription } from "@models/telegram";
import { TelegramSubscriptionsService } from "@services/telegram-subscriptions.service";
import { TelegramSubscriptionCreateForm } from "./subscription-create-form";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { ConfirmMsg } from "@shared/components/dialogs/models/confirm-msg";
import { DialogMessage } from "@shared/components/dialogs/models/dialog-message";
import { OpenAiDialogData } from "./open-ai-dialog-data";

@Component({
  templateUrl: "./stat-data-cache-records.component.html",
  styleUrls: ["./stat-data-cache-records.component.scss"],
  standalone: false,
})
export class StatDataCacheRecordsComponent implements OnInit, OnDestroy {
  items: Array<StatDataCacheChangeSubscription> | null = null;
  source: PaginatedList<StatDataCacheChangeSubscription> | null = null;
  currentPage: number = 1;

  createForm: TelegramSubscriptionCreateForm | null = null;
  confirmDeletionMessage: DialogMessage<ConfirmMsg> | null = null;
  openAiDialogData: OpenAiDialogData | null = null;

  constructor(
    private readonly service: TelegramSubscriptionsService,
    titleService: TitleService,
    private readonly alert: AlertService,
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
      .search({
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
      .activate(item.id)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.loadData(this.currentPage);
      });
  }

  deactivate(item: StatDataCacheChangeSubscription): void {
    this.service
      .deactivate(item.id)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.loadData(this.currentPage);
      });
  }

  delete(item: StatDataCacheChangeSubscription): void {
    this.confirmDeletionMessage = new DialogMessage(
      new ConfirmMsg(
        "Удалить подписку",
        "Вы уверены, что хотите удалить подписку?",
        () => {
          this.service
            .delete(item.id)
            .pipe(untilDestroyed(this))
            .subscribe(() => {
              this.alert.success("Подписка удалена");
              this.loadData(this.currentPage);
            });
        },
      ),
    );
  }

  create(): void {
    this.createForm = new TelegramSubscriptionCreateForm();
  }

  onCreateModalDlgClose(): void {
    this.createForm = null;
  }

  onCreateFormSubmit(): void {
    if (this.createForm == null) {
      return;
    }

    const createRequest = this.createForm.createRequestOrNull();
    if (createRequest == null) {
      return;
    }

    this.service
      .create(createRequest)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.alert.success("Подписка была создана");
        this.createForm = null;
        this.ngOnInit();
      });
  }

  getOpenAiAnalysis(item: StatDataCacheChangeSubscription): void {
    this.service
      .getOpenAiAnalysis(item.id)
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.openAiDialogData = new OpenAiDialogData(
          "Open AI анализ",
          JSON.stringify(x, null, 2),
        );
      });
  }

  getOpenAiReport(item: StatDataCacheChangeSubscription): void {
    this.service
      .getOpenAiReport(item.id)
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.openAiDialogData = new OpenAiDialogData(
          "Open AI данные",
          JSON.stringify(x, null, 2),
        );
      });
  }

  onOpenAiDlgClose(): void {
    this.openAiDialogData = null;
  }

  ngOnDestroy(): void {
    // ignored
  }
}
