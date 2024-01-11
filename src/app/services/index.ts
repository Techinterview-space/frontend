import { AlertService } from '@shared/components/alert/services/alert.service';
import { AuthService } from '@shared/services/auth/auth.service';
import { AuthSessionService } from '@shared/services/auth/auth.session.service';
import { SessionStorageWrapper } from '@shared/services/session-storage-wrapper.service';
import { SpinnerService } from '@shared/services/spinners/spinner-service';
import { AuthorizationService } from './authorization.service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { TitleService } from './title.service';
import { BackgroundJobsService } from './background-jobs.service';
import { InterviewTemplatesService } from './interview-templates.service';
import { InterviewsService } from './interviews.service';
import { UserAdminService } from './user-admin.service';
import { UserLabelsService } from './user-labels.service';
import { OrganizationsService } from './organizations.service';
import { OrganizationInvitationsService } from './organization-invitations.service';
import { UsersService } from './users.service';
import { BoardService } from '@modules/candidates-dashboards/components/models/board.service';
import { CandidateCardsService } from './candidate-cards.service';
import { CandidatesService } from './candidates.service';
import { OrganizationLabelsService } from './organization-labels.service';
import { CandidateCvService } from './candidate-cv.service';
import { UserSalariesService } from './user-salaries.service';

export * from './authorization.service';
export * from './api.service';
export * from './base-api.service';
export * from './background-jobs.service';
export * from './title.service';
export * from './interview-templates.service';
export * from './interviews.service';
export * from './user-admin.service';
export * from './user-labels.service';
export * from './organizations.service';
export * from './organization-invitations.service';
export * from './candidates.service';
export * from './candidate-cards.service';
export * from './users.service';
export * from './organization-labels.service';
export * from './candidate-cv.service';

export const applicationServices = [
  SessionStorageWrapper,
  AuthService,
  AuthSessionService,
  AuthorizationService,
  SpinnerService,
  AlertService,
  GoogleAnalyticsService,
  TitleService,
  BackgroundJobsService,
  InterviewTemplatesService,
  InterviewsService,
  UserAdminService,
  UserLabelsService,
  OrganizationsService,
  OrganizationInvitationsService,
  UsersService,
  BoardService,
  CandidateCardsService,
  CandidatesService,
  OrganizationLabelsService,
  CandidateCvService,
  UserSalariesService
];
