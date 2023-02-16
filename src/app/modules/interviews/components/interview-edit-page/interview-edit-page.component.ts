import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InterviewTemplate } from '@models/interview-models';
import { CandidateCard } from '@models/organizations/candidate-card.model';
import { CandidateInterview } from '@models/organizations/candidate-interview.model';
import { EmploymentStatus } from '@models/organizations/employment-status.enum';
import { Organization } from '@models/organizations/organization.model';
import { Label } from '@models/user-label.model';
import { CandidateCardsService } from '@services/candidate-cards.service';
import { InterviewTemplatesService } from '@services/interview-templates.service';
import { InterviewsService } from '@services/interviews.service';
import { OrganizationsService } from '@services/organizations.service';
import { TitleService } from '@services/title.service';
import { UserLabelsService } from '@services/user-labels.service';
import { AlertService } from '@shared/components/alert/services/alert.service';
import { ActivatedRouteExtended } from '@shared/routes/activated-route-extended';
import { DeveloperGradeSelectItem } from '@shared/select-boxes/developer-grade-select-item';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';
import { RandomHexColor } from '@shared/value-objects/random-hex-color';
import { EventType } from 'puppeteer';
import { InterviewFormGroup } from './interview-form-group';
import { InterviewTemplateSelectItem } from './interview-template-select-item';

@Component({
  templateUrl: './interview-edit-page.component.html',
  styleUrls: ['./interview-edit-page.component.scss']
})
export class InterviewEditPageComponent implements OnInit, OnDestroy {
  pageTitle = 'Create an interview';
  formGroup: InterviewFormGroup | null = null;
  templates: Array<InterviewTemplateSelectItem> = [];
  selectedTemplate: InterviewTemplate | null = null;
  labels: Array<Label> = [];
  selectedLabels: Array<Label> = [];
  myOrganizations: Array<Organization> = [];

  candidateCard: CandidateCard | null = null;
  candidateInterview: CandidateInterview | null = null;
  candidateFullname = '';
  showAddSubjectsFromTemplateModal = false;
  organization: Organization | null = null;
  employmentStatus: EmploymentStatus | null = null;

  readonly grades: Array<DeveloperGradeSelectItem> = DeveloperGradeSelectItem.allGrades();

  get subjectsCount(): number {
    return this.formGroup?.subjectsCount ?? 0;
  }

  get disableOrganizationAndCandidateFields(): boolean {
    return this.candidateCard != null || this.candidateInterview != null;
  }

  private readonly activateRoute: ActivatedRouteExtended;
  private interviewId: string | null = null;

  constructor(
    private readonly service: InterviewsService,
    private readonly templateService: InterviewTemplatesService,
    private readonly title: TitleService,
    private readonly alert: AlertService,
    private readonly router: Router,
    activatedRoute: ActivatedRoute,
    private readonly userLabelsService: UserLabelsService,
    private readonly orgService: OrganizationsService,
    private readonly candidateCardService: CandidateCardsService
  ) {
    this.activateRoute = new ActivatedRouteExtended(activatedRoute);
  }

  ngOnInit(): void {
    this.activateRoute
      .getParam('id')
      .pipe(untilDestroyed(this))
      .subscribe((id) => {
        this.interviewId = id;

        if (this.interviewId != null) {
          this.setTitle('Edit the interview');
          this.service
            .byId(this.interviewId)
            .pipe(untilDestroyed(this))
            .subscribe((i) => {
              this.candidateInterview = i.candidateInterview;
              this.candidateFullname = i.candidateInterview?.candidateName ?? '';
              this.organization = i.organization;
              this.employmentStatus = i.candidateInterview?.conductedDuringStatus ?? null;
              this.formGroup = new InterviewFormGroup(i);
              this.selectedLabels = [...this.selectedLabels, ...i.labels];
            });
          return;
        }

        this.activateRoute
          .getParam('cardId')
          .pipe(untilDestroyed(this))
          .subscribe((cardId) => {
            this.setTitle('Create an interview');
            if (cardId != null) {
              this.candidateCardService
                .byId(cardId)
                .pipe(untilDestroyed(this))
                .subscribe((card) => {
                  this.candidateCard = card;
                  this.employmentStatus = card.employmentStatus;
                  this.organization = card.organization;
                  this.candidateFullname =
                    card.candidate != null ? card.candidate!.firstName + ' ' + card.candidate!.lastName : '';

                  this.templateService
                    .availableForInterview()
                    .pipe(untilDestroyed(this))
                    .subscribe((templates) => {
                      this.templates = templates.map((t) => new InterviewTemplateSelectItem(t));
                      this.formGroup = new InterviewFormGroup(null, card);
                    });
                  return;
                });
            }

            this.templateService
              .availableForInterview()
              .pipe(untilDestroyed(this))
              .subscribe((templates) => {
                this.templates = templates.map((t) => new InterviewTemplateSelectItem(t));
                this.formGroup = new InterviewFormGroup(null, null);
              });
          });
      });

    this.userLabelsService
      .my()
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.labels = x;
      });

    this.orgService
      .myForSelectBoxes()
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.myOrganizations = x;
      });
  }

  onInterviewTemplateSelected(event: { target: any }): void {
    const templateId = event.target.value as string;
    if (templateId == null) {
      this.selectedTemplate = null;
      return;
    }

    this.selectedTemplate = this.templates.find((x) => x.item.id === templateId)?.item ?? null;
  }

  addSubjectsFromTemplate(): void {
    if (this.selectedTemplate != null) {
      this.formGroup!.addSubjectsFromTemplate(this.selectedTemplate);
      this.showAddSubjectsFromTemplateModal = false;
    }
  }

  clearSubjects(): void {
    this.formGroup!.clearSubjects();
  }

  onSave(): void {
    if (this.interviewId == null) {
      const createRequest = this.formGroup!.createRequest(this.selectedLabels);
      if (createRequest == null) {
        this.alert.error('Invalid form data');
        return;
      }

      this.service
        .create(createRequest)
        .pipe(untilDestroyed(this))
        .subscribe((id) => {
          this.alert.success('Interview was saved');
          this.router.navigate(['/interviews/my']);
        });
      return;
    }

    const updateRequest = this.formGroup!.updateRequest(this.selectedLabels);
    if (updateRequest == null) {
      this.alert.error('Invalid form data');
      return;
    }

    this.service
      .update(updateRequest)
      .pipe(untilDestroyed(this))
      .subscribe((id) => {
        this.alert.success('Interview was updated');
        this.router.navigate(['/interviews/my']);
      });
  }

  addSubject(): void {
    this.formGroup!.addSubject();
  }

  removeSubject(subjectIndex: number): void {
    this.formGroup!.removeSubject(subjectIndex);
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
  }

  openAddSubjectsFromTemplateModal(): void {
    this.showAddSubjectsFromTemplateModal = true;
  }

  onAddSubjectsFromTemplateModalClose(): void {
    this.showAddSubjectsFromTemplateModal = false;
  }

  private setTitle(pageTitle: string): void {
    this.pageTitle = pageTitle;
    this.title.setTitle(pageTitle);
  }
}
