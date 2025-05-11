import { UserRole } from "./enums";

export interface ApplicationUser {
  id: number;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  fullname: string;
  pictureProfile: string | null;
  roles: Array<UserRole>;
  emailConfirmed: boolean;
  identityId: number | null;
  isMfaEnabled: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
