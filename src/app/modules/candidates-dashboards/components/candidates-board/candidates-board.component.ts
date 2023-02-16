import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Organization } from '@models/organizations/organization.model';
import { OrganizationsService } from '@services/organizations.service';
import { ActivatedRouteExtended } from '@shared/routes/activated-route-extended';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';
import { Board } from '../models/board.model';
import { BoardService } from '../models/board.service';

@Component({
  templateUrl: './candidates-board.component.html',
  styleUrls: ['./candidates-board.component.scss']
})
export class CandidatesBoardComponent implements OnInit, OnDestroy {
  board: Board | null = null;

  organizationName = '';
  organizationId: string | null = null;
  organization: Organization | null = null;

  private readonly activatedRoute: ActivatedRouteExtended;
  constructor(
    private readonly boardService: BoardService,
    private readonly organizationService: OrganizationsService,
    activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute = new ActivatedRouteExtended(activatedRoute);
  }

  ngOnInit(): void {
    this.board = this.boardService.getBoard();
    this.activatedRoute
      .getParam('id')
      .pipe(untilDestroyed(this))
      .subscribe(x => {
        this.organizationId = x;
        this.organizationService
          .byIdSimple(x!)
          .subscribe(organization => {
            this.organization = organization;
            this.organizationName = organization.name;
          });
      });
  }

  ngOnDestroy(): void {
    // ignore
  }
}
