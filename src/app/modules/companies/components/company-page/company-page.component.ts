import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Company } from "@models/companies.model";
import { CompaniesService } from "@services/companies.service";
import { TitleService } from "@services/title.service";
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

  private readonly activateRoute: ActivatedRouteExtended;
  private isAuthenticated = false;

  constructor(
    private readonly service: CompaniesService,
    private readonly title: TitleService,
    private readonly router: Router,
    activatedRoute: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
    private readonly gtag: GoogleAnalyticsService,
  ) {
    this.activateRoute = new ActivatedRouteExtended(activatedRoute);
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
            this.company = i;
            this.title.setTitle(`Отзывы о ${this.company!.name}`);

            this.gtag.event(
              "company_review_company_page_viewed",
              "company_reviews",
              this.company!.name,
            );
          });
      });
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
}
