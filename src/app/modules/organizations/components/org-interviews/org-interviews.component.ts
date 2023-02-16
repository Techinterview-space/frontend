import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Interview } from '@models/interview-models';
import { PaginatedList } from '@models/paginated-list';
import { OrganizationsService } from '@services/organizations.service';
import { TitleService } from '@services/title.service';
import { ActivatedRouteExtended } from '@shared/routes/activated-route-extended';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';

@Component({
  templateUrl: './org-interviews.component.html',
  styleUrls: ['./org-interviews.component.scss']
})
export class OrgInterviewsComponent implements OnInit, OnDestroy {
  interviews: PaginatedList<Interview> | null = null;
  organizationId: string | null = null;

  private readonly activatedRoute: ActivatedRouteExtended;

  constructor(private readonly service: OrganizationsService, title: TitleService, activatedRoute: ActivatedRoute) {
    this.activatedRoute = new ActivatedRouteExtended(activatedRoute);
    title.setTitle('Org interviews');
  }

  ngOnInit(): void {
    this.activatedRoute
      .getParam('id')
      .pipe(untilDestroyed(this))
      .subscribe((id) => {
        this.organizationId = id;
        this.load();
      });
  }

  load(page = 1): void {
    this.service
      .interviews(this.organizationId!, {
        page,
        pageSize: 20
      })
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.interviews = x;
      });
  }

  ngOnDestroy(): void {
    // ignored
  }
}
