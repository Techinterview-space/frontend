import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PublicSurveysService } from "@services/public-surveys.service";
import { TitleService } from "@services/title.service";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { SurveyFormGroup } from "../survey-form-group";

@Component({
  templateUrl: "./survey-create-page.component.html",
  styleUrls: ["./survey-create-page.component.scss"],
  standalone: false,
})
export class SurveyCreatePageComponent implements OnInit, OnDestroy {
  formGroup: SurveyFormGroup | null = null;
  dragIndex: number | null = null;
  dragOverIndex: number | null = null;

  constructor(
    private readonly service: PublicSurveysService,
    private readonly title: TitleService,
    private readonly router: Router,
    private readonly alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.title.setTitle("Создать опрос");
    this.formGroup = new SurveyFormGroup();
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
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

  saveAsDraft(): void {
    const request = this.formGroup!.createRequest();
    if (!request) {
      return;
    }

    this.service
      .create(request)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (survey) => {
          this.alertService.success("Опрос создан как черновик");
          this.router.navigate(["/surveys", survey.slug, "edit"]);
        },
        error: () => {
          this.alertService.error("Не удалось создать опрос");
        },
      });
  }

  saveAndPublish(): void {
    const request = this.formGroup!.createRequest();
    if (!request) {
      return;
    }

    this.service
      .create(request)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (survey) => {
          this.service
            .publish(survey.id)
            .pipe(untilDestroyed(this))
            .subscribe({
              next: (published) => {
                this.alertService.success("Опрос опубликован");
                this.router.navigate(["/surveys", published.slug]);
              },
              error: () => {
                this.alertService.error(
                  "Опрос создан, но не удалось опубликовать",
                );
                this.router.navigate(["/surveys", survey.slug, "edit"]);
              },
            });
        },
        error: () => {
          this.alertService.error("Не удалось создать опрос");
        },
      });
  }
}
