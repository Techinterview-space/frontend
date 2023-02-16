import { CandidateCard } from '@models/organizations/candidate-card.model';
import { EmploymentStatus } from '@models/organizations/employment-status.enum';

export interface StatusChangedEventArgs {
  card: CandidateCard;
  previousStatus: EmploymentStatus;
}
