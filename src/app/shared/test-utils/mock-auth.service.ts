import { Subject, of, Observable } from "rxjs";
import { IAuthService } from "../services/auth/auth.service";
import { ApplicationUserExtended } from "@models/extended";
import { IdToken } from "@auth0/auth0-angular";

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

  completeAuthentication(): Observable<IdToken | null> {
    return of();
  }

  getCurrentUser(): Observable<ApplicationUserExtended | null> {
    return of(null);
  }

  login(): Promise<void> {
    return Promise.resolve();
  }

  signout(): void {
    // do nothing
  }
}
