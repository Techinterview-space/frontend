import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
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

  addQuestion(): void {
    this.formGroup!.addQuestion();
  }

  removeQuestion(questionIndex: number): void {
    this.formGroup!.removeQuestion(questionIndex);
  }

  moveQuestionUp(questionIndex: number): void {
    this.formGroup!.moveQuestionUp(questionIndex);
  }

  moveQuestionDown(questionIndex: number): void {
    this.formGroup!.moveQuestionDown(questionIndex);
  }

  addOption(questionIndex: number): void {
    this.formGroup!.addOption(questionIndex);
  }

  removeOption(questionIndex: number, optionIndex: number): void {
    this.formGroup!.removeOption(questionIndex, optionIndex);
  }

  moveOptionUp(questionIndex: number, optionIndex: number): void {
    this.formGroup!.moveOptionUp(questionIndex, optionIndex);
  }

  moveOptionDown(questionIndex: number, optionIndex: number): void {
    this.formGroup!.moveOptionDown(questionIndex, optionIndex);
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

    let createdSlug: string | null = null;

    this.service
      .create(request)
      .pipe(
        switchMap((survey) => {
          createdSlug = survey.slug;
          return this.service.publish(survey.id);
        }),
        untilDestroyed(this),
      )
      .subscribe({
        next: (published) => {
          this.alertService.success("Опрос опубликован");
          this.router.navigate(["/surveys", published.slug]);
        },
        error: () => {
          if (createdSlug != null) {
            this.alertService.error(
              "Опрос создан, но не удалось опубликовать",
            );
            this.router.navigate(["/surveys", createdSlug, "edit"]);
          } else {
            this.alertService.error("Не удалось создать опрос");
          }
        },
      });
  }
}
