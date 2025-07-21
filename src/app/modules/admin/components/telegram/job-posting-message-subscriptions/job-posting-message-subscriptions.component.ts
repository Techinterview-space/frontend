import { Component, OnDestroy, OnInit } from "@angular/core";
import { defaultPageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import {
  JobPostingMessageSubscription,
  SubscriptionRegularityType,
} from "@models/telegram";
import { JobPostingMessageSubscriptionsService } from "@services/job-posting-message-subscriptions.service";

import { AlertService } from "@shared/components/alert/services/alert.service";
import { ConfirmMsg } from "@shared/components/dialogs/models/confirm-msg";
import { DialogMessage } from "@shared/components/dialogs/models/dialog-message";
import { OpenAiDialogData } from "../open-ai-dialog-data";
import { JobPostingMessageSubscriptionEditForm } from "./subscription-edit-form";

@Component({
  templateUrl: "./job-posting-message-subscriptions.component.html",
  styleUrls: ["./job-posting-message-subscriptions.component.scss"],
  standalone: false,
})
export class JobPostingMessageSubscriptionsComponent
  implements OnInit, OnDestroy
{
  items: Array<JobPostingMessageSubscription> | null = null;
  source: PaginatedList<JobPostingMessageSubscription> | null = null;
  currentPage: number = 1;

  editForm: JobPostingMessageSubscriptionEditForm | null = null;
  confirmDeletionMessage: DialogMessage<ConfirmMsg> | null = null;
  openAiDialogData: OpenAiDialogData | null = null;

  constructor(
    private readonly service: JobPostingMessageSubscriptionsService,
    titleService: TitleService,
    private readonly alert: AlertService,
  ) {
    titleService.setTitle("Подписки в Telegram на вакансии (вакансии)");
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

  activate(item: JobPostingMessageSubscription): void {
    this.service
      .activate(item.id)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.loadData(this.currentPage);
      });
  }

  deactivate(item: JobPostingMessageSubscription): void {
    this.service
      .deactivate(item.id)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.loadData(this.currentPage);
      });
  }

  delete(item: JobPostingMessageSubscription): void {
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
    this.editForm = new JobPostingMessageSubscriptionEditForm(null);
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

    this.service
      .create(createRequest)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.alert.success("Подписка была создана");
        this.editForm = null;
        this.ngOnInit();
      });
  }

  getRegularityTitle(regularity: SubscriptionRegularityType): string {
    return SubscriptionRegularityType[regularity];
  }

  ngOnDestroy(): void {
    // ignored
  }
}
