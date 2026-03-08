import { TestBed } from "@angular/core/testing";
import { Router, RouterModule } from "@angular/router";
import { AuthorizationService } from "../../services";
import { AuthService } from "../services/auth/auth.service";
import { AuthGuard } from "./auth.guard";
import { SpinnerService } from "@shared/services/spinners/spinner-service";
import { testUtilStubs, mostUsedServices } from "@shared/test-utils";
import { CookieService } from "ngx-cookie-service";
import { of } from "rxjs";

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
        AuthorizationService,
        SpinnerService,
        CookieService,
      ],
    });
    authServiceMock = TestBed.inject(AuthService);
    cookieServiceMock = TestBed.inject(CookieService);
  });

  it("should return true for canActivate when token is valid", (done) => {
    spyOn(authServiceMock, "ensureValidToken").and.returnValue(of(true));
    const guard = new AuthGuard(
      TestBed.inject(Router),
      authServiceMock,
      cookieServiceMock,
    );
    guard.canActivate(null, null).subscribe((result) => {
      expect(result).toEqual(true);
      done();
    });
  });

  it("should return false for canActivate when token is invalid", (done) => {
    spyOn(authServiceMock, "ensureValidToken").and.returnValue(of(false));
    const guard = new AuthGuard(
      TestBed.inject(Router),
      authServiceMock,
      cookieServiceMock,
    );
    guard.canActivate(null, null).subscribe((result) => {
      expect(result).toEqual(false);
      done();
    });
  });

  it("should deny access when only stale cached auth exists", (done) => {
    spyOn(authServiceMock, "ensureValidToken").and.returnValue(of(false));
    spyOn(authServiceMock, "isAuthenticated").and.returnValue(true);
    const router = TestBed.inject(Router);
    spyOn(router, "navigateByUrl");

    const guard = new AuthGuard(router, authServiceMock, cookieServiceMock);
    guard.canActivate(null, null).subscribe((result) => {
      expect(result).toEqual(false);
      expect(router.navigateByUrl).toHaveBeenCalledWith("/login");
      done();
    });
  });
});
