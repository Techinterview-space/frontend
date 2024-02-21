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
  subjects: Array<InterviewSubject> | null;
  labels: Array<Label>;
}
