import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  PublicSurvey,
  PublicSurveyQuestion,
  PublicSurveyStatus,
  PublicSurveyStatusEnum,
} from "@models/public-survey.model";
import { MetaTagService } from "@services/meta-tags.service";
import { PublicSurveysService } from "@services/public-surveys.service";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { ActivatedRouteExtended } from "@shared/routes/activated-route-extended";
import { AuthService } from "@shared/services/auth/auth.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { CookieService } from "ngx-cookie-service";

@Component({
  templateUrl: "./survey-view-page.component.html",
  styleUrls: ["./survey-view-page.component.scss"],
  standalone: false,
})
export class SurveyViewPageComponent implements OnInit, OnDestroy {
  survey: PublicSurvey | null = null;
  loading = true;
  notFound = false;
  submitting = false;
  isAuthenticated = false;

  selectedOptions: Map<string, Set<string>> = new Map();

  private readonly activateRoute: ActivatedRouteExtended;

  constructor(
    private readonly service: PublicSurveysService,
    private readonly metaTagService: MetaTagService,
    private readonly router: Router,
    private readonly alertService: AlertService,
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
    activatedRoute: ActivatedRoute,
  ) {
    this.activateRoute = new ActivatedRouteExtended(activatedRoute);
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();

    this.activateRoute
      .getParam("slug")
      .pipe(untilDestroyed(this))
      .subscribe((slug) => {
        if (slug == null) {
          this.notFound = true;
          this.loading = false;
          return;
        }

        this.loadSurvey(slug);
      });
  }

  ngOnDestroy(): void {
    this.metaTagService.returnDefaultMetaTags();
  }

  get isPublished(): boolean {
    return this.survey?.status === PublicSurveyStatus.Published;
  }

  get isClosed(): boolean {
    return this.survey?.status === PublicSurveyStatus.Closed;
  }

  get isDraft(): boolean {
    return this.survey?.status === PublicSurveyStatus.Draft;
  }

  get hasUserResponded(): boolean {
    if (this.survey == null || this.survey.questions.length === 0) {
      return false;
    }

    return this.survey.questions.every((q) => q.hasUserResponded);
  }

  get canSubmit(): boolean {
    if (
      !this.isPublished ||
      !this.isAuthenticated ||
      this.hasUserResponded ||
      this.submitting ||
      this.survey == null
    ) {
      return false;
    }

    return this.survey.questions.every((q) => {
      const selected = this.selectedOptions.get(q.id);
      return selected != null && selected.size > 0;
    });
  }

  get showResponseForm(): boolean {
    return this.isPublished && !this.hasUserResponded && this.isAuthenticated;
  }

  get showAuthRequiredNotice(): boolean {
    return this.isPublished && !this.hasUserResponded && !this.isAuthenticated;
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

  get totalResponses(): number {
    return this.survey?.questions[0]?.totalResponses ?? 0;
  }

  getSortedOptions(question: PublicSurveyQuestion) {
    if (question.options == null) {
      return [];
    }

    return [...question.options].sort((a, b) => a.order - b.order);
  }

  toggleOption(questionId: string, optionId: string, allowMultiple: boolean): void {
    if (!this.selectedOptions.has(questionId)) {
      this.selectedOptions.set(questionId, new Set());
    }

    const selected = this.selectedOptions.get(questionId)!;

    if (allowMultiple) {
      if (selected.has(optionId)) {
        selected.delete(optionId);
      } else {
        selected.add(optionId);
      }
    } else {
      selected.clear();
      selected.add(optionId);
    }
  }

  isSelected(questionId: string, optionId: string): boolean {
    return this.selectedOptions.get(questionId)?.has(optionId) === true;
  }

  submit(): void {
    if (!this.canSubmit || this.survey == null) {
      return;
    }

    this.submitting = true;

    const answers = this.survey.questions.map((q) => ({
      questionId: q.id,
      optionIds: Array.from(this.selectedOptions.get(q.id) ?? []),
    }));

    this.service
      .submitResponse(this.survey.slug, { answers })
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.alertService.success("Ваш ответ принят!");
          this.router.navigate(["/surveys", this.survey!.slug, "results"]);
        },
        error: () => {
          this.submitting = false;
          this.alertService.error("Не удалось отправить ответ");
        },
      });
  }

  private loadSurvey(slug: string): void {
    this.loading = true;
    this.service
      .getBySlug(slug)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (survey) => {
          this.survey = survey;
          this.metaTagService.setPageMetaTags(
            survey.title,
            survey.description || `Опрос «${survey.title}» на Techinterview.space. Примите участие и поделитесь своим мнением`,
            `/surveys/${survey.slug}`,
          );
          this.loading = false;

          if (this.showAuthRequiredNotice) {
            this.cookieService.set("url", `/surveys/${survey.slug}`, Date.now(), "/");
          }

          if (this.hasUserResponded) {
            this.router.navigate(["/surveys", survey.slug, "results"]);
          }
        },
        error: () => {
          this.notFound = true;
          this.loading = false;
        },
      });
  }
}
