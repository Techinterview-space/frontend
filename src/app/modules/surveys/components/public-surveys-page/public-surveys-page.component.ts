import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  MySurveyListItem,
  PublicSurveyStatus,
  PublicSurveyStatusEnum,
} from "@models/public-survey.model";
import { PaginatedList } from "@models/paginated-list";
import { PublicSurveysService } from "@services/public-surveys.service";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";

@Component({
  templateUrl: "./public-surveys-page.component.html",
  styleUrls: ["./public-surveys-page.component.scss"],
  standalone: false,
})
export class PublicSurveysPageComponent implements OnInit, OnDestroy {
  items: MySurveyListItem[] | null = null;
  source: PaginatedList<MySurveyListItem> | null = null;
  currentPage = 1;

  private skipNextQueryParamsUpdate = false;

  constructor(
    private readonly service: PublicSurveysService,
    private readonly title: TitleService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.title.setTitle("Публичные опросы");

    this.route.queryParams.pipe(untilDestroyed(this)).subscribe((params) => {
      if (this.skipNextQueryParamsUpdate) {
        this.skipNextQueryParamsUpdate = false;
        return;
      }

      this.currentPage = params["page"] ? Number(params["page"]) : 1;
      this.loadData(this.currentPage, false);
    });
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
  }

  loadData(page: number, updateUrl = true): void {
    this.items = null;
    this.source = null;
    this.currentPage = page;

    if (updateUrl) {
      this.skipNextQueryParamsUpdate = true;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page },
        queryParamsHandling: "merge",
      });
    }

    this.service
      .getAllPublic({ page, pageSize: 12 })
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        this.items = result.results;
        this.source = result;
      });
  }

  statusLabel(status: PublicSurveyStatus): string {
    return PublicSurveyStatusEnum.label(status);
  }

  statusBadgeClass(status: PublicSurveyStatus): string {
    switch (status) {
      case PublicSurveyStatus.Published:
        return "bg-success";
      case PublicSurveyStatus.Closed:
        return "bg-warning text-dark";
      default:
        return "bg-secondary";
    }
  }
}
