import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidateCard } from '@models/organizations/candidate-card.model';
import { EmploymentStatusEnum } from '@models/organizations/employment-status.enum';
import { PaginatedList } from '@models/paginated-list';
import { OrganizationsService } from '@services/organizations.service';
import { ActiveOrArchived, ActiveOrArchivedEnum } from '@services/requests/candidate-cards-filters';
import { TitleService } from '@services/title.service';
import { ActivatedRouteExtended } from '@shared/routes/activated-route-extended';
import { SelectItem } from '@shared/select-boxes/select-item';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';

@Component({
  templateUrl: './candidate-cards.component.html',
  styleUrls: ['./candidate-cards.component.scss']
})
export class CandidateCardsComponent implements OnInit, OnDestroy {
  readonly allStatuses = EmploymentStatusEnum.options();
  statusesFilter = EmploymentStatusEnum.options().filter((x) =>
    EmploymentStatusEnum.inactiveEmploymentStatues.some((is) => is === x.item)
  );

  readonly activeOrArchivedOptions = ActiveOrArchivedEnum.options();
  selectedArhivedOrActive: SelectItem<ActiveOrArchived> | null =
    this.activeOrArchivedOptions.find((x) => x.item === ActiveOrArchived.Active) ?? null;

  cards: PaginatedList<CandidateCard> | null = null;
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
    this.cards = null;
    const statuses = this.statusesFilter.map((x) => x.item);
    const request = {
      page,
      pageSize: 20,
      includeEntities: false,
      statuses: statuses,
      activeOrArchived: this.selectedArhivedOrActive?.item ?? ActiveOrArchived.Active
    };

    this.service
      .cadnidateCards(this.organizationId!, request)
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.cards = x;
      });
  }

  allStatusesSelect(): void {
    this.statusesFilter = EmploymentStatusEnum.options();
  }

  ngOnDestroy(): void {
    // ignored
  }
}
