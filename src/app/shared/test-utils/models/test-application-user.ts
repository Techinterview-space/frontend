import { ApplicationUser } from '@models/application-user';
import { UserRole } from '@models/enums';
import { ApplicationUserExtended } from '@models/extended';
import { OrganizationUser } from '@models/organizations/organization-user.model';

export class TestApplicationUser implements ApplicationUser {
  constructor(role: UserRole, id: number = 1) {
    this.id = id;
    this.firstName = 'John';
    this.lastName = 'Smith';
    this.email = 'j.smith@petrel.ai';
    this.roles = [role];
    this.emailConfirmed = true;
    this.identityId = id;
    this.deletedAt = null;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.organizations = [];
    this.fullname = `${this.firstName} ${this.lastName}`;
  }

  organizations: OrganizationUser[];
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  roles: UserRole[];
  emailConfirmed: boolean;
  identityId: number | null;
  deletedAt: Date | null;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  fullname: string;

  asExtended(): ApplicationUserExtended {
    return new ApplicationUserExtended(this);
  }
}
