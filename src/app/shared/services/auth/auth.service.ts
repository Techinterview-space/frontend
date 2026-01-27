import { Subject, Observable, of, from, BehaviorSubject } from "rxjs";
import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { ApplicationUser } from "@models/application-user";
import {
  AuthorizationService,
  CheckTotpResponse,
} from "@services/authorization.service";
import { map, switchMap, tap, catchError } from "rxjs/operators";
import { ApplicationUserExtended } from "@models/extended";
import { AuthSessionService, AuthInfo } from "./auth.session.service";
import { TokenStorageService } from "./token-storage.service";
import {
  AuthApiService,
  AuthTokenResponse,
  RegisterRequest,
  AuthResult,
} from "@services/auth-api.service";
import { Router } from "@angular/router";

export interface IAuthService {
  getCurrentUser(): Observable<ApplicationUserExtended | null>;
  getCurrentUserFromBackend(): Observable<ApplicationUserExtended | null>;
  getCurrentUserFromStorage(): Observable<ApplicationUserExtended | null>;
  login(): Observable<void>;
  completeAuthentication(): Observable<CheckTotpResponse>;
  getAuthorizationHeaderValue(): string | null;
  isAuthenticated(): boolean;
  signout(): void;
}

@Injectable({
  providedIn: "root",
})
export class AuthService implements IAuthService {
  private authInfo: AuthInfo | null = null;
  private applicationUser: ApplicationUserExtended | null = null;
  private isBrowser: boolean;
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  public readonly loggedIn$: Subject<ApplicationUserExtended> = new Subject();
  public readonly loggedOutInvoked$: Subject<void> = new Subject();
  public readonly loggedOut$: Subject<void> = new Subject();

  constructor(
    private readonly session: AuthSessionService,
    private readonly tokenStorage: TokenStorageService,
    private readonly authorizationService: AuthorizationService,
    private readonly authApiService: AuthApiService,
    private readonly router: Router,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getCurrentUser(): Observable<ApplicationUserExtended | null> {
    this.tryLoadUserFromSession();

    if (this.authInfo == null && !this.tokenStorage.hasValidToken()) {
      return of(null);
    }

    if (this.applicationUser != null) {
      return of(this.applicationUser);
    }

    return this.getCurrentUserFromBackend();
  }

  getCurrentUserFromBackend(): Observable<ApplicationUserExtended | null> {
    return this.authorizationService.getMe().pipe(
      map((appUser) => {
        this.saveCurrentUser(appUser);
        return this.applicationUser;
      }),
      catchError(() => {
        this.clearSession();
        return of(null);
      }),
    );
  }

  getCurrentUserFromStorage(): Observable<ApplicationUserExtended | null> {
    this.tryLoadUserFromSession();

    if (this.authInfo == null && !this.tokenStorage.hasValidToken()) {
      return of(null);
    }

    if (this.applicationUser != null) {
      return of(this.applicationUser);
    }

    return of(null);
  }

  /**
   * Navigate to login page
   */
  login(): Observable<void> {
    return this.getCurrentUserFromStorage().pipe(
      switchMap((x) => {
        if (x == null) {
          this.router.navigate(["/login"]);
        }
        return of(undefined);
      }),
    );
  }

  /**
   * Login with email and password
   */
  loginWithEmail(
    email: string,
    password: string,
  ): Observable<AuthTokenResponse> {
    return this.authApiService.login({ email, password }).pipe(
      tap((response) => {
        this.handleAuthResponse(response);
      }),
    );
  }

  /**
   * Register a new user
   */
  register(request: RegisterRequest): Observable<AuthResult> {
    return this.authApiService.register(request);
  }

  /**
   * Request password reset
   */
  forgotPassword(email: string): Observable<AuthResult> {
    return this.authApiService.forgotPassword(email);
  }

  /**
   * Reset password with token
   */
  resetPassword(token: string, newPassword: string): Observable<AuthResult> {
    return this.authApiService.resetPassword(token, newPassword);
  }

  /**
   * Resend verification email
   */
  resendVerification(email: string): Observable<AuthResult> {
    return this.authApiService.resendVerification(email);
  }

  /**
   * Login with Google OAuth
   */
  loginWithGoogle(): void {
    if (!this.isBrowser) {
      return;
    }
    const returnUrl = window.location.pathname;
    sessionStorage.setItem("auth_return_url", returnUrl);
    window.location.href = this.authApiService.getGoogleAuthUrl(
      `${window.location.origin}/auth-callback`,
    );
  }

  /**
   * Login with GitHub OAuth
   */
  loginWithGithub(): void {
    if (!this.isBrowser) {
      return;
    }
    const returnUrl = window.location.pathname;
    sessionStorage.setItem("auth_return_url", returnUrl);
    window.location.href = this.authApiService.getGitHubAuthUrl(
      `${window.location.origin}/auth-callback`,
    );
  }

  /**
   * Handle OAuth callback with tokens from URL
   */
  handleOAuthCallback(
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
  ): Observable<ApplicationUserExtended | null> {
    this.tokenStorage.setTokens(accessToken, refreshToken, expiresIn);
    this.authInfo = {
      accessToken,
      expiresAt: Date.now() + expiresIn * 1000,
    };
    this.session.auth = this.authInfo;

    return this.getCurrentUserFromBackend();
  }

  completeAuthentication(): Observable<CheckTotpResponse> {
    // For backward compatibility - check if tokens exist
    if (this.tokenStorage.hasValidToken()) {
      return this.authorizationService.checkTotpRequired();
    }
    // Return a default response when no valid token
    return of({
      id: 0,
      email: "",
      isMfaEnabled: false,
    } as CheckTotpResponse);
  }

  /**
   * Refresh the access token
   */
  refreshToken(): Observable<string> {
    const refreshToken = this.tokenStorage.getRefreshToken();
    if (!refreshToken) {
      this.clearSession();
      return of("");
    }

    return this.authApiService.refreshToken(refreshToken).pipe(
      tap((response) => {
        this.handleAuthResponse(response);
      }),
      map((response) => response.access_token),
      catchError((error) => {
        this.clearSession();
        throw error;
      }),
    );
  }

  private handleAuthResponse(response: AuthTokenResponse): void {
    this.tokenStorage.setTokens(
      response.access_token,
      response.refresh_token,
      response.expires_in,
    );
    this.authInfo = {
      accessToken: response.access_token,
      expiresAt: Date.now() + response.expires_in * 1000,
    };
    this.session.auth = this.authInfo;
  }

  private saveCurrentUser(appUser: ApplicationUser): void {
    this.applicationUser = new ApplicationUserExtended(appUser);
    this.session.applicationUser = appUser;
    this.loggedIn$.next(this.applicationUser);
  }

  getAuthorizationHeaderValue(): string | null {
    if (this.isAuthenticated() && !this.isSessionExpired()) {
      const token = this.tokenStorage.getAccessToken();
      if (token) {
        return `Bearer ${token}`;
      }
    }

    return null;
  }

  isSessionExpired(): boolean {
    return this.tokenStorage.isTokenExpired() || this.session.sessionExpired;
  }

  isAuthenticated(): boolean {
    this.tryLoadUserFromSession();
    return this.tokenStorage.hasValidToken() || this.authInfo != null;
  }

  signout(): void {
    this.loggedOutInvoked$.next();

    const refreshToken = this.tokenStorage.getRefreshToken();
    if (refreshToken) {
      // Notify backend about logout (fire and forget)
      this.authApiService.logout(refreshToken).subscribe({
        error: () => {
          // Ignore errors during logout
        },
      });
    }

    this.clearSession();
  }

  public clearSession(): void {
    this.session.clear();
    this.tokenStorage.clearTokens();

    this.authInfo = null;
    this.applicationUser = null;

    this.loggedOut$.next();
  }

  private tryLoadUserFromSession(): void {
    if (this.authInfo == null) {
      this.authInfo = this.session.auth;
      const user = this.session.applicationUser;

      this.applicationUser =
        user != null ? new ApplicationUserExtended(user) : null;
    }
  }

  /**
   * Check if token needs refresh and refresh if necessary
   */
  ensureValidToken(): Observable<boolean> {
    if (!this.tokenStorage.hasValidToken()) {
      if (this.tokenStorage.getRefreshToken()) {
        return this.refreshToken().pipe(
          map(() => true),
          catchError(() => of(false)),
        );
      }
      return of(false);
    }

    if (this.tokenStorage.isTokenExpiringSoon()) {
      return this.refreshToken().pipe(
        map(() => true),
        catchError(() => of(true)), // Still valid, just couldn't refresh
      );
    }

    return of(true);
  }
}
