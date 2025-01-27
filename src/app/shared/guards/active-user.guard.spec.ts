import { TestApplicationUser } from "@shared/test-utils/models";
import { UserRole } from "@models/enums";
import { AuthService } from "@shared/services/auth/auth.service";
import { Observable, of } from "rxjs";
import { ApplicationUserExtended } from "@models/extended";
import { ApplicationUser } from "@models/application-user";
import { ActiveUserGuard } from "./active-user.guard";
import { IdToken } from "@auth0/auth0-angular";

class AuthStub extends AuthService {
  constructor(private readonly user: ApplicationUser | null) {
    // @ts-ignore
    super(null, null, null, null);
  }

  override getCurrentUser(): Observable<ApplicationUserExtended | null> {
    return of(
      this.user != null ? new ApplicationUserExtended(this.user) : null
    );
  }

  override login(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  override completeAuthentication(): Observable<ApplicationUser> {
    throw new Error("Method not implemented.");
  }
  override getAuthorizationHeaderValue(): string {
    throw new Error("Method not implemented.");
  }
  override isAuthenticated(): boolean {
    throw new Error("Method not implemented.");
  }
  override signout(): void {
    throw new Error("Method not implemented.");
  }
}

describe("ActiveUserGuard", () => {
  it(".canActiveteInternal should return true if the current user is active", () => {
    const user = new TestApplicationUser(UserRole.Interviewer);
    const target = new ActiveUserGuard(new AuthStub(user));

    expect(target.canActiveteInternal(new ApplicationUserExtended(user))).toBe(
      true
    );
  });

  it(".canActiveteInternal should return false if the current user is inactive", () => {
    const user = new TestApplicationUser(UserRole.Interviewer);
    user.deletedAt = new Date(Date.now());
    const target = new ActiveUserGuard(new AuthStub(user));

    expect(target.canActiveteInternal(new ApplicationUserExtended(user))).toBe(
      false
    );
  });

  it(".canActivate should return false if no current user", () => {
    const target = new ActiveUserGuard(new AuthStub(null));

    expect(target.canActiveteInternal(null)).toBe(false);
  });
});
