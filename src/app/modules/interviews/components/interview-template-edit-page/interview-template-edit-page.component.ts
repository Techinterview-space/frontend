import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Label } from "@models/user-label.model";
import { InterviewTemplatesService } from "@services/interview-templates.service";
import { TitleService } from "@services/title.service";
import { UserLabelsService } from "@services/user-labels.service";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { ActivatedRouteExtended } from "@shared/routes/activated-route-extended";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { InterviewTemplateFormGroup } from "./interview-template-form-group";

@Component({
  templateUrl: "./interview-template-edit-page.component.html",
  styleUrls: ["./interview-template-edit-page.component.scss"],
})
export class InterviewTemplateEditPageComponent implements OnInit, OnDestroy {
  pageTitle = "Создать шаблон";
  formGroup: InterviewTemplateFormGroup | null = null;

  labels: Array<Label> = [];
  selectedLabels: Array<Label> = [];

  get subjectsCount(): number {
    return this.formGroup?.subjectsCount ?? 0;
  }

  private readonly activateRoute: ActivatedRouteExtended;
  private templateId: string | null = null;

  constructor(
    private readonly service: InterviewTemplatesService,
    private readonly title: TitleService,
    private readonly alert: AlertService,
    private readonly router: Router,
    activatedRoute: ActivatedRoute,
    private readonly userLabelsService: UserLabelsService
  ) {
    this.activateRoute = new ActivatedRouteExtended(activatedRoute);
  }

  ngOnInit(): void {
    this.activateRoute
      .getParam("id")
      .pipe(untilDestroyed(this))
      .subscribe((id) => {
        this.templateId = id;
        if (this.templateId != null) {
          this.setTitle("Редактировать шаблон");
          this.service
            .byId(this.templateId)
            .pipe(untilDestroyed(this))
            .subscribe((i) => {
              this.formGroup = new InterviewTemplateFormGroup(i);
              this.selectedLabels = [...i.labels];
            });
          return;
        }

        this.setTitle("Создать шаблон");
        this.formGroup = new InterviewTemplateFormGroup();
      });

    this.userLabelsService
      .my()
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.labels = x;
      });
  }

  onSave(): void {
    if (this.templateId == null) {
      const createRequest = this.formGroup!.createRequest(this.selectedLabels);
      if (createRequest == null) {
        this.alert.error("Invalid form data");
        return;
      }

      this.service
        .create(createRequest)
        .pipe(untilDestroyed(this))
        .subscribe((id) => {
          this.alert.success("Шаблон создан");
          this.router.navigate(["/interviews/templates/" + this.templateId + "/edit"]);
        });
      return;
    }

    const updateRequest = this.formGroup!.updateRequest(this.selectedLabels);
    if (updateRequest == null) {
      this.alert.error("Invalid form data");
      return;
    }

    this.service
      .update(updateRequest)
      .pipe(untilDestroyed(this))
      .subscribe((id) => {
        this.alert.success("Шаблон обновлен");
        this.router.navigate(["/interviews/templates/my"]);
      });
  }

  addSubject(): void {
    this.formGroup!.addSubject();
  }

  removeSubject(subjectIndex: number): void {
    this.formGroup!.removeSubject(subjectIndex);
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
  }

  private setTitle(pageTitle: string): void {
    this.pageTitle = pageTitle;
    this.title.setTitle(pageTitle);
  }
}
