import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { ViewportScroller } from "@angular/common";
import { Company, CompanyReview } from "@models/companies.model";
import { CompaniesService } from "@services/companies.service";
import { TitleService } from "@services/title.service";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { ActivatedRouteExtended } from "@shared/routes/activated-route-extended";
import { AuthService } from "@shared/services/auth/auth.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { CookieService } from "ngx-cookie-service";
import { GoogleAnalyticsService } from "ngx-google-analytics";

@Component({
  templateUrl: "./company-page.component.html",
  styleUrls: ["./company-page.component.scss"],
  standalone: false,
})
export class CompanyPageComponent implements OnInit, OnDestroy {
  company: Company | null = null;
  isAuthenticated = false;

  private readonly activateRoute: ActivatedRouteExtended;
  // Keep reference to ActivatedRoute for fragment subscription (not available in ActivatedRouteExtended)
  private readonly activatedRoute: ActivatedRoute;
  private previousPage: number | null = null;
  private previousSearchQuery: string | null = null;
  private previousWithRating: boolean | null = null;

  constructor(
    private readonly service: CompaniesService,
    private readonly title: TitleService,
    private readonly router: Router,
    activatedRoute: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
    private readonly gtag: GoogleAnalyticsService,
    private readonly alertService: AlertService,
    private readonly viewportScroller: ViewportScroller,
  ) {
    this.activateRoute = new ActivatedRouteExtended(activatedRoute);
    this.activatedRoute = activatedRoute;
    const queryParams = this.router.getCurrentNavigation()?.extras.state;
    if (queryParams) {
      this.previousPage = queryParams["page"] || null;
      this.previousSearchQuery = queryParams["search"] || null;
      this.previousWithRating = queryParams["withRating"] === "true";
    }
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.activateRoute
      .getParam("id")
      .pipe(untilDestroyed(this))
      .subscribe((id) => {
        this.service
          .byId(id!)
          .pipe(untilDestroyed(this))
          .subscribe((i) => {
            this.company = i.company;
            this.company!.description = this.company!.description?.replace(
              /\n/g,
              "<br />",
            );

            this.title.setTitle(`Отзывы о ${this.company!.name}`);

            this.gtag.event(
              "company_review_company_page_viewed",
              "company_reviews",
              this.company!.name,
            );

            // Handle fragment scrolling after data is loaded
            this.scrollToFragmentIfExists();
          });
      });
  }

  private scrollToFragmentIfExists(): void {
    this.activatedRoute.fragment
      .pipe(untilDestroyed(this))
      .subscribe((fragment: string | null) => {
        if (fragment) {
          // Delay to ensure DOM is fully rendered after async data load
          setTimeout(() => {
            this.viewportScroller.scrollToAnchor(fragment);
          }, 100);
        }
      });
  }

  goBackToList(): void {
    if (this.previousPage) {
      const queryParams: any = { page: this.previousPage };

      if (this.previousSearchQuery) {
        queryParams.search = this.previousSearchQuery;
      }

      if (this.previousWithRating) {
        queryParams.withRating = this.previousWithRating;
      }

      this.router.navigate(["/companies"], { queryParams });
    } else {
      this.router.navigate(["/companies"]);
    }
  }

  leaveReview(): void {
    if (this.company == null) {
      return;
    }

    const url = `/companies/${this.company.id}/add-review`;
    if (this.isAuthenticated) {
      this.gtag.event("company_review_add_review_clicked", "company_reviews");
      this.router.navigateByUrl(url);
      return;
    }

    this.cookieService.set("url", url);
    this.authService.login().pipe(untilDestroyed(this)).subscribe();
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
  }

  likeClicked(review: CompanyReview): void {
    if (this.company == null) {
      return;
    }

    this.gtag.event(
      "company_review_review_liked",
      "company_reviews",
      this.company.name,
    );

    this.service
      .likeReview(this.company.id, review.id)
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.alertService.success("Голос сохранен");
      });
  }

  dislikeClicked(review: CompanyReview): void {
    if (this.company == null) {
      return;
    }

    this.gtag.event(
      "company_review_review_disliked",
      "company_reviews",
      this.company.name,
    );

    this.service
      .dislikeReview(this.company.id, review.id)
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.alertService.success("Голос сохранен");
      });
  }

  clickWhileDisabledForAnonymous(): void {
    this.alertService.warn("Необходимо авторизоваться, чтобы оценивать отзывы");
  }

  copyReviewLink(review: CompanyReview): void {

    const url = `${window.location.origin}/companies/${review.companyId}#review-${review.id}`;

    // Check if clipboard API is available
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          this.alertService.success("Ссылка скопирована в буфер обмена");
          this.gtag.event(
            "company_review_link_copied",
            "company_reviews",
            this.company?.name ?? review.companyId,
          );
        })
        .catch(() => {
          this.alertService.error("Не удалось скопировать ссылку");
        });
    } else {
      // Fallback for browsers without clipboard API support
      this.alertService.warn(
        "Автоматическое копирование не поддерживается. Используйте кнопку 'Поделиться' браузера",
      );
    }
  }
}
