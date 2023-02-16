import { Organization } from '@models/organizations/organization.model';
import { Label } from '@models/user-label.model';
import { ApplicationUser } from '..';
import { InterviewTemplateSubject } from './interview-template-subject';

export interface InterviewTemplate {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  overallOpinion: string | null;
  authorId: number;
  author: ApplicationUser | null;
  isPublic: boolean;
  organizationId: string | null;
  organization: Organization | null;
  subjects: Array<InterviewTemplateSubject>;
  labels: Array<Label>;
}
