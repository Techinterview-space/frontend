import { Injectable } from '@angular/core';
import { Board, EmploymentStatusList } from '../models/board.model';
import { Subject, Observable } from 'rxjs';
import { EmploymentStatus } from '@models/organizations/employment-status.enum';
import { CandidateCard } from '@models/organizations/candidate-card.model';
import { StatusChangedEventArgs } from '@modules/candidate-cards-shared/candidate-card-partitial-view/status-changed-event-args';

@Injectable()
export class BoardService {
  private readonly data: Board = {
    lists: [
      new EmploymentStatusList(EmploymentStatus.HrInterview),
      new EmploymentStatusList(EmploymentStatus.TechnicalInterview),
      new EmploymentStatusList(EmploymentStatus.CustomerInterview),
      new EmploymentStatusList(EmploymentStatus.ResourceManagerInterview),
      new EmploymentStatusList(EmploymentStatus.DecisionPending, [
        EmploymentStatus.Approved,
        EmploymentStatus.PreOffered
      ]),
      new EmploymentStatusList(EmploymentStatus.Offered)
    ],
    organizationId: 'id:' + Date.now()
  };

  private modalState$ = new Subject();

  getBoard(): Board {
    return this.data;
  }

  loadCards(cards: CandidateCard[]): void {
    for (let card of cards) {
      this.addCard(card);
    }
  }

  addCard(card: CandidateCard): void {
    const list = this.findListByStatus(card.employmentStatus);
    list.addCard(card);
  }

  deleteCard(card: CandidateCard): void {
    let list = this.findListByStatus(card.employmentStatus);
    list?.removeCard(card!);
  }

  updateCard(newCard: CandidateCard): void {
    for (let [i, list] of this.data.lists.entries()) {
      for (let [j, card] of list.cards.entries()) {
        if (this.data.lists[i].cards[j].id == newCard.id) {
          this.data.lists[i].cards[j] = newCard;
        }
      }
    }
  }

  changeStatus(statusChangedEvent: StatusChangedEventArgs): void {
    let list = this.findListByStatus(statusChangedEvent.previousStatus);
    list?.removeCard(statusChangedEvent.card!);
    this.addCard(statusChangedEvent.card);
  }

  setModalState(bool: boolean, card: CandidateCard): void {
    const state = {
      open: bool,
      card: card
    };

    this.modalState$.next(state);
  }

  getModalState(): Observable<any> {
    return this.modalState$;
  }

  private findListByStatus(status: EmploymentStatus): EmploymentStatusList {
    let list = this.data.lists.find(
      (list) => list.id === status || list.possibleStatusToView.some((s) => s === status)
    );

    if (!list) {
      throw new Error(`List not found by status ${status}`);
    }

    return list;
  }

  clear(): void {
    this.data.lists.forEach((x) => x.clear());
  }
}
