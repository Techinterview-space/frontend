import { ApplicationUser, AuthProvider } from "@models/application-user";
import Assertion from "@shared/validation/assertion";
import { UserRole } from "@models/enums";

export class ApplicationUserExtended implements ApplicationUser {
  readonly fullName: string;
  readonly rolesAsString: Array<string> = [];

  get id(): number {
    return this.instance.id;
  }

  get firstName(): string | null {
    return this.instance.firstName;
  }

  get lastName(): string | null {
    return this.instance.lastName;
  }

  get fullname(): string {
    return this.instance.fullname;
  }

  get pictureProfile(): string | null {
    return this.instance.pictureProfile;
  }

  get email(): string | null {
    return this.instance.email;
  }

  get emailConfirmed(): boolean {
    return this.instance.emailConfirmed;
  }

  get unsubscribeMeFromAll(): boolean {
    return this.instance.unsubscribeMeFromAll;
  }

  get identityId(): number | null {
    return this.instance.identityId;
  }

  get updatedAt(): Date {
    return this.instance.updatedAt;
  }

  get createdAt(): Date {
    return this.instance.createdAt;
  }

  get deletedAt(): Date | null {
    return this.instance.deletedAt;
  }

  get isActive(): boolean {
    return this.instance.deletedAt == null;
  }

  get roles(): Array<UserRole> {
    return this.instance.roles;
  }

  get isMfaEnabled(): boolean {
    return this.instance.isMfaEnabled;
  }

  // Security-related getters
  get authProvider(): AuthProvider | undefined {
    return this.instance.authProvider;
  }

  get failedLoginAttempts(): number | undefined {
    return this.instance.failedLoginAttempts;
  }

  get lockedUntil(): Date | null | undefined {
    return this.instance.lockedUntil;
  }

  get isLockedOut(): boolean | undefined {
    return this.instance.isLockedOut;
  }

  get hasPendingEmailVerification(): boolean | undefined {
    return this.instance.hasPendingEmailVerification;
  }

  constructor(public readonly instance: ApplicationUser) {
    Assertion.notNull(instance, "instance", ApplicationUserExtended.name);

    this.fullName = `${instance.firstName} ${instance.lastName}`;
    instance.roles.forEach((role) => {
      this.rolesAsString.push(UserRole[role]);
    });
  }

  hasRole(role: UserRole): boolean {
    return this.instance.roles.includes(role);
  }

  hasRoleOrFail(role: UserRole): void {
    if (!this.hasRole(role)) {
      throw Error("You have no permission to execute this operation");
    }
  }
}
