import { ApplicationUser } from '@models/application-user';
import { Candidate } from './candidate.model';
import { JoinToOrgInvitation } from './join-to-org-invitation.model';
import { OrganizationUser } from './organization-user.model';

export interface Organization {
  id: string;
  name: string;
  description: string | null;
  managerId: number | null;
  manager: ApplicationUser | null;
  users: Array<OrganizationUser>;
  candidates: Array<Candidate>;
  invitations: Array<JoinToOrgInvitation>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  active: boolean;
}
