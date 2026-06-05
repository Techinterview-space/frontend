import { Component, OnDestroy, OnInit } from "@angular/core";
import { PaginatedList } from "@models/paginated-list";
import { VacancyListItem, VacancyStatus, VacancyStatusEnum } from "@models/vacancy.model";
import { TitleService } from "@services/title.service";
import {
  MyVacanciesSearchParams,
  VacanciesService,
} from "@services/vacancies.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";

@Component({
  templateUrl: "./my-vacancies-page.component.html",
  styleUrls: ["./my-vacancies-page.component.scss"],
  standalone: false,
})
export class MyVacanciesPageComponent implements OnInit, OnDestroy {
  readonly MIN_SEARCH_QUERY_LENGTH = 2;
  readonly statusEnum = VacancyStatusEnum;

  vacancies: Array<VacancyListItem> | null = null;
  source: PaginatedList<VacancyListItem> | null = null;
  currentPage: number = 1;
  searchQuery: string = "";
  filter: string = "all";
  hasAnyVacancy: boolean = true;

  constructor(
    private readonly service: VacanciesService,
    private readonly title: TitleService,
  ) {
    this.title.setTitle("Мои вакансии");
  }

  ngOnInit(): void {
    this.loadData(1);
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

  loadData(pageToLoad: number): void {
    this.vacancies = null;
    this.source = null;
    this.currentPage = pageToLoad;

    const params: MyVacanciesSearchParams = {
      page: pageToLoad,
      pageSize: 10,
      searchQuery:
        this.searchQuery && this.searchQuery.length >= this.MIN_SEARCH_QUERY_LENGTH
          ? this.searchQuery
          : undefined,
      ...this.buildStatusParams(),
    };

    this.service
      .my(params)
      .pipe(untilDestroyed(this))
      .subscribe((i) => {
        this.vacancies = i.results;
        this.source = i;
        this.hasAnyVacancy = i.hasAnyVacancy;
      });
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
