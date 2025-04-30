import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Company } from "@models/companies.model";
import { defaultPageParams, PageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import { CompaniesService } from "@services/companies.service";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { CompanyListItem } from "./company-list-item";

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
  ) {
    this.title.setTitle("Компании");
  }

  ngOnInit(): void {
    this.loadData(1);
  }

  search(): void {
    console.log(this.searchQuery);
    if (this.searchQuery.length >= 3) {
      this.loadData(1);
    }
  }

  clearSearch(): void {
    this.searchQuery = "";
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
        pageSize: defaultPageParams.pageSize,
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

  navigateToAddReview(id: string): void {
    this.router.navigate(["/companies", id, "add-review"]);
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
  }
}
