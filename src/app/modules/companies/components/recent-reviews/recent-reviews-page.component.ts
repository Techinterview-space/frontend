import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { CompanyReview } from "@models/companies.model";
import { PaginatedList } from "@models/paginated-list";
import { CompaniesService } from "@services/companies.service";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { GoogleAnalyticsService } from "ngx-google-analytics";

@Component({
  templateUrl: "./recent-reviews-page.component.html",
  styleUrls: ["./recent-reviews-page.component.scss"],
  standalone: false,
})
export class RecentReviewsPageComponent implements OnInit, OnDestroy {
  reviews: Array<CompanyReview> | null = null;
  source: PaginatedList<CompanyReview> | null = null;
  currentPage: number = 1;

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

      this.loadData(this.currentPage, false);
    });
  }

  loadData(pageToLoad: number, updateUrl: boolean = true): void {
    this.reviews = null;
    this.source = null;
    this.currentPage = pageToLoad;

    if (updateUrl) {
      this.skipNextQueryParamsUpdate = true;
      this.updateUrlParams(pageToLoad);
    }

    this.service
      .recentReviews({
        page: pageToLoad,
        pageSize: 6,
      })
      .pipe(untilDestroyed(this))
      .subscribe((i) => {
        this.reviews = i.results.map((r) => {
          r.cons = r.cons?.replace(/\n/g, "<br />");
          r.pros = r.pros?.replace(/\n/g, "<br />");
          return r;
        });
        this.source = i;
      });
  }

  private updateUrlParams(page: number): void {
    const queryParams: any = { page };

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

    this.router.navigate(["/companies", id], { state });
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
  }
}
