import { Component, OnDestroy, OnInit } from "@angular/core";
import { defaultPageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import {
  CompanyReviewsStatSubscription,
  SubscriptionRegularityType,
} from "@models/telegram";

import { AlertService } from "@shared/components/alert/services/alert.service";
import { ConfirmMsg } from "@shared/components/dialogs/models/confirm-msg";
import { DialogMessage } from "@shared/components/dialogs/models/dialog-message";
import { OpenAiDialogData } from "../open-ai-dialog-data";
import { TelegramSubscriptionEditForm } from "./subscription-edit-form";
import { CompanyReviewsTelegramSubscriptionsService } from "@services/company-reviews-telegram.service";

@Component({
  templateUrl: "./reviews-stat-subscriptions.component.html",
  styleUrls: ["./reviews-stat-subscriptions.component.scss"],
  standalone: false,
})
export class CompanyReviewsStatSubscriptionsComponent
  implements OnInit, OnDestroy
{
  items: Array<CompanyReviewsStatSubscription> | null = null;
  source: PaginatedList<CompanyReviewsStatSubscription> | null = null;
  currentPage: number = 1;

  editForm: TelegramSubscriptionEditForm | null = null;
  confirmDeletionMessage: DialogMessage<ConfirmMsg> | null = null;
  openAiDialogData: OpenAiDialogData | null = null;

  constructor(
    private readonly service: CompanyReviewsTelegramSubscriptionsService,
    titleService: TitleService,
    private readonly alert: AlertService,
  ) {
    titleService.setTitle("Подписики в Telegram (отзывы)");
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

  activate(item: CompanyReviewsStatSubscription): void {
    this.service
      .activate(item.id)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.loadData(this.currentPage);
      });
  }

  deactivate(item: CompanyReviewsStatSubscription): void {
    this.service
      .deactivate(item.id)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.loadData(this.currentPage);
      });
  }

  delete(item: CompanyReviewsStatSubscription): void {
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

  getOpenAiAnalysis(item: CompanyReviewsStatSubscription): void {
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

  getOpenAiReport(item: CompanyReviewsStatSubscription): void {
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

  sendUpdates(item: CompanyReviewsStatSubscription): void {
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

  openEditDlg(item: CompanyReviewsStatSubscription): void {
    this.editForm = new TelegramSubscriptionEditForm(item);
  }

  getRegularityTitle(regularity: SubscriptionRegularityType): string {
    return SubscriptionRegularityType[regularity];
  }

  ngOnDestroy(): void {
    // ignored
  }
}
