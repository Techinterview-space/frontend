import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Company } from "@models/companies.model";
import { defaultPageParams, PageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import { CompaniesService } from "@services/companies.service";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";

@Component({
  templateUrl: "./companies-admin-page.component.html",
  styleUrls: ["./companies-admin-page.component.scss"],
  standalone: false,
})
export class CompaniesAdminPageComponent implements OnInit, OnDestroy {
  companies: Array<Company> | null = null;
  source: PaginatedList<Company> | null = null;
  currentPage: number = 1;

  constructor(
    private readonly service: CompaniesService,
    private readonly title: TitleService,
    private readonly router: Router,
  ) {
    this.title.setTitle("Компании в системе");
  }

  ngOnInit(): void {
    this.loadData(1);
  }

  loadData(pageToLoad: number): void {
    this.companies = null;
    this.source = null;
    this.currentPage = pageToLoad;

    this.service
      .all(defaultPageParams)
      .pipe(untilDestroyed(this))
      .subscribe((i) => {
        this.companies = i.results;
        this.source = i;
      });
  }

  navigateToCompany(id: string): void {
    this.router.navigate(["/companies", id]);
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
  }

  createCompany(): void {}
}
