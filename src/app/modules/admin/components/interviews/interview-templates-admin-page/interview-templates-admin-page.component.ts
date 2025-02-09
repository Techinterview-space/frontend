import { Component, OnDestroy, OnInit } from "@angular/core";
import { InterviewTemplate } from "@models/interview-models";
import { defaultPageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import { InterviewTemplatesService } from "@services/interview-templates.service";
import { TitleService } from "@services/title.service";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { ConfirmMsg } from "@shared/components/dialogs/models/confirm-msg";
import { DialogMessage } from "@shared/components/dialogs/models/dialog-message";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";

@Component({
    templateUrl: "./interview-templates-admin-page.component.html",
    standalone: false
})
export class InterviewTemplatesAdminPageComponent implements OnInit, OnDestroy {
  templates: PaginatedList<InterviewTemplate> | null = null;
  confirmDeletionMessage: DialogMessage<ConfirmMsg> | null = null;

  constructor(
    private readonly service: InterviewTemplatesService,
    private readonly title: TitleService,
    private readonly alert: AlertService
  ) {}

  ngOnInit(): void {
    this.title.setTitle("Шаблоны для интервью");
    this.loadTemplates();
  }

  loadTemplates(page = 1): void {
    this.service
      .all({ ...defaultPageParams, page })
      .pipe(untilDestroyed(this))
      .subscribe((templates) => (this.templates = templates));
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
  }

  openDeleteDialog(item: InterviewTemplate): void {
    this.confirmDeletionMessage = new DialogMessage(
      new ConfirmMsg("Delete the template", "Are you sure to delete?", () => {
        this.service
          .delete(item.id)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this.alert.success("Template was deleted");
            this.loadTemplates();
          });
      })
    );
  }
}
