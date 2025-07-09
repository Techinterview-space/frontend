import { Component, OnDestroy, OnInit } from "@angular/core";
import { defaultPageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import {
  SalariesStatSubscription,
  SubscriptionRegularityType,
} from "@models/telegram";
import { TelegramSubscriptionsService } from "@services/telegram-subscriptions.service";

import { AlertService } from "@shared/components/alert/services/alert.service";
import { ConfirmMsg } from "@shared/components/dialogs/models/confirm-msg";
import { DialogMessage } from "@shared/components/dialogs/models/dialog-message";
import { OpenAiDialogData } from "../open-ai-dialog-data";
import { TelegramSubscriptionEditForm } from "./subscription-edit-form";

@Component({
  templateUrl: "./stat-data-cache-records.component.html",
  styleUrls: ["./stat-data-cache-records.component.scss"],
  standalone: false,
})
export class StatDataCacheRecordsComponent implements OnInit, OnDestroy {
  items: Array<SalariesStatSubscription> | null = null;
  source: PaginatedList<SalariesStatSubscription> | null = null;
  currentPage: number = 1;

  editForm: TelegramSubscriptionEditForm | null = null;
  confirmDeletionMessage: DialogMessage<ConfirmMsg> | null = null;
  openAiDialogData: OpenAiDialogData | null = null;

  constructor(
    private readonly service: TelegramSubscriptionsService,
    titleService: TitleService,
    private readonly alert: AlertService,
  ) {
    titleService.setTitle("Подписки в Telegram (зарплаты)");
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

  activate(item: SalariesStatSubscription): void {
    this.service
      .activate(item.id)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.loadData(this.currentPage);
      });
  }

  deactivate(item: SalariesStatSubscription): void {
    this.service
      .deactivate(item.id)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.loadData(this.currentPage);
      });
  }

  delete(item: SalariesStatSubscription): void {
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
    this.editForm = new TelegramSubscriptionEditForm(null);
  }

  onEditModalDlgClose(): void {
    this.editForm = null;
  }

  onEditFormSubmit(): void {
    if (this.editForm == null) {
      return;
    }

    const createRequest = this.editForm.createRequestOrNull();
    if (createRequest == null) {
      return;
    }

    const itemId = this.editForm.getItemId();
    if (this.editForm.hasItemToEdit() && itemId != null) {
      this.service
        .update(itemId, createRequest)
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.alert.success("Подписка была обновлена");
          this.editForm = null;
          this.ngOnInit();
        });

      return;
    }

    this.service
      .create(createRequest)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.alert.success("Подписка была создана");
        this.editForm = null;
        this.ngOnInit();
      });
  }

  getOpenAiAnalysis(item: SalariesStatSubscription): void {
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

  getOpenAiReport(item: SalariesStatSubscription): void {
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

  sendUpdates(item: SalariesStatSubscription): void {
    this.service
      .sendUpdates(item.id)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.alert.success("Сообщение отправлено");
      });
  }

  onOpenAiDlgClose(): void {
    this.openAiDialogData = null;
  }

  openEditDlg(item: SalariesStatSubscription): void {
    this.editForm = new TelegramSubscriptionEditForm(item);
  }

  getRegularityTitle(regularity: SubscriptionRegularityType): string {
    return SubscriptionRegularityType[regularity];
  }

  ngOnDestroy(): void {
    // ignored
  }
}
