import { Component, OnDestroy, OnInit } from "@angular/core";
import { InterviewTemplate } from "@models/interview-models";
import { defaultPageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import { InterviewTemplatesService } from "@services/interview-templates.service";
import { MetaTagService } from "@services/meta-tags.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";

@Component({
  templateUrl: "./public-interview-templates.component.html",
  styleUrls: ["./public-interview-templates.component.scss"],
  standalone: false,
})
export class PublicInterviewTemplatesComponent implements OnInit, OnDestroy {
  templates: PaginatedList<InterviewTemplate> | null = null;

  constructor(
    private readonly service: InterviewTemplatesService,
    private readonly metaTagService: MetaTagService,
  ) {}

  ngOnInit(): void {
    this.metaTagService.setPageMetaTags(
      "Публичные шаблоны интервью",
      "Готовые шаблоны для проведения технических интервью. Используйте проверенные вопросы и структуры для собеседований на Techinterview.space",
      "/interviews/templates/public",
    );
    this.loadTemplates();
  }

  loadTemplates(page = 1): void {
    this.service
      .public({ ...defaultPageParams, page })
      .pipe(untilDestroyed(this))
      .subscribe((templates) => (this.templates = templates));
  }

  ngOnDestroy(): void {
    this.metaTagService.returnDefaultMetaTags();
  }
}
