import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Candidate } from '@models/organizations/candidate.model';
import { PaginatedList } from '@models/paginated-list';
import { OrganizationsService } from '@services/organizations.service';
import { TitleService } from '@services/title.service';
import { ActivatedRouteExtended } from '@shared/routes/activated-route-extended';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit, OnDestroy {
  candidates: PaginatedList<Candidate> | null = null;
  organizationId: string | null = null;

  private readonly activatedRoute: ActivatedRouteExtended;

  constructor(private readonly service: OrganizationsService, title: TitleService, activatedRoute: ActivatedRoute) {
    this.activatedRoute = new ActivatedRouteExtended(activatedRoute);
    title.setTitle('Org candidate cards');
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
    this.candidates = null;
    const request = {
      page,
      pageSize: 20
    };

    this.service
      .cadnidates(this.organizationId!, request)
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.candidates = x;
      });
  }

  ngOnDestroy(): void {
    // ignored
  }
}
