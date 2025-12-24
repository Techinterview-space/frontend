import { Injectable } from "@angular/core";
import { Observable, of, EMPTY } from "rxjs";

/**
 * Mock Auth0 AuthService for server-side rendering.
 * Auth0's real AuthService uses browser APIs that don't exist on the server.
 */
@Injectable()
export class Auth0ServerMockService {
  readonly isAuthenticated$ = of(false);
  readonly isLoading$ = of(false);
  readonly user$ = of(null);
  readonly idTokenClaims$ = of(null);
  readonly error$ = of(null);
  readonly accessToken$ = of(null);

  loginWithRedirect(): Observable<void> {
    return EMPTY;
  }

  loginWithPopup(): Observable<void> {
    return EMPTY;
  }

  logout(): Observable<void> {
    return EMPTY;
  }

  getAccessTokenSilently(): Observable<string> {
    return of("");
  }

  getAccessTokenWithPopup(): Observable<string> {
    return of("");
  }

  getIdTokenClaims(): Observable<any> {
    return of(null);
  }

  handleRedirectCallback(): Observable<any> {
    return of(null);
  }
}
