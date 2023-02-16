import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CandidateCard } from '@models/organizations/candidate-card.model';
import { Candidate } from '@models/organizations/candidate.model';
import { EmploymentStatus } from '@models/organizations/employment-status.enum';
import { Label } from '@models/user-label.model';
import { CandidateCardsService } from '@services/candidate-cards.service';
import { OrganizationLabelsService } from '@services/organization-labels.service';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';
import { AddNewCardForm } from '../board/add-new-card-form';

@Component({
  selector: 'app-add-candidate-card-dialog',
  templateUrl: './add-candidate-card-dialog.component.html',
  styleUrls: ['./add-candidate-card-dialog.component.scss']
})
export class AddCandidateCardDialogComponent implements OnInit, OnDestroy {
  @Input()
  selectedListId: EmploymentStatus | null = null;

  @Input()
  organizationId: string | null = null;

  @Output()
  candidateCardCreated: EventEmitter<CandidateCard> = new EventEmitter<CandidateCard>();

  @Output()
  closed: EventEmitter<void> = new EventEmitter();

  candidates: Candidate[] = [];
  addNewCandidateCard: AddNewCardForm | null = null;

  labels: Array<Label> = [];
  selectedLabels: Array<Label> = [];

  constructor(
    private readonly service: CandidateCardsService,
    private readonly orgLabelsService: OrganizationLabelsService) {}

  ngOnInit(): void {
    if (this.selectedListId == null) {
      return;
    }

    this.orgLabelsService
      .forOrganization(this.organizationId!)
      .pipe(untilDestroyed(this))
      .subscribe(x => {
        this.labels = x;
      });

    // TODO Maxim: load candidate list from backend
    this.addNewCandidateCard = new AddNewCardForm(this.organizationId, null, this.selectedListId);
  }

  ngOnDestroy(): void {
    // ignore
  }

  close(): void {
    this.closed.emit();
  }

  addCardSubmitAction(): void {
    const candidateCard = this.addNewCandidateCard?.candidateCardOrNull();
    if (candidateCard == null) {
      return;
    }

    candidateCard.labels = this.selectedLabels;
    this.service
      .create(candidateCard)
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.candidateCardCreated.emit(x);
      });
  }
}
