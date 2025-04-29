import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Company } from "@models/companies.model";
import { CompaniesService } from "@services/companies.service";
import { TitleService } from "@services/title.service";
import { ActivatedRouteExtended } from "@shared/routes/activated-route-extended";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";

@Component({
  templateUrl: "./company-admin-page.component.html",
  styleUrls: ["./company-admin-page.component.scss"],
  standalone: false,
})
export class CompanyAdminPageComponent implements OnInit, OnDestroy {
  company: Company | null = null;

  private readonly activateRoute: ActivatedRouteExtended;

  constructor(
    private readonly service: CompaniesService,
    private readonly title: TitleService,
    activatedRoute: ActivatedRoute,
  ) {
    this.activateRoute = new ActivatedRouteExtended(activatedRoute);
  }

  ngOnInit(): void {
    this.activateRoute
      .getParam("id")
      .pipe(untilDestroyed(this))
      .subscribe((id) => {
        this.service
          .byId(id!)
          .pipe(untilDestroyed(this))
          .subscribe((i) => {
            this.company = i;
            this.title.setTitle(`Компания ${this.company!.name}`);
          });
      });
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
  }
}
