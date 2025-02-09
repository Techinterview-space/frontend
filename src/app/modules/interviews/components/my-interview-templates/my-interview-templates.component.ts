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
    selector: "app-my-interview-templates",
    templateUrl: "./my-interview-templates.component.html",
    styleUrls: ["./my-interview-templates.component.scss"],
    standalone: false
})
export class MyInterviewTemplatesComponent implements OnInit, OnDestroy {
  templates: Array<InterviewTemplate> | null = null;
  confirmDeletionMessage: DialogMessage<ConfirmMsg> | null = null;

  constructor(
    private readonly service: InterviewTemplatesService,
    private readonly title: TitleService,
    private readonly alert: AlertService
  ) {}

  ngOnInit(): void {
    this.title.setTitle("My Interview templates");
    this.loadTemplates();
  }

  loadTemplates(): void {
    this.service
      .my()
      .pipe(untilDestroyed(this))
      .subscribe((templates) => (this.templates = templates));
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
  }

  delete(template: InterviewTemplate): void {
    this.confirmDeletionMessage = new DialogMessage(
      new ConfirmMsg(
        "Удалить шаблон?",
        "Вы уверены, что хотите удалить его? Это действие нельзя отменить",
        () => {
          this.service.delete(template.id).subscribe(() => {
            this.alert.info(`Шаблон (${template.title}) был удален`, true);
            this.ngOnInit();
          });
        }
      )
    );
  }
}
