import { ApplicationUser } from '@models/application-user';
import { Interview } from '@models/interview-models/interview';
import { CandidateCard } from './candidate-card.model';
import { EmploymentStatus } from './employment-status.enum';

export interface CandidateInterview {
  id: string;
  conductedDuringStatus: EmploymentStatus;
  comnmets: string;
  candidateCardId: string;
  candidateCard: CandidateCard | null;
  candidateName: string | null;
  interviewId: string;
  interview: Interview | null;
  interviewerName: string | null;
  interviewerId: number | null;
  organizedById: number | null;
  organizedBy: ApplicationUser | null;
  createdAt: Date;
  updatedAt: Date;
}
