import { CandidateInterview } from '@models/organizations/candidate-interview.model';
import { Organization } from '@models/organizations/organization.model';
import { Label } from '@models/user-label.model';
import { ApplicationUser } from '../application-user';
import { DeveloperGrade } from '../enums';
import { InterviewSubject } from './interview-subject';

export interface Interview {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  candidateName: string;
  candidateGrade: DeveloperGrade | null;
  overallOpinion: string | null;
  interviewerId: number;
  interviewer: ApplicationUser | null;
  organizationId: string | null;
  organization: Organization | null;
  subjects: Array<InterviewSubject>;
  labels: Array<Label>;
  candidateInterview: CandidateInterview | null;
}
