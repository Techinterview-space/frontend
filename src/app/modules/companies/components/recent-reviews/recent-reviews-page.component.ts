import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { CompanyReview } from "@models/companies.model";
import { PaginatedList } from "@models/paginated-list";
import { CompaniesService } from "@services/companies.service";
import { TitleService } from "@services/title.service";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { AuthService } from "@shared/services/auth/auth.service";
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
  isAuthenticated = false;

  private skipNextQueryParamsUpdate: boolean = false;

  constructor(
    private readonly service: CompaniesService,
    private readonly title: TitleService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly gtag: GoogleAnalyticsService,
    private readonly alertService: AlertService,
    private readonly authService: AuthService,
  ) {
    this.title.setTitle("Отзывы к IT компаниям");
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
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
        this.reviews = i.results;
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

  likeClicked(review: CompanyReview): void {
    this.gtag.event(
      "company_review_review_liked",
      "company_reviews",
      review.companyName ?? review.companyId,
    );

    this.service
      .likeReview(review.companyId, review.id)
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.alertService.success("Голос сохранен");
      });
  }

  dislikeClicked(review: CompanyReview): void {
    this.gtag.event(
      "company_review_review_disliked",
      "company_reviews",
      review.companyName ?? review.companyId,
    );

    this.service
      .dislikeReview(review.companyId, review.id)
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.alertService.success("Голос сохранен");
      });
  }

  clickWhileDisabledForAnonymous(): void {
    this.alertService.warn("Необходимо авторизоваться, чтобы оценивать отзывы");
  }
}
