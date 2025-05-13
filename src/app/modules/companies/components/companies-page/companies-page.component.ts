import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Company } from "@models/companies.model";
import { defaultPageParams, PageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import { CompaniesService } from "@services/companies.service";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { CompanyListItem } from "./company-list-item";
import { GoogleAnalyticsService } from "ngx-google-analytics";

@Component({
  templateUrl: "./companies-page.component.html",
  styleUrls: ["./companies-page.component.scss"],
  standalone: false,
})
export class CompaniesPageComponent implements OnInit, OnDestroy {
  companies: Array<CompanyListItem> | null = null;
  source: PaginatedList<Company> | null = null;
  currentPage: number = 1;
  searchQuery: string = "";
  withRating: boolean = false;

  get searchButtonShouldBeEnabled(): boolean {
    return (
      (this.searchQuery != null && this.searchQuery.length >= 3) ||
      this.withRating === true
    );
  }

  private skipNextQueryParamsUpdate: boolean = false;

  constructor(
    private readonly service: CompaniesService,
    private readonly title: TitleService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly gtag: GoogleAnalyticsService,
  ) {
    this.title.setTitle("Отзывы к IT компаниям");
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(untilDestroyed(this)).subscribe((params) => {
      if (this.skipNextQueryParamsUpdate) {
        this.skipNextQueryParamsUpdate = false;
        return;
      }

      this.currentPage = params["page"] ? Number(params["page"]) : 1;
      this.searchQuery = params["search"] || "";
      this.withRating = params["withRating"] === "true";

      this.loadData(this.currentPage, this.withRating, false);
    });
  }

  search(): void {
    if (this.searchButtonShouldBeEnabled) {
      this.gtag.event(
        "company_search_query_submitted",
        "company_reviews",
        this.searchQuery,
      );

      this.currentPage = 1;
      this.loadData(1, this.withRating, true);
    }
  }

  onKeyupEvent(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.search();
    }
  }

  clearSearch(): void {
    if (this.searchQuery.length >= 3 || this.withRating) {
      this.searchQuery = "";
      this.gtag.event(
        "company_search_query_reset_submitted",
        "company_reviews",
        this.searchQuery,
      );

      this.skipNextQueryParamsUpdate = true;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {},
      });

      this.currentPage = 1;
      this.loadData(1, false, false);
    }
  }

  loadData(
    pageToLoad: number,
    withRating: boolean,
    updateUrl: boolean = true,
  ): void {
    this.companies = null;
    this.source = null;
    this.currentPage = pageToLoad;
    this.withRating = withRating;

    if (updateUrl) {
      this.skipNextQueryParamsUpdate = true;
      this.updateUrlParams(pageToLoad);
    }

    this.service
      .all({
        searchQuery: this.searchQuery,
        page: pageToLoad,
        pageSize: 6,
        withRating: this.withRating,
      })
      .pipe(untilDestroyed(this))
      .subscribe((i) => {
        this.companies = i.results.map((c) => new CompanyListItem(c));
        this.source = i;
      });
  }

  private updateUrlParams(page: number): void {
    const queryParams: any = { page };

    if (this.searchQuery && this.searchQuery.length >= 3) {
      queryParams.search = this.searchQuery;
    }

    if (this.withRating) {
      queryParams.withRating = "true";
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: "merge",
    });
  }

  navigateToCompany(id: string): void {
    const state: { page: number; search?: string } = {
      page: this.currentPage,
    };

    if (this.searchQuery && this.searchQuery.length >= 3) {
      state.search = this.searchQuery;
    }

    this.router.navigate(["/companies", id], { state });
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
  }

  onChangeWithRating(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.withRating = target.value === "true";
  }
}
