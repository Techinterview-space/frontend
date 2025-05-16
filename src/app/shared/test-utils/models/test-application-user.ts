import { ApplicationUser } from "@models/application-user";
import { UserRole } from "@models/enums";
import { ApplicationUserExtended } from "@models/extended";

export class TestApplicationUser implements ApplicationUser {
  constructor(role: UserRole, id: number = 1) {
    this.id = id;
    this.firstName = "John";
    this.lastName = "Smith";
    this.email = "j.smith@gmail.com";
    this.roles = [role];
    this.emailConfirmed = true;
    this.identityId = id;
    this.deletedAt = null;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.fullname = `${this.firstName} ${this.lastName}`;
    this.isMfaEnabled = false;
    this.pictureProfile = null;
  }

  isMfaEnabled: boolean;
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
  pictureProfile: string | null;
  asExtended(): ApplicationUserExtended {
    return new ApplicationUserExtended(this);
  }
}
