import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  PublicSurvey,
  PublicSurveyStatus,
  PublicSurveyStatusEnum,
} from "@models/public-survey.model";
import { PublicSurveysService } from "@services/public-surveys.service";
import { TitleService } from "@services/title.service";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { ActivatedRouteExtended } from "@shared/routes/activated-route-extended";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { SurveyFormGroup } from "../survey-form-group";

@Component({
  templateUrl: "./survey-edit-page.component.html",
  styleUrls: ["./survey-edit-page.component.scss"],
  standalone: false,
})
export class SurveyEditPageComponent implements OnInit, OnDestroy {
  formGroup: SurveyFormGroup | null = null;
  survey: PublicSurvey | null = null;
  dragIndex: number | null = null;
  dragOverIndex: number | null = null;

  private readonly activateRoute: ActivatedRouteExtended;

  constructor(
    private readonly service: PublicSurveysService,
    private readonly title: TitleService,
    private readonly router: Router,
    private readonly alertService: AlertService,
    activatedRoute: ActivatedRoute,
  ) {
    this.activateRoute = new ActivatedRouteExtended(activatedRoute);
  }

  ngOnInit(): void {
    this.activateRoute
      .getParam("slug")
      .pipe(untilDestroyed(this))
      .subscribe((slug) => {
        if (slug == null) {
          return;
        }

        this.loadSurvey(slug);
      });
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
  }

  get isDraft(): boolean {
    return this.survey?.status === PublicSurveyStatus.Draft;
  }

  get isPublished(): boolean {
    return this.survey?.status === PublicSurveyStatus.Published;
  }

  get isClosed(): boolean {
    return this.survey?.status === PublicSurveyStatus.Closed;
  }

  get isDeleted(): boolean {
    return this.survey?.deletedAt != null;
  }

  get statusLabel(): string {
    if (this.survey == null) {
      return "";
    }

    return PublicSurveyStatusEnum.label(this.survey.status);
  }

  get statusBadgeClass(): string {
    if (this.survey == null) {
      return "";
    }

    switch (this.survey.status) {
      case PublicSurveyStatus.Draft:
        return "bg-secondary";
      case PublicSurveyStatus.Published:
        return "bg-success";
      case PublicSurveyStatus.Closed:
        return "bg-warning text-dark";
      default:
        return "bg-secondary";
    }
  }

  generateSlug(): void {
    this.formGroup!.generateSlugFromTitle();
  }

  addOption(): void {
    this.formGroup!.addOption();
  }

  removeOption(index: number): void {
    this.formGroup!.removeOption(index);
  }

  moveUp(index: number): void {
    this.formGroup!.moveUp(index);
  }

  moveDown(index: number): void {
    this.formGroup!.moveDown(index);
  }

  onDragStart(index: number): void {
    this.dragIndex = index;
  }

  onDragOver(event: DragEvent, index: number): void {
    event.preventDefault();
    this.dragOverIndex = index;
  }

  onDragLeave(): void {
    this.dragOverIndex = null;
  }

  onDrop(index: number): void {
    if (this.dragIndex != null && this.dragIndex !== index) {
      this.formGroup!.moveOption(this.dragIndex, index);
    }

    this.dragIndex = null;
    this.dragOverIndex = null;
  }

  onDragEnd(): void {
    this.dragIndex = null;
    this.dragOverIndex = null;
  }

  save(): void {
    if (this.survey == null) {
      return;
    }

    const request = this.formGroup!.updateRequest();
    if (!request) {
      return;
    }

    this.service
      .update(this.survey.id, request)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (updated) => {
          this.alertService.success("Опрос обновлён");
          this.setSurvey(updated);
        },
        error: () => {
          this.alertService.error("Не удалось обновить опрос");
        },
      });
  }

  publish(): void {
    if (this.survey == null) {
      return;
    }

    this.service
      .publish(this.survey.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (updated) => {
          this.alertService.success("Опрос опубликован");
          this.setSurvey(updated);
        },
        error: () => {
          this.alertService.error("Не удалось опубликовать опрос");
        },
      });
  }

  close(): void {
    if (this.survey == null) {
      return;
    }

    this.service
      .close(this.survey.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (updated) => {
          this.alertService.success("Опрос закрыт");
          this.setSurvey(updated);
        },
        error: () => {
          this.alertService.error("Не удалось закрыть опрос");
        },
      });
  }

  reopen(): void {
    if (this.survey == null) {
      return;
    }

    this.service
      .reopen(this.survey.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (updated) => {
          this.alertService.success("Опрос открыт заново");
          this.setSurvey(updated);
        },
        error: () => {
          this.alertService.error("Не удалось открыть опрос");
        },
      });
  }

  deleteSurvey(): void {
    if (this.survey == null) {
      return;
    }

    this.service
      .delete(this.survey.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.alertService.success("Опрос удалён");
          this.router.navigate(["/surveys/my-surveys"]);
        },
        error: () => {
          this.alertService.error("Не удалось удалить опрос");
        },
      });
  }

  restore(): void {
    if (this.survey == null) {
      return;
    }

    this.service
      .restore(this.survey.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (updated) => {
          this.alertService.success("Опрос восстановлен");
          this.setSurvey(updated);
        },
        error: () => {
          this.alertService.error("Не удалось восстановить опрос");
        },
      });
  }

  private loadSurvey(slug: string): void {
    this.service
      .getBySlug(slug)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (survey) => {
          this.setSurvey(survey);
        },
        error: () => {
          this.alertService.error("Опрос не найден");
          this.router.navigate(["/surveys/my-surveys"]);
        },
      });
  }

  private setSurvey(survey: PublicSurvey): void {
    this.survey = survey;
    this.formGroup = new SurveyFormGroup(survey);
    this.title.setTitle(`Редактировать: ${survey.title}`);
  }
}
