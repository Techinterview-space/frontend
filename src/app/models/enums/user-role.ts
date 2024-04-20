import { SelectItem } from "@shared/select-boxes/select-item";

/**
 * Values for enum you have to keep equal to Utils.Enums.Role
 */
export enum UserRole {
  None = 0,
  Interviewer = 1,
  Admin = 1024,
}

export class UserRoleEnum {
  static readonly items: Array<UserRole> = [
    UserRole.Interviewer,
    UserRole.Admin,
  ];

  static options(): Array<SelectItem<UserRole>> {
    return UserRoleEnum.items.map((x) => {
      return {
        label: x.toString(),
        value: x.toString(),
        item: x,
      };
    });
  }
}
