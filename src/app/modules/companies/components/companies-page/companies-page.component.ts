import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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

  constructor(
    private readonly service: CompaniesService,
    private readonly title: TitleService,
    private readonly router: Router,
    private readonly gtag: GoogleAnalyticsService,
  ) {
    this.title.setTitle("Отзывы к IT компаниям");
  }

  ngOnInit(): void {
    this.loadData(1);
  }

  search(): void {
    if (this.searchQuery.length >= 3) {
      this.gtag.event(
        "company_search_query_submitted",
        "company_reviews",
        this.searchQuery,
      );
      this.loadData(1);
    }
  }

  clearSearch(): void {
    this.searchQuery = "";
    this.gtag.event(
      "company_search_query_reset_submitted",
      "company_reviews",
      this.searchQuery,
    );
    this.loadData(1);
  }

  loadData(pageToLoad: number): void {
    this.companies = null;
    this.source = null;
    this.currentPage = pageToLoad;

    this.service
      .all({
        searchQuery: this.searchQuery,
        page: pageToLoad,
        pageSize: 6,
      })
      .pipe(untilDestroyed(this))
      .subscribe((i) => {
        this.companies = i.results.map((c) => new CompanyListItem(c));
        this.source = i;
      });
  }

  navigateToCompany(id: string): void {
    this.router.navigate(["/companies", id]);
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
  }
}
