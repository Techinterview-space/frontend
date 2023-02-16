import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CandidateCardComment } from '@models/organizations/candidate-card-comment';
import { CandidateCard } from '@models/organizations/candidate-card.model';
import { EmploymentStatus, EmploymentStatusEnum } from '@models/organizations/employment-status.enum';
import { StatusChangedEventArgs } from '@modules/candidate-cards-shared/candidate-card-partitial-view/status-changed-event-args';
import { AddCommentRequest, CandidateCardsService } from '@services/candidate-cards.service';
import { CandidateCardCommentFormGroup } from './candidate-card-form-group';
import { CandidateEditForm } from './candidate-edit-form';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';
import { Label } from '@models/user-label.model';
import { RandomHexColor } from '@shared/value-objects/random-hex-color';
import { OrganizationLabelsService } from '@services/organization-labels.service';
import { timeStamp } from 'console';
import { AbsoluteLink, ClipboardCopier } from '@shared/value-objects/clipboard-copier';
import { AuthService } from '@shared/services/auth/auth.service';
import { ApplicationUserExtended } from '@models/extended';

interface StatusDropdownButton {
  label: string;
  css: string;
  status: EmploymentStatus;
}

interface StatusButton {
  label: string;
  css: string;
  buttons: StatusDropdownButton[];
}

@Component({
  selector: 'app-candidate-card-partitial-view',
  templateUrl: './candidate-card-partitial-view.component.html',
  styleUrls: ['./candidate-card-partitial-view.component.scss']
})
export class CandidateCardPartitialViewComponent implements OnInit, OnDestroy {
  @Input()
  candidateCard: CandidateCard | null = null;

  @Output()
  cardUpdated: EventEmitter<CandidateCard> = new EventEmitter<CandidateCard>();

  @Output()
  cardArchived: EventEmitter<CandidateCard> = new EventEmitter<CandidateCard>();

  @Output()
  cardRestored: EventEmitter<CandidateCard> = new EventEmitter<CandidateCard>();

  @Output()
  statusChanged: EventEmitter<StatusChangedEventArgs> = new EventEmitter<StatusChangedEventArgs>();

  @Output()
  commentAdded: EventEmitter<CandidateCard> = new EventEmitter<CandidateCard>();

  @Output()
  commentDeleted: EventEmitter<CandidateCard> = new EventEmitter<CandidateCard>();

  statusDropdownButton: StatusButton | null = null;
  selectedLabels: Array<Label> = [];
  labels: Array<Label> = [];

  get formCreated(): boolean {
    return this.cardForm != null;
  }

  get title(): string {
    if (this.candidateCard == null) {
      return 'Candidate';
    }

    return this.candidateCard.candidate?.firstName + ' ' + this.candidateCard.candidate?.lastName;
  }

  get cardStatus(): string {
    if (this.candidateCard == null) {
      return '';
    }

    return EmploymentStatusEnum.label(this.candidateCard.employmentStatus);
  }

  cardForm: CandidateEditForm | null = null;
  openForm = false;
  commentForm: CandidateCardCommentFormGroup | null = null;
  currentUser: ApplicationUserExtended | null = null;

  constructor(
    private readonly auth: AuthService,
    private readonly service: CandidateCardsService,
    private readonly orgLabelsService: OrganizationLabelsService
  ) {}

  ngOnInit() {
    if (!this.candidateCard) {
      return;
    }

    this.auth
      .getCurrentUser()
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.currentUser = x;
      });

    this.statusDropdownButton = CandidateCardPartitialViewComponent.createStatusDropdownButton(
      this.candidateCard.employmentStatus
    );

    this.commentForm = new CandidateCardCommentFormGroup(this.candidateCard!);
  }

  ngOnDestroy(): void {
    // ignore
  }

  updateCardAction() {
    const request = this.cardForm?.requestOrNull();
    if (request == null || this.candidateCard == null) {
      return;
    }

    this.candidateCard.candidate!.firstName = request.candidateFirstName;
    this.candidateCard.candidate!.lastName = request.candidateLastName;
    this.candidateCard.candidate!.contacts = request.candidateContacts;

    this.closeFormAction();
    this.service
      .update(this.candidateCard, {
        employmentStatus: this.candidateCard.employmentStatus,
        organizationId: this.candidateCard.organizationId,
        candidateId: this.candidateCard.candidate!.id,
        candidateFirstName: this.candidateCard.candidate!.firstName,
        candidateLastName: this.candidateCard.candidate!.lastName,
        candidateContacts: this.candidateCard.candidate!.contacts,
        labels: this.selectedLabels
      })
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.cardUpdated.emit(this.candidateCard!);
      });
  }

  updateStatus(status: EmploymentStatus): void {
    const previousStatus = this.candidateCard!.employmentStatus;
    this.candidateCard!.employmentStatus = status;

    this.service
      .updateStatus(this.candidateCard!, {
        employmentStatus: this.candidateCard!.employmentStatus,
        organizationId: this.candidateCard!.organizationId
      })
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.candidateCard!.employmentStatus = x;
        this.statusDropdownButton = CandidateCardPartitialViewComponent.createStatusDropdownButton(
          this.candidateCard!.employmentStatus
        );

        this.statusChanged.emit({
          card: this.candidateCard!,
          previousStatus
        });
      });
  }

  openFormAction() {
    if (this.candidateCard) {
      this.openForm = true;
      this.cardForm = new CandidateEditForm(this.candidateCard);
      this.orgLabelsService
        .forOrganization(this.candidateCard.organizationId)
        .pipe(untilDestroyed(this))
        .subscribe((x) => {
          this.labels = x;
          this.selectedLabels = this.candidateCard!.labels;
        });
    }
  }

  closeFormAction() {
    this.openForm = false;
    this.cardForm = null;
    this.candidateCard!.labels = this.selectedLabels;
  }

  archive(): void {
    if (confirm('Archive candidate card?')) {
      this.service
        .archive(this.candidateCard!.id)
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.cardArchived.emit(this.candidateCard!);
        });
    }
  }

  restore(): void {
    if (confirm('Resore this candidate card?')) {
      this.service
        .restore(this.candidateCard!.id)
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.cardRestored.emit(this.candidateCard!);
        });
    }
  }

  private static createStatusDropdownButton(currentStatus: EmploymentStatus): StatusButton {
    const button: StatusButton = {
      label: EmploymentStatusEnum.label(currentStatus),
      css: EmploymentStatusEnum.cssClass(currentStatus),
      buttons: []
    };

    EmploymentStatusEnum.all()
      .filter((status) => status !== currentStatus)
      .forEach((status) => {
        button.buttons.push({
          label: EmploymentStatusEnum.label(status),
          css: EmploymentStatusEnum.cssClass(status),
          status: status
        });
      });

    return button;
  }

  commentFormSubmit(request: AddCommentRequest): void {
    this.service
      .addComment(this.candidateCard!.id, request)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.service
          .byId(this.candidateCard!.id)
          .pipe(untilDestroyed(this))
          .subscribe((card) => {
            this.candidateCard!.comments = card.comments;
            this.commentAdded.emit(this.candidateCard!);
            this.commentForm!.reset();
          });
      });
  }

  deleteComment(item: CandidateCardComment): void {
    // TODO Maxim: check permissions first
    if (confirm('Delete the comment?')) {
      this.service
        .deleteComment(this.candidateCard!.id, item.id)
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.candidateCard!.comments = this.candidateCard!.comments.filter((x) => x.id !== item.id);
          this.commentDeleted.emit(this.candidateCard!);
        });
    }
  }
}
