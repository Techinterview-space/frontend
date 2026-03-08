import { TestBed } from "@angular/core/testing";
import { PLATFORM_ID } from "@angular/core";
import { Router } from "@angular/router";
import { of, throwError, Subject } from "rxjs";
import { AuthTokenResponse } from "@services/auth-api.service";
import { AuthService } from "./auth.service";
import { AuthSessionService, AuthInfo } from "./auth.session.service";
import { TokenStorageService } from "./token-storage.service";
import { AuthorizationService } from "@services/authorization.service";
import { AuthApiService } from "@services/auth-api.service";
import { ApplicationUser } from "@models/application-user";
import { UserRole } from "@models/enums";

describe("AuthService", () => {
  let service: AuthService;
  let tokenStorage: jasmine.SpyObj<TokenStorageService>;
  let sessionMock: {
    auth: AuthInfo | null;
    applicationUser: ApplicationUser | null;
    sessionExpired: boolean;
    clear: jasmine.Spy;
  };
  let authorizationService: jasmine.SpyObj<AuthorizationService>;
  let authApiService: jasmine.SpyObj<AuthApiService>;
  let router: jasmine.SpyObj<Router>;

  const mockUser: ApplicationUser = {
    id: 1,
    firstName: "John",
    lastName: "Smith",
    email: "j.smith@gmail.com",
    roles: [UserRole.Interviewer],
    emailConfirmed: true,
    unsubscribeMeFromAll: false,
    identityId: 1,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    fullname: "John Smith",
    isMfaEnabled: false,
    pictureProfile: null,
  };

  const mockAuthInfo: AuthInfo = {
    accessToken: "valid-token",
    expiresAt: Date.now() + 3600000,
  };

  beforeEach(() => {
    tokenStorage = jasmine.createSpyObj("TokenStorageService", [
      "hasValidToken",
      "isTokenExpired",
      "isTokenExpiringSoon",
      "getAccessToken",
      "getRefreshToken",
      "setTokens",
      "clearTokens",
      "getExpiresAt",
    ]);

    sessionMock = {
      auth: null,
      applicationUser: null,
      sessionExpired: false,
      clear: jasmine.createSpy("clear"),
    };

    authorizationService = jasmine.createSpyObj("AuthorizationService", [
      "getMe",
      "checkTotpRequired",
    ]);

    authApiService = jasmine.createSpyObj("AuthApiService", [
      "refreshToken",
      "logout",
    ]);

    router = jasmine.createSpyObj("Router", ["navigate", "navigateByUrl"]);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: TokenStorageService, useValue: tokenStorage },
        { provide: AuthSessionService, useValue: sessionMock },
        { provide: AuthorizationService, useValue: authorizationService },
        { provide: AuthApiService, useValue: authApiService },
        { provide: Router, useValue: router },
        { provide: PLATFORM_ID, useValue: "browser" },
      ],
    });

    service = TestBed.inject(AuthService);
  });

  describe("isAuthenticated", () => {
    it("should return false when token is expired even if cached authInfo exists", () => {
      tokenStorage.hasValidToken.and.returnValue(false);
      // Simulate stale cached authInfo by loading it from session
      sessionMock.auth = mockAuthInfo;

      expect(service.isAuthenticated()).toBe(false);
    });

    it("should return true when token is valid", () => {
      tokenStorage.hasValidToken.and.returnValue(true);

      expect(service.isAuthenticated()).toBe(true);
    });

    it("should return false when no token exists", () => {
      tokenStorage.hasValidToken.and.returnValue(false);

      expect(service.isAuthenticated()).toBe(false);
    });
  });

  describe("getCurrentUserFromStorage", () => {
    it("should return null when token is expired even with cached user in session", (done) => {
      tokenStorage.hasValidToken.and.returnValue(false);
      sessionMock.auth = mockAuthInfo;
      sessionMock.applicationUser = mockUser;

      service.getCurrentUserFromStorage().subscribe((user) => {
        expect(user).toBeNull();
        done();
      });
    });

    it("should return cached user when token is valid", (done) => {
      tokenStorage.hasValidToken.and.returnValue(true);
      sessionMock.auth = mockAuthInfo;
      sessionMock.applicationUser = mockUser;

      service.getCurrentUserFromStorage().subscribe((user) => {
        expect(user).not.toBeNull();
        expect(user!.id).toBe(mockUser.id);
        done();
      });
    });
  });

  describe("ensureValidToken", () => {
    it("should return true when token is valid", (done) => {
      tokenStorage.hasValidToken.and.returnValue(true);
      tokenStorage.isTokenExpiringSoon.and.returnValue(false);

      service.ensureValidToken().subscribe((valid) => {
        expect(valid).toBe(true);
        done();
      });
    });

    it("should refresh and return true when token is expired but refresh token exists", (done) => {
      tokenStorage.hasValidToken.and.returnValue(false);
      tokenStorage.getRefreshToken.and.returnValue("refresh-token");
      authApiService.refreshToken.and.returnValue(
        of({
          access_token: "new-access-token",
          refresh_token: "new-refresh-token",
          expires_in: 3600,
          token_type: "Bearer",
        }),
      );

      service.ensureValidToken().subscribe((valid) => {
        expect(valid).toBe(true);
        expect(authApiService.refreshToken).toHaveBeenCalledWith(
          "refresh-token",
        );
        expect(tokenStorage.setTokens).toHaveBeenCalledWith(
          "new-access-token",
          "new-refresh-token",
          3600,
        );
        done();
      });
    });

    it("should return false when token is expired and no refresh token exists", (done) => {
      tokenStorage.hasValidToken.and.returnValue(false);
      tokenStorage.getRefreshToken.and.returnValue(null);

      service.ensureValidToken().subscribe((valid) => {
        expect(valid).toBe(false);
        done();
      });
    });

    it("should return false when token is expired and refresh fails", (done) => {
      tokenStorage.hasValidToken.and.returnValue(false);
      tokenStorage.getRefreshToken.and.returnValue("refresh-token");
      authApiService.refreshToken.and.returnValue(
        throwError(() => new Error("Refresh failed")),
      );

      service.ensureValidToken().subscribe((valid) => {
        expect(valid).toBe(false);
        expect(tokenStorage.clearTokens).toHaveBeenCalled();
        done();
      });
    });

    it("should proactively refresh when token is expiring soon", (done) => {
      tokenStorage.hasValidToken.and.returnValue(true);
      tokenStorage.isTokenExpiringSoon.and.returnValue(true);
      tokenStorage.getRefreshToken.and.returnValue("refresh-token");
      authApiService.refreshToken.and.returnValue(
        of({
          access_token: "new-access-token",
          refresh_token: "new-refresh-token",
          expires_in: 3600,
          token_type: "Bearer",
        }),
      );

      service.ensureValidToken().subscribe((valid) => {
        expect(valid).toBe(true);
        expect(authApiService.refreshToken).toHaveBeenCalled();
        done();
      });
    });

    it("should deduplicate concurrent refresh calls", (done) => {
      tokenStorage.hasValidToken.and.returnValue(false);
      tokenStorage.getRefreshToken.and.returnValue("refresh-token");
      const refreshSubject = new Subject<AuthTokenResponse>();
      authApiService.refreshToken.and.returnValue(
        refreshSubject.asObservable(),
      );

      let completedCount = 0;
      const onComplete = () => {
        completedCount++;
        if (completedCount === 2) {
          expect(authApiService.refreshToken).toHaveBeenCalledTimes(1);
          done();
        }
      };

      service.ensureValidToken().subscribe((valid) => {
        expect(valid).toBe(true);
        onComplete();
      });
      service.ensureValidToken().subscribe((valid) => {
        expect(valid).toBe(true);
        onComplete();
      });

      refreshSubject.next({
        access_token: "new-access-token",
        refresh_token: "new-refresh-token",
        expires_in: 3600,
        token_type: "Bearer",
      });
      refreshSubject.complete();
    });
  });

  describe("getCurrentUser", () => {
    it("should clear session and return null when token cannot be refreshed", (done) => {
      tokenStorage.hasValidToken.and.returnValue(false);
      tokenStorage.getRefreshToken.and.returnValue(null);
      tokenStorage.clearTokens.and.stub();

      service.getCurrentUser().subscribe((user) => {
        expect(user).toBeNull();
        expect(sessionMock.clear).toHaveBeenCalled();
        expect(tokenStorage.clearTokens).toHaveBeenCalled();
        done();
      });
    });

    it("should refresh token and fetch user from backend when token is expired but refreshable", (done) => {
      tokenStorage.hasValidToken.and.returnValue(false);
      tokenStorage.getRefreshToken.and.returnValue("refresh-token");
      authApiService.refreshToken.and.returnValue(
        of({
          access_token: "new-token",
          refresh_token: "new-refresh",
          expires_in: 3600,
          token_type: "Bearer",
        }),
      );
      authorizationService.getMe.and.returnValue(of(mockUser));

      service.getCurrentUser().subscribe((user) => {
        expect(user).not.toBeNull();
        expect(user!.id).toBe(mockUser.id);
        expect(authApiService.refreshToken).toHaveBeenCalled();
        done();
      });
    });
  });

  describe("getAuthorizationHeaderValue", () => {
    it("should return null when token is expired regardless of session timestamp", () => {
      tokenStorage.hasValidToken.and.returnValue(false);
      sessionMock.sessionExpired = false;

      expect(service.getAuthorizationHeaderValue()).toBeNull();
    });

    it("should return bearer token when token is valid", () => {
      tokenStorage.hasValidToken.and.returnValue(true);
      tokenStorage.getAccessToken.and.returnValue("valid-token");

      expect(service.getAuthorizationHeaderValue()).toBe(
        "Bearer valid-token",
      );
    });

    it("should return bearer token even when 12-hour session timestamp has expired", () => {
      tokenStorage.hasValidToken.and.returnValue(true);
      tokenStorage.getAccessToken.and.returnValue("valid-token");
      sessionMock.sessionExpired = true;

      expect(service.getAuthorizationHeaderValue()).toBe(
        "Bearer valid-token",
      );
    });
  });
});
