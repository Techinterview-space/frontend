import { Component, OnDestroy, OnInit } from "@angular/core";
import { PaginatedList } from "@models/paginated-list";
import {
  VacancyListItem,
  VacancyStatus,
  VacancyStatusEnum,
} from "@models/vacancy.model";
import { TitleService } from "@services/title.service";
import {
  AdminVacanciesSearchParams,
  VacanciesService,
} from "@services/vacancies.service";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";

@Component({
  templateUrl: "./vacancies-admin-page.component.html",
  styleUrls: ["./vacancies-admin-page.component.scss"],
  standalone: false,
})
export class VacanciesAdminPageComponent implements OnInit, OnDestroy {
  readonly MIN_SEARCH_QUERY_LENGTH = 2;
  readonly TITLE_MAX_DISPLAY_LENGTH = 50;
  readonly statusEnum = VacancyStatusEnum;
  readonly VacancyStatus = VacancyStatus;

  vacancies: Array<VacancyListItem> | null = null;
  source: PaginatedList<VacancyListItem> | null = null;
  currentPage: number = 1;
  searchQuery: string = "";
  filter: string = "all";

  constructor(
    private readonly service: VacanciesService,
    private readonly title: TitleService,
    private readonly alert: AlertService,
  ) {
    this.title.setTitle("Вакансии в системе");
  }

  ngOnInit(): void {
    this.loadData(1);
  }

  loadData(pageToLoad: number): void {
    this.vacancies = null;
    this.source = null;
    this.currentPage = pageToLoad;

    const params: AdminVacanciesSearchParams = {
      page: pageToLoad,
      pageSize: 20,
      searchQuery:
        this.searchQuery && this.searchQuery.length >= this.MIN_SEARCH_QUERY_LENGTH
          ? this.searchQuery
          : undefined,
      ...this.buildStatusParams(),
    };

    this.service
      .searchForAdmin(params)
      .pipe(untilDestroyed(this))
      .subscribe((i) => {
        this.vacancies = i.results;
        this.source = i;
      });
  }

  search(): void {
    this.currentPage = 1;
    this.loadData(1);
  }

  onKeyupEvent(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.search();
    }
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadData(1);
  }

  clearSearch(): void {
    this.searchQuery = "";
    this.currentPage = 1;
    this.loadData(1);
  }

  moveTo(item: VacancyListItem, status: VacancyStatus): void {
    this.service
      .changeStatusByAdmin(item.id, status)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.alert.success("Статус вакансии изменен");
        this.loadData(this.currentPage);
      });
  }

  restore(item: VacancyListItem): void {
    this.service
      .restoreByAdmin(item.id)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.alert.success("Вакансия восстановлена");
        this.loadData(this.currentPage);
      });
  }

  trimTitle(title: string): string {
    return title.length > this.TITLE_MAX_DISPLAY_LENGTH
      ? title.slice(0, this.TITLE_MAX_DISPLAY_LENGTH) + "…"
      : title;
  }

  private buildStatusParams(): {
    status?: VacancyStatus | null;
    deleted?: boolean;
  } {
    switch (this.filter) {
      case "deleted":
        return { deleted: true };
      case "draft":
        return { status: VacancyStatus.Draft };
      case "public":
        return { status: VacancyStatus.Public };
      case "closed":
        return { status: VacancyStatus.Closed };
      default:
        return {};
    }
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
  }
}
