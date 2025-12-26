import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "@shared/services/auth/auth.service";
import { SharedModule } from "@shared/shared.module";
import { SpinnerService } from "@shared/services/spinners/spinner-service";
import {
  MockAuthService,
  mostUsedServices,
  testUtilStubs,
} from "@shared/test-utils";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        ...testUtilStubs,
        ...mostUsedServices,
        SpinnerService,
      ],
      declarations: [AppComponent],
      imports: [RouterTestingModule, SharedModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
