import { Component, OnDestroy, OnInit } from '@angular/core';
import { InterviewTemplate } from '@models/interview-models';
import { defaultPageParams } from '@models/page-params';
import { PaginatedList } from '@models/paginated-list';
import { InterviewTemplatesService } from '@services/interview-templates.service';
import { TitleService } from '@services/title.service';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';

@Component({
  templateUrl: './interview-templates-admin-page.component.html'
})
export class InterviewTemplatesAdminPageComponent implements OnInit, OnDestroy {
  templates: PaginatedList<InterviewTemplate> | null = null;
  constructor(private readonly service: InterviewTemplatesService, private readonly title: TitleService) {}

  ngOnInit(): void {
    this.title.setTitle('All interview templates');
    this.loadTemplates();
  }

  loadTemplates(page = 1): void {
    this.service
      .all({ ...defaultPageParams, page })
      .pipe(untilDestroyed(this))
      .subscribe((templates) => (this.templates = templates));
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
  }
}
