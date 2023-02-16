import { UserRole } from '@models/enums';
import UserRoleParser from './user-role-parser';

describe('UserRoleParser', () => {
  const target = (role: string | null): UserRoleParser => {
    return new UserRoleParser(role);
  };

  it('.get should throw error for null and empty string values', () => {
    expect(() => target('')).toThrow();
    expect(() => target(null)).toThrow();
  });

  it('.get should return UserRole for case insensitive input data', () => {
    expect(target('Interviewer').get()).toBe(UserRole.Interviewer);
    expect(target('interviewer').get()).toBe(UserRole.Interviewer);
    expect(target('iNTerViewer').get()).toBe(UserRole.Interviewer);
  });

  it('.get should return UserRole.None for invalid input string', () => {
    expect(target('ololo').get()).toBe(UserRole.None);
  });

  it('.get should return UserRole if valid string passed', () => {
    expect(target('interviewer').get()).toBe(UserRole.Interviewer);
    expect(target('admin').get()).toBe(UserRole.Admin);
  });
});
