import { Subject, of, Observable } from "rxjs";
import { IAuthService } from "../services/auth/auth.service";
import { ApplicationUserExtended } from "@models/extended";
import { IdToken } from "@auth0/auth0-angular";
import { ApplicationUser } from "@models/application-user";
import { TestApplicationUser } from "./models";
import { UserRole } from "@models/enums";
import { CheckTotpResponse } from "@services/authorization.service";

export class MockAuthService implements IAuthService {
  public readonly loggedOutInvoked$: Subject<void> = new Subject();
  public readonly loggedIn$: Subject<void> = new Subject();
  public readonly loggedOut$: Subject<void> = new Subject();

  isAuthenticated(): boolean {
    return false;
  }

  getAuthorizationHeaderValue(): string {
    return "";
  }

  completeAuthentication(): Observable<CheckTotpResponse> {
    const user = new TestApplicationUser(UserRole.Interviewer);
    return of({
      id: user.id,
      email: user.email,
      isMfaEnabled: user.isMfaEnabled,
    } as CheckTotpResponse);
  }

  getCurrentUser(): Observable<ApplicationUserExtended | null> {
    return of(
      new ApplicationUserExtended(new TestApplicationUser(UserRole.Interviewer))
    );
  }

  login(): Promise<void> {
    return Promise.resolve();
  }

  signout(): void {
    // do nothing
  }
}
