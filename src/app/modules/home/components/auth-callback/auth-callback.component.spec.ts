import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { AuthCallbackComponent } from "./auth-callback.component";
import { MockAuthService } from "@shared/test-utils/mock-auth.service";
import { AuthService } from "@shared/services/auth/auth.service";
import { SharedModule } from "@shared/shared.module";
import { testUtilStubs } from "@shared/test-utils";
import { CookieService } from "ngx-cookie-service";

describe("AuthCallbackComponent", () => {
  let component: AuthCallbackComponent;
  let fixture: ComponentFixture<AuthCallbackComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [AuthCallbackComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        ...testUtilStubs,
        CookieService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
