import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserRole } from "@models/enums";
import { InterviewTemplate } from "@models/interview-models";
import { InterviewTemplatesService } from "@services/interview-templates.service";
import { TitleService } from "@services/title.service";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { ConfirmMsg } from "@shared/components/dialogs/models/confirm-msg";
import { DialogMessage } from "@shared/components/dialogs/models/dialog-message";
import { ActivatedRouteExtended } from "@shared/routes/activated-route-extended";
import { AuthService } from "@shared/services/auth/auth.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";

@Component({
  selector: "app-interview-template-page",
  templateUrl: "./interview-template-page.component.html",
  styleUrls: ["./interview-template-page.component.scss"],
  standalone: false,
})
export class InterviewTemplatePageComponent implements OnInit, OnDestroy {
  pageTitle = "";
  interviewTemplate: InterviewTemplate | null = null;
  confirmDeletionMessage: DialogMessage<ConfirmMsg> | null = null;

  showEditButtons = false;

  private readonly activateRoute: ActivatedRouteExtended;

  constructor(
    private readonly auth: AuthService,
    private readonly service: InterviewTemplatesService,
    private readonly title: TitleService,
    private readonly alert: AlertService,
    private readonly router: Router,
    activatedRoute: ActivatedRoute,
  ) {
    this.activateRoute = new ActivatedRouteExtended(activatedRoute);
  }

  ngOnInit(): void {
    this.activateRoute
      .getParam("id")
      .pipe(untilDestroyed(this))
      .subscribe((id) => {
        this.service
          .byId(id!)
          .pipe(untilDestroyed(this))
          .subscribe((i) => {
            this.interviewTemplate = i;
            this.setTitle();

            this.auth
              .getCurrentUser()
              .pipe(untilDestroyed(this))
              .subscribe((cu) => {
                this.showEditButtons =
                  cu != null &&
                  (cu.hasRole(UserRole.Admin) ||
                    cu.id === this.interviewTemplate!.authorId);
              });
          });
      });
  }

  delete(): void {
    this.confirmDeletionMessage = new DialogMessage(
      new ConfirmMsg(
        "Удалить шаблон?",
        "Вы уверены, что хотите удалить его? Это действие нельзя отменить",
        () => {
          this.service.delete(this.interviewTemplate!.id).subscribe(() => {
            this.alert.info(
              `Шаблон (${this.interviewTemplate!.title}) был удален`,
              true,
            );
            this.router.navigate(["/interviews/templates/my"]);
          });
        },
      ),
    );
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
  }

  private setTitle(): void {
    this.pageTitle = this.interviewTemplate!.title;
    this.title.setTitle(this.pageTitle);
  }
}
