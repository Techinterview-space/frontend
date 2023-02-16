import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidateCard } from '@models/organizations/candidate-card.model';
import { AddCommentRequest, CandidateCardsService } from '@services/candidate-cards.service';
import { TitleService } from '@services/title.service';
import { StatusChangedEventArgs } from '@modules/candidate-cards-shared/candidate-card-partitial-view/status-changed-event-args';
import { ActivatedRouteExtended } from '@shared/routes/activated-route-extended';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';
import { CandidateCardComment } from '@models/organizations/candidate-card-comment';

@Component({
  templateUrl: './candidate-card-view.component.html',
  styleUrls: ['./candidate-card-view.component.scss']
})
export class CandidateCardViewComponent implements OnInit, OnDestroy {
  title = '';
  candidateCard: CandidateCard | null = null;
  cardId: string | null = null;
  private readonly activatedRoute: ActivatedRouteExtended;

  constructor(
    private readonly service: CandidateCardsService,
    private readonly titleService: TitleService,
    activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute = new ActivatedRouteExtended(activatedRoute);
  }

  ngOnInit(): void {
    this.activatedRoute
      .getParam('id')
      .pipe(untilDestroyed(this))
      .subscribe((id) => {
        this.cardId = id;
        this.load();
      });
  }

  onCardUpdated(updatedCard: CandidateCard): void {
    this.load();
  }

  onCardArchived(card: CandidateCard): void {
    this.load();
  }

  onCardRestored(card: CandidateCard): void {
    this.load();
  }

  onStatusChanged(statusEvent: StatusChangedEventArgs): void {
    this.load();
  }

  load(): void {
    this.candidateCard = null;
    this.service
      .byId(this.cardId!)
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.candidateCard = x;
        this.title = this.candidateCard.candidate!.firstName + ' ' + this.candidateCard.candidate!.lastName;
        this.titleService.setTitle(this.title);
      });
  }

  onCommentAdded(data: CandidateCard): void {
    this.load();
  }

  onCommentDeleted(comment: CandidateCard): void {
    this.load();
  }

  ngOnDestroy(): void {
    // ignored
  }
}
