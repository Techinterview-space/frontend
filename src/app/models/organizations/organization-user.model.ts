import { ApplicationUser } from '@models/application-user';
import { Organization } from './organization.model';

export interface OrganizationUser {
  id: number;
  userId: number;
  user: ApplicationUser | null;
  organizationId: string;
  organization: Organization;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  active: boolean;
}
