import { TestBed } from "@angular/core/testing";
import { Router, RouterModule } from "@angular/router";
import { OidcUserManager } from "../services/auth/oidc-user-manager.service";
import { AuthorizationService } from "../../services";
import { AuthService } from "../services/auth/auth.service";
import { AuthGuard } from "./auth.guard";
import { NgxSpinnerService } from "ngx-spinner";
import { SpinnerService } from "@shared/services/spinners/spinner-service";
import { testUtilStubs, mostUsedServices } from "@shared/test-utils";
import { CookieService } from "ngx-cookie-service";

describe("AuthGuard", () => {
  let authServiceMock: AuthService;
  let cookieServiceMock: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      providers: [
        AuthGuard,
        ...testUtilStubs,
        ...mostUsedServices,
        OidcUserManager,
        AuthorizationService,
        NgxSpinnerService,
        SpinnerService,
        CookieService,
      ],
    });
    authServiceMock = TestBed.inject(AuthService);
    cookieServiceMock = TestBed.inject(CookieService);
  });

  it("should return true for canActivate", () => {
    spyOn(authServiceMock, "isAuthenticated").and.returnValue(true);
    const guard = new AuthGuard(
      TestBed.inject(Router),
      authServiceMock,
      cookieServiceMock
    );
    expect(guard.canActivate(null, null)).toEqual(true);
  });

  it("should return false for canActivate", () => {
    spyOn(authServiceMock, "login").and.returnValue(Promise.resolve());
    spyOn(authServiceMock, "isAuthenticated").and.returnValue(false);
    const guard = new AuthGuard(
      TestBed.inject(Router),
      authServiceMock,
      cookieServiceMock
    );
    expect(guard.canActivate(null, null)).toEqual(false);
  });
});
