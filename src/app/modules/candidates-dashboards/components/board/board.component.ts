import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BoardService } from '../models/board.service';
import { Board, EmploymentStatusList } from '../models/board.model';
import { CandidateCard } from '@models/organizations/candidate-card.model';
import { EmploymentStatus, EmploymentStatusEnum } from '@models/organizations/employment-status.enum';
import { CandidateCardsService } from '@services/candidate-cards.service';
import { ActivatedRouteExtended } from '@shared/routes/activated-route-extended';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';
import { StatusChangedEventArgs } from '@modules/candidate-cards-shared/candidate-card-partitial-view/status-changed-event-args';
import { CandidateCardsFilterRequest, ActiveOrArchived } from '@services/requests/candidate-cards-filters';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  @Input()
  board: Board | null = null;

  selectedCandidateCard: CandidateCard | null = null;
  selectedListId: EmploymentStatus | null = null;
  organizationId: string | null = null;

  private readonly activadeRoute: ActivatedRouteExtended;

  private static readonly initialRequest: CandidateCardsFilterRequest = {
    statuses: EmploymentStatusEnum.activeEmploymentStatues,
    includeEntities: true,
    activeOrArchived: ActiveOrArchived.Active
  };

  constructor(
    private readonly boardService: BoardService,
    private readonly cardService: CandidateCardsService,
    activatedRoute: ActivatedRoute,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
    this.activadeRoute = new ActivatedRouteExtended(activatedRoute);
  }

  ngOnInit() {
    this.board = this.boardService.getBoard();
    this.selectedListId = null;
    this.activadeRoute
      .getParam('id')
      .pipe(untilDestroyed(this))
      .subscribe((organizationId) => {
        this.organizationId = organizationId;
        this.cardService
          .forOrganization(organizationId!, BoardComponent.initialRequest)
          .pipe(untilDestroyed(this))
          .subscribe((cards) => {
            this.boardService.loadCards(cards);
            this.boardService.getModalState().subscribe((state: any) => {
              this.selectedCandidateCard = state.card;
            });
          });
      });
  }

  ngOnDestroy(): void {
    this.boardService.clear();
  }

  addCardAction(listId: EmploymentStatus): void {
    this.selectedListId = listId;
  }

  closeAddCardAction(): void {
    this.selectedListId = null;
  }

  candidateCardCreated(candidateCard: CandidateCard): void {
    this.boardService.addCard(candidateCard);
    this.closeAddCardAction();
  }

  drop(event: CdkDragDrop<CandidateCard[]>, targetList: EmploymentStatusList) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      const data = event.container.data;
      const changedCards = data.filter((card) => card.employmentStatus !== targetList.id);

      if (changedCards.length > 0) {
        changedCards.forEach((card) => {
          card.employmentStatus = targetList.id;
          this.boardService.updateCard(card);

          this.cardService
            .updateStatus(card, {
              employmentStatus: targetList.id,
              organizationId: card.organizationId
            })
            .pipe(untilDestroyed(this))
            .subscribe((employmentStatus) => {
              card.employmentStatus = employmentStatus;
              this.boardService.updateCard(card);
            });
        });
      }
    }
  }

  openModal(card: CandidateCard) {
    this.selectedCandidateCard = card;
  }

  closeModal() {
    this.selectedCandidateCard = null;
    console.log('closeModal', this.board?.lists);
  }

  archive(card: CandidateCard): void {
    this.boardService.deleteCard(card);
    this.selectedCandidateCard = null;
  }

  restore(card: CandidateCard): void {
    this.boardService.deleteCard(card);
    this.selectedCandidateCard = null;
  }

  statusChanged(event: StatusChangedEventArgs): void {
    this.boardService.changeStatus(event);
  }

  onCardUpdated(updatedCard: CandidateCard): void {
    this.boardService.updateCard(updatedCard);
  }
}
