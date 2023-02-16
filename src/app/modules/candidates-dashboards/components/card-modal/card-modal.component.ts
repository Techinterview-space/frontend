import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CandidateCard } from '@models/organizations/candidate-card.model';
import { EmploymentStatusEnum } from '@models/organizations/employment-status.enum';
import { BoardService } from '../models/board.service';
import { StatusChangedEventArgs } from '@modules/candidate-cards-shared/candidate-card-partitial-view/status-changed-event-args';
import { CandidateCardsService } from '@services/candidate-cards.service';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit, OnDestroy {
  @Input()
  selectedCard: CandidateCard | null = null;

  cardFromBackend: CandidateCard | null = null;

  @Output()
  cardUpdated: EventEmitter<CandidateCard> = new EventEmitter<CandidateCard>();

  @Output()
  closed: EventEmitter<void> = new EventEmitter();

  @Output()
  cardArchived: EventEmitter<CandidateCard> = new EventEmitter<CandidateCard>();

  @Output()
  cardRestored: EventEmitter<CandidateCard> = new EventEmitter<CandidateCard>();

  @Output()
  statusChanged: EventEmitter<StatusChangedEventArgs> = new EventEmitter<StatusChangedEventArgs>();

  get title(): string {
    if (this.selectedCard == null) {
      return 'Candidate';
    }

    return this.selectedCard.candidate?.firstName + ' ' + this.selectedCard.candidate?.lastName;
  }

  get cardStatus(): string {
    if (this.selectedCard == null) {
      return '';
    }

    return EmploymentStatusEnum.label(this.selectedCard.employmentStatus);
  }

  constructor(private readonly boardService: BoardService, private readonly cardService: CandidateCardsService) {}

  onCardUpdated(updatedCard: CandidateCard): void {
    this.cardUpdated.emit(updatedCard);
  }

  onCardArchived(card: CandidateCard): void {
    this.cardArchived.emit(card);
  }

  onCardRestored(card: CandidateCard): void {
    this.cardRestored.emit(card);
  }

  onStatusChanged(event: StatusChangedEventArgs): void {
    this.statusChanged.emit(event);
  }

  onCommentAdded(card: CandidateCard): void {
    this.selectedCard!.comments = card.comments;
  }

  onCommentDeleted(card: CandidateCard): void {
    this.selectedCard!.comments = card.comments;
  }

  ngOnInit() {
    if (!this.selectedCard) {
      return;
    }

    this.cardService
      .byId(this.selectedCard.id)
      .pipe(untilDestroyed(this))
      .subscribe((card) => {
        this.selectedCard!.comments = card.comments;
        this.selectedCard!.candidate = card.candidate;
        this.selectedCard!.interviews = card.interviews;
        this.selectedCard!.labels = card.labels;
      });
  }

  ngOnDestroy(): void {
    // ignore
  }

  close(): void {
    this.closed.next();
  }
}
