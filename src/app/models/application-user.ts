import { UserRole } from "./enums";

export interface ApplicationUser {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  fullname: string;
  roles: Array<UserRole>;
  emailConfirmed: boolean;
  identityId: number | null;
  deletedAt: Date | null;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
