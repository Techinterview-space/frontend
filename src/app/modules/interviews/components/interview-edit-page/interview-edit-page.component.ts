import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { InterviewTemplate } from "@models/interview-models";
import { Label } from "@models/user-label.model";
import { InterviewTemplatesService } from "@services/interview-templates.service";
import { InterviewsService } from "@services/interviews.service";
import { TitleService } from "@services/title.service";
import { UserLabelsService } from "@services/user-labels.service";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { ActivatedRouteExtended } from "@shared/routes/activated-route-extended";
import { DeveloperGradeSelectItem } from "@shared/select-boxes/developer-grade-select-item";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { InterviewFormGroup } from "./interview-form-group";
import { InterviewTemplateSelectItem } from "./interview-template-select-item";

@Component({
  templateUrl: "./interview-edit-page.component.html",
  styleUrls: ["./interview-edit-page.component.scss"],
})
export class InterviewEditPageComponent implements OnInit, OnDestroy {
  pageTitle = "Новая заметка к интервью";

  formGroup: InterviewFormGroup | null = null;
  templates: Array<InterviewTemplateSelectItem> = [];
  selectedTemplate: InterviewTemplate | null = null;
  labels: Array<Label> = [];
  selectedLabels: Array<Label> = [];

  candidateFullname = "";
  showAddSubjectsFromTemplateModal = false;

  readonly grades: Array<DeveloperGradeSelectItem> =
    DeveloperGradeSelectItem.allGrades();

  get subjectsCount(): number {
    return this.formGroup?.subjectsCount ?? 0;
  }

  private readonly activateRoute: ActivatedRouteExtended;
  private interviewId: string | null = null;

  constructor(
    private readonly service: InterviewsService,
    private readonly templateService: InterviewTemplatesService,
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
        this.interviewId = id;

        this.templateService
          .availableForInterview()
          .pipe(untilDestroyed(this))
          .subscribe((templates) => {
            this.templates = templates.map(
              (t) => new InterviewTemplateSelectItem(t)
            );
          });

        if (this.interviewId == null) {
          this.setTitle("Новое интервью");
          this.formGroup = new InterviewFormGroup(null);
          return;
        }

        this.setTitle("Редактирование заметки");
        this.service
          .byId(this.interviewId)
          .pipe(untilDestroyed(this))
          .subscribe((i) => {
            this.formGroup = new InterviewFormGroup(i);
            this.selectedLabels = [...this.selectedLabels, ...i.labels];
          });
      });

    this.userLabelsService
      .my()
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.labels = x;
      });
  }

  onInterviewTemplateSelected(event: { target: any }): void {
    const templateId = event.target.value as string;
    if (templateId == null) {
      this.selectedTemplate = null;
      return;
    }

    this.selectedTemplate =
      this.templates.find((x) => x.item.id === templateId)?.item ?? null;
  }

  addSubjectsFromTemplate(): void {
    if (this.selectedTemplate != null) {
      this.formGroup!.addSubjectsFromTemplate(this.selectedTemplate);
      this.showAddSubjectsFromTemplateModal = false;
    }
  }

  clearSubjects(): void {
    this.formGroup!.clearSubjects();
  }

  onSave(): void {
    if (this.interviewId == null) {
      const createRequest = this.formGroup!.createRequest(this.selectedLabels);
      if (createRequest == null) {
        this.alert.error("Invalid form data");
        return;
      }

      this.service
        .create(createRequest)
        .pipe(untilDestroyed(this))
        .subscribe((id) => {
          this.alert.success("Interview was saved");
          this.router.navigate(["/interviews/my"]);
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
        this.alert.success("Interview was updated");
        this.router.navigate(["/interviews/my"]);
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

  openAddSubjectsFromTemplateModal(): void {
    this.showAddSubjectsFromTemplateModal = true;
  }

  onAddSubjectsFromTemplateModalClose(): void {
    this.showAddSubjectsFromTemplateModal = false;
  }

  private setTitle(pageTitle: string): void {
    this.pageTitle = pageTitle;
    this.title.setTitle(pageTitle);
  }
}
