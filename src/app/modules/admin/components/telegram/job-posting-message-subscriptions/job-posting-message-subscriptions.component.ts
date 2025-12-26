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
import { ProfessionsService } from "@services/professions.service";
import { LabelEntityDto } from "@services/label-entity.model";
import { SelectItem } from "@shared/select-boxes/select-item";

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

  professions: Array<LabelEntityDto> = [];
  professionsAsOptions: Array<SelectItem<number>> = [];

  selectedProfessionsForModal: Array<LabelEntityDto> | null = null;

  constructor(
    private readonly service: JobPostingMessageSubscriptionsService,
    private readonly professionsService: ProfessionsService,
    titleService: TitleService,
    private readonly alert: AlertService,
  ) {
    titleService.setTitle("Подписки в Telegram на вакансии (вакансии)");
  }

  ngOnInit(): void {
    this.items = null;
    this.source = null;

    this.loadProfessions();
    this.loadData(this.currentPage);
  }

  loadProfessions(): void {
    if (this.professions.length > 0) {
      return;
    }

    this.professionsService
      .allForSelectBoxes()
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.professions = x;
        this.professionsAsOptions = x.map((p) => ({
          value: p.id.toString(),
          item: p.id,
          label: p.title,
        }));
      });
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
        this.loadData(this.currentPage);
      });
  }

  getRegularityTitle(regularity: SubscriptionRegularityType): string {
    return SubscriptionRegularityType[regularity];
  }

  getProfessionNames(professionIds: number[] | null): string {
    if (!professionIds || professionIds.length === 0) {
      return "-";
    }

    return professionIds
      .map((id) => {
        const profession = this.professions.find((p) => p.id === id);
        return profession?.title ?? id.toString();
      })
      .join(", ");
  }

  openProfessionsModal(professionIds: number[] | null): void {
    if (!professionIds || professionIds.length === 0) {
      return;
    }

    this.selectedProfessionsForModal = professionIds
      .map((id) => this.professions.find((p) => p.id === id))
      .filter((p): p is LabelEntityDto => p != null);
  }

  closeProfessionsModal(): void {
    this.selectedProfessionsForModal = null;
  }

  ngOnDestroy(): void {
    // ignored
  }
}
