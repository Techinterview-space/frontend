import { Component, OnDestroy, OnInit } from '@angular/core';
import { InterviewTemplate } from '@models/interview-models';
import { defaultPageParams } from '@models/page-params';
import { PaginatedList } from '@models/paginated-list';
import { InterviewTemplatesService } from '@services/interview-templates.service';
import { TitleService } from '@services/title.service';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';

@Component({
  templateUrl: './public-interview-templates.component.html',
  styleUrls: ['./public-interview-templates.component.scss']
})
export class PublicInterviewTemplatesComponent implements OnInit, OnDestroy {
  templates: PaginatedList<InterviewTemplate> | null = null;

  constructor(private readonly service: InterviewTemplatesService, private readonly title: TitleService) {}

  ngOnInit(): void {
    this.title.setTitle('Public interview templates');
    this.loadTemplates();
  }

  loadTemplates(page = 1): void {
    this.service
      .public({ ...defaultPageParams, page })
      .pipe(untilDestroyed(this))
      .subscribe((templates) => (this.templates = templates));
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
  }
}
