import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  MySurveyListItem,
  PublicSurveyStatus,
  PublicSurveyStatusEnum,
} from "@models/public-survey.model";
import { PublicSurveysService } from "@services/public-surveys.service";
import { TitleService } from "@services/title.service";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";

type StatusFilter = "all" | "draft" | "published" | "closed";

@Component({
  templateUrl: "./my-surveys-page.component.html",
  styleUrls: ["./my-surveys-page.component.scss"],
  standalone: false,
})
export class MySurveysPageComponent implements OnInit, OnDestroy {
  surveys: MySurveyListItem[] = [];
  loading = true;
  activeFilter: StatusFilter = "all";
  showDeleted = false;
  searchQuery = "";

  constructor(
    private readonly service: PublicSurveysService,
    private readonly title: TitleService,
    private readonly alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.title.setTitle("Мои опросы");
    this.loadSurveys();
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
  }

  get filteredSurveys(): MySurveyListItem[] {
    let items = this.surveys;

    if (!this.showDeleted) {
      items = items.filter((s) => s.deletedAt == null);
    }

    if (this.activeFilter !== "all") {
      const statusMap: Record<StatusFilter, PublicSurveyStatus> = {
        all: PublicSurveyStatus.Undefined,
        draft: PublicSurveyStatus.Draft,
        published: PublicSurveyStatus.Published,
        closed: PublicSurveyStatus.Closed,
      };
      const status = statusMap[this.activeFilter];
      items = items.filter((s) => s.status === status);
    }

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.trim().toLowerCase();
      items = items.filter((s) => s.title.toLowerCase().includes(query));
    }

    return items;
  }

  setFilter(filter: StatusFilter): void {
    this.activeFilter = filter;
  }

  toggleShowDeleted(): void {
    this.showDeleted = !this.showDeleted;
    this.loadSurveys();
  }

  statusLabel(status: PublicSurveyStatus): string {
    return PublicSurveyStatusEnum.label(status);
  }

  statusBadgeClass(item: MySurveyListItem): string {
    switch (item.status) {
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

  isDraft(item: MySurveyListItem): boolean {
    return item.status === PublicSurveyStatus.Draft;
  }

  isPublished(item: MySurveyListItem): boolean {
    return item.status === PublicSurveyStatus.Published;
  }

  isClosed(item: MySurveyListItem): boolean {
    return item.status === PublicSurveyStatus.Closed;
  }

  isDeleted(item: MySurveyListItem): boolean {
    return item.deletedAt != null;
  }

  publish(item: MySurveyListItem): void {
    this.service
      .publish(item.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.alertService.success("Опрос опубликован");
          this.loadSurveys();
        },
        error: () => {
          this.alertService.error("Не удалось опубликовать опрос");
        },
      });
  }

  close(item: MySurveyListItem): void {
    this.service
      .close(item.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.alertService.success("Опрос закрыт");
          this.loadSurveys();
        },
        error: () => {
          this.alertService.error("Не удалось закрыть опрос");
        },
      });
  }

  reopen(item: MySurveyListItem): void {
    this.service
      .reopen(item.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.alertService.success("Опрос открыт заново");
          this.loadSurveys();
        },
        error: () => {
          this.alertService.error("Не удалось открыть опрос");
        },
      });
  }

  deleteSurvey(item: MySurveyListItem): void {
    this.service
      .delete(item.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.alertService.success("Опрос удалён");
          this.loadSurveys();
        },
        error: () => {
          this.alertService.error("Не удалось удалить опрос");
        },
      });
  }

  restore(item: MySurveyListItem): void {
    this.service
      .restore(item.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.alertService.success("Опрос восстановлен");
          this.loadSurveys();
        },
        error: () => {
          this.alertService.error("Не удалось восстановить опрос");
        },
      });
  }

  private loadSurveys(): void {
    this.loading = true;
    this.service
      .getMySurveys(this.showDeleted || undefined)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (surveys) => {
          this.surveys = surveys;
          this.loading = false;
        },
        error: () => {
          this.alertService.error("Не удалось загрузить опросы");
          this.loading = false;
        },
      });
  }
}
