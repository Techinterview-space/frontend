import { ApplicationUser } from '@models/application-user';
import { CandidateCard } from './candidate-card.model';
import { Organization } from './organization.model';

export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  contacts: string | null;
  createdById: number | null;
  createdBy: ApplicationUser | null;
  organizationId: string;
  organization: Organization | null;
  candidateCards: Array<CandidateCard>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  active: boolean;
}
