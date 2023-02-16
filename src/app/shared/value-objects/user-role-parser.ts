import { UserRole } from '@models/enums';
import Assertion from '@shared/validation/assertion';

export default class UserRoleParser {
  private readonly userRolesArray = [
    this.roleWtihStrRepresent(UserRole.Interviewer),
    this.roleWtihStrRepresent(UserRole.Admin)
  ];

  constructor(private readonly role: string | null) {
    Assertion.stringNotNullOrEmpty(role, 'role');
  }

  get(): UserRole {
    const roleToSearchInLower = this.role!.toLowerCase();
    for (const item of this.userRolesArray) {
      if (item.str === roleToSearchInLower) {
        return item.role;
      }
    }

    return UserRole.None;
  }

  private roleWtihStrRepresent(role: UserRole): { str: string; role: UserRole } {
    return {
      str: UserRole[role].toString().toLowerCase(),
      role
    };
  }
}
