import { Component, OnDestroy, OnInit } from "@angular/core";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { defaultPageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import {
  SurveysAdminService,
  SurveyReplyAdminDto,
} from "../../services/surveys-admin.service";

@Component({
  templateUrl: "./survey-replies-admin-page.component.html",
  styleUrls: ["./survey-replies-admin-page.component.scss"],
  standalone: false,
})
export class SurveyRepliesAdminPageComponent implements OnInit, OnDestroy {
  replies: Array<SurveyReplyAdminDto> | null = null;
  source: PaginatedList<SurveyReplyAdminDto> | null = null;
  currentPage: number = 1;

  constructor(
    private readonly titleService: TitleService,
    private readonly surveysAdminService: SurveysAdminService,
  ) {
    this.titleService.setTitle("Опросы");
  }

  ngOnInit(): void {
    this.loadData(this.currentPage);
  }

  loadData(pageToRequest: number): void {
    this.replies = null;
    this.source = null;
    this.currentPage = pageToRequest;

    this.surveysAdminService
      .getAll({
        page: this.currentPage,
        pageSize: defaultPageParams.pageSize,
      })
      .pipe(untilDestroyed(this))
      .subscribe((response) => {
        this.replies = response.results;
        this.source = response;
      });
  }

  ngOnDestroy(): void {
    this.titleService.resetTitle();
  }
}
