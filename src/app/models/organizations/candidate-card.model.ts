import { ApplicationUser } from '@models/application-user';
import { Label } from '@models/user-label.model';
import { CandidateCardComment } from './candidate-card-comment';
import { CandidateCvFile } from './candidate-cv.model';
import { CandidateInterview } from './candidate-interview.model';
import { Candidate } from './candidate.model';
import { EmploymentStatus } from './employment-status.enum';
import { Organization } from './organization.model';

export interface CandidateCard {
  id: string;
  employmentStatus: EmploymentStatus;
  candidateId: string;
  candidate: Candidate | null;
  organizationId: string;
  organization: Organization | null;
  openById: number | null;
  openBy: ApplicationUser | null;
  interviews: Array<CandidateInterview>;
  files: Array<CandidateCvFile>;
  comments: Array<CandidateCardComment>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  active: boolean;
  labels: Array<Label>;
}
