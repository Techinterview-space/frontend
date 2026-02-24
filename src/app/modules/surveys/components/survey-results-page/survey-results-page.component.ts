import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import {
  PublicSurvey,
  PublicSurveyResults,
} from "@models/public-survey.model";
import { PublicSurveysService } from "@services/public-surveys.service";
import { TitleService } from "@services/title.service";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { ActivatedRouteExtended } from "@shared/routes/activated-route-extended";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { SurveyResultsChart } from "./survey-results-chart";

@Component({
  templateUrl: "./survey-results-page.component.html",
  styleUrls: ["./survey-results-page.component.scss"],
  standalone: false,
})
export class SurveyResultsPageComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  survey: PublicSurvey | null = null;
  results: PublicSurveyResults | null = null;
  loading = true;
  error: string | null = null;
  linkCopied = false;

  canvasIds: string[] = [];

  private slug: string | null = null;
  private charts: SurveyResultsChart[] = [];
  private chartsPending = false;
  private viewReady = false;
  private readonly activateRoute: ActivatedRouteExtended;

  constructor(
    private readonly service: PublicSurveysService,
    private readonly title: TitleService,
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
          this.error = "Опрос не найден";
          this.loading = false;
          return;
        }

        this.slug = slug;
        this.loadData(slug);
      });
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    if (this.chartsPending) {
      this.initCharts();
    }
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
    this.destroyCharts();
  }

  getCanvasId(index: number): string {
    return this.canvasIds[index] ?? "";
  }

  copyLink(): void {
    if (this.slug == null) {
      return;
    }

    const url = `${window.location.origin}/surveys/${this.slug}`;
    navigator.clipboard.writeText(url).then(() => {
      this.linkCopied = true;
      this.alertService.success("Ссылка скопирована");
      setTimeout(() => {
        this.linkCopied = false;
      }, 2000);
    });
  }

  private loadData(slug: string): void {
    this.loading = true;

    this.service
      .getBySlug(slug)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (survey) => {
          this.survey = survey;
          this.title.setTitle(`Результаты: ${survey.title}`);
          this.loadResults(slug);
        },
        error: (error: unknown) => {
          this.error =
            error instanceof HttpErrorResponse && error.status === 404
              ? "Опрос не найден"
              : "Не удалось загрузить опрос";
          this.loading = false;
        },
      });
  }

  private loadResults(slug: string): void {
    this.service
      .getResults(slug)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (results) => {
          this.results = results;
          this.canvasIds = results.questions.map(
            (_, i) => `pie_${i}_${Math.random().toString(36).substring(2)}`,
          );
          this.loading = false;
          this.chartsPending = true;
          if (this.viewReady) {
            // Delay to ensure the canvas DOM elements exist after *ngIf resolves
            setTimeout(() => this.initCharts());
          }
        },
        error: (error: unknown) => {
          this.error = this.getResultsErrorMessage(error);
          this.loading = false;
        },
      });
  }

  private getResultsErrorMessage(error: unknown): string {
    if (!(error instanceof HttpErrorResponse)) {
      return "Не удалось загрузить результаты опроса";
    }

    switch (error.status) {
      case 400:
        return "Вы должны ответить на опрос, чтобы увидеть результаты";
      case 401:
        return "Необходимо авторизоваться, чтобы увидеть результаты";
      case 404:
        return "Опрос не найден";
      default:
        return "Не удалось загрузить результаты опроса";
    }
  }

  private initCharts(): void {
    if (this.results == null) {
      return;
    }

    this.destroyCharts();

    this.results.questions.forEach((question, index) => {
      if (question.options.length === 0) {
        return;
      }

      const canvasId = this.canvasIds[index];
      if (canvasId) {
        const chart = new SurveyResultsChart(canvasId, question.options);
        this.charts.push(chart);
      }
    });

    this.chartsPending = false;
  }

  private destroyCharts(): void {
    this.charts.forEach((chart) => chart.destroy());
    this.charts = [];
  }
}
