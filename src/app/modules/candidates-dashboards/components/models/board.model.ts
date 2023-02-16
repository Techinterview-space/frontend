import { CandidateCard } from '@models/organizations/candidate-card.model';
import { EmploymentStatus, EmploymentStatusEnum } from '@models/organizations/employment-status.enum';

export interface Board {
  lists: Array<EmploymentStatusList>;
  organizationId: string;
}

export class EmploymentStatusList {
  readonly id: EmploymentStatus;
  readonly name: string;
  readonly possibleStatusToView: EmploymentStatus[];

  cards: CandidateCard[];

  constructor(status: EmploymentStatus, possibleStatusToView: EmploymentStatus[] = []) {
    this.id = status;
    this.name = EmploymentStatusEnum.label(status);
    this.cards = [];
    this.possibleStatusToView = possibleStatusToView;
  }

  addCard(card: CandidateCard): void {
    this.cards.unshift(card);
  }

  removeCard(card: CandidateCard): void {
    const index = this.cards.indexOf(card);
    this.cards.splice(index, 1);
  }

  clear(): void {
    this.cards = [];
  }
}
