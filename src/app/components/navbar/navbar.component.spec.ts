import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AuthService } from "@shared/services/auth/auth.service";
import { SpinnerService } from "@shared/services/spinners/spinner-service";
import { SharedModule } from "@shared/shared.module";
import { MockAuthService, testUtilStubs } from "@shared/test-utils";
import { CookieService } from "ngx-cookie-service";
import { of } from "rxjs";

import { NavbarComponent } from "./navbar.component";
import { RouterModule } from "@angular/router";
import { ApplicationUserExtended } from "@models/extended";
import { TestApplicationUser } from "@shared/test-utils/models";
import { UserRole } from "@models/enums";

describe("NavbarComponent", () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, RouterModule],
      declarations: [NavbarComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        ...testUtilStubs,
        CookieService,
        SpinnerService,
      ],
    }).compileComponents();
  });

  describe("with valid token", () => {
    beforeEach(() => {
      const authService = TestBed.inject(AuthService);
      spyOn(authService, "ensureValidToken").and.returnValue(of(true));
      spyOn(authService, "getCurrentUserFromStorage").and.returnValue(of(null));

      fixture = TestBed.createComponent(NavbarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it("should create", () => {
      expect(component).toBeTruthy();
    });

    it("renders login as button for crawl-safe markup", () => {
      const loginAnchor = fixture.nativeElement.querySelector("a.login-btn");
      const loginButton =
        fixture.nativeElement.querySelector("button.login-btn");

      expect(loginAnchor).toBeNull();
      expect(loginButton).not.toBeNull();
      expect(loginButton!.tagName).toBe("BUTTON");
      expect(loginButton!.getAttribute("href")).toBeNull();
    });
  });

  describe("with expired token and no refresh", () => {
    it("should not show logged-in state from stale cache alone", () => {
      const authService = TestBed.inject(AuthService);
      spyOn(authService, "ensureValidToken").and.returnValue(of(false));
      spyOn(authService, "getCurrentUserFromStorage").and.returnValue(
        of(
          new ApplicationUserExtended(
            new TestApplicationUser(UserRole.Interviewer),
          ),
        ),
      );

      fixture = TestBed.createComponent(NavbarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component.loginName).toBeNull();
      expect(authService.getCurrentUserFromStorage).not.toHaveBeenCalled();
    });
  });

  describe("with successful token refresh", () => {
    it("should show logged-in state after refresh succeeds", () => {
      const authService = TestBed.inject(AuthService);
      const testUser = new ApplicationUserExtended(
        new TestApplicationUser(UserRole.Interviewer),
      );
      spyOn(authService, "ensureValidToken").and.returnValue(of(true));
      spyOn(authService, "getCurrentUserFromStorage").and.returnValue(
        of(testUser),
      );

      fixture = TestBed.createComponent(NavbarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component.loginName).toBe(testUser.fullName);
    });
  });
});
