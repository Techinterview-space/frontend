import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PaginatedList } from "@models/paginated-list";
import { VacancyListItem, VacancyStatusEnum } from "@models/vacancy.model";
import { MetaTagService } from "@services/meta-tags.service";
import { TitleService } from "@services/title.service";
import { VacanciesService } from "@services/vacancies.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";

@Component({
  templateUrl: "./vacancies-page.component.html",
  styleUrls: ["./vacancies-page.component.scss"],
  standalone: false,
})
export class VacanciesPageComponent implements OnInit, OnDestroy {
  readonly MIN_SEARCH_QUERY_LENGTH = 2;
  readonly statusEnum = VacancyStatusEnum;

  vacancies: Array<VacancyListItem> | null = null;
  source: PaginatedList<VacancyListItem> | null = null;
  currentPage: number = 1;
  searchQuery: string = "";

  private skipNextQueryParamsUpdate: boolean = false;

  get searchButtonShouldBeEnabled(): boolean {
    return (
      this.searchQuery != null &&
      this.searchQuery.length >= this.MIN_SEARCH_QUERY_LENGTH
    );
  }

  constructor(
    private readonly service: VacanciesService,
    private readonly title: TitleService,
    private readonly metaTagService: MetaTagService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {
    this.metaTagService.setPageMetaTags(
      "Вакансии в IT компаниях",
      "Открытые вакансии в IT компаниях. Найдите подходящую работу и свяжитесь с работодателем напрямую",
      "/vacancies",
      "https://techinterview.fra1.cdn.digitaloceanspaces.com/images/company_reviews_1000.png",
    );
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(untilDestroyed(this)).subscribe((params) => {
      if (this.skipNextQueryParamsUpdate) {
        this.skipNextQueryParamsUpdate = false;
        return;
      }

      const parsedPage = Number(params["page"]);
      this.currentPage =
        Number.isFinite(parsedPage) && parsedPage >= 1 ? parsedPage : 1;
      this.searchQuery = params["search"] || "";

      this.loadData(this.currentPage, false);
    });
  }

  search(): void {
    if (this.searchButtonShouldBeEnabled) {
      this.currentPage = 1;
      this.loadData(1, true);
    }
  }

  onKeyupEvent(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.search();
    }
  }

  clearSearch(): void {
    this.searchQuery = "";
    this.currentPage = 1;

    // Only arm the skip-flag when the navigation will actually change the URL
    // (and therefore emit queryParams). Navigating to {} when there are no
    // params is a same-URL no-op, which would leave the flag set and wrongly
    // skip the next genuine queryParams change.
    if (Object.keys(this.route.snapshot.queryParams).length > 0) {
      this.skipNextQueryParamsUpdate = true;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {},
      });
    }

    this.loadData(1, false);
  }

  loadData(pageToLoad: number, updateUrl: boolean = true): void {
    this.vacancies = null;
    this.source = null;
    this.currentPage = pageToLoad;

    if (updateUrl) {
      this.skipNextQueryParamsUpdate = true;
      this.updateUrlParams(pageToLoad);
    }

    this.service
      .search({
        page: pageToLoad,
        pageSize: 10,
        searchQuery: this.searchQuery,
      })
      .pipe(untilDestroyed(this))
      .subscribe((i) => {
        this.vacancies = i.results;
        this.source = i;
      });
  }

  private updateUrlParams(page: number): void {
    const queryParams: any = { page };

    if (
      this.searchQuery &&
      this.searchQuery.length >= this.MIN_SEARCH_QUERY_LENGTH
    ) {
      queryParams.search = this.searchQuery;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: "merge",
    });
  }

  ngOnDestroy(): void {
    this.metaTagService.returnDefaultMetaTags();
    this.title.resetTitle();
  }
}
