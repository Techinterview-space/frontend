import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { InterviewsHomeComponent } from "./interviews-home.component";
import { SharedModule } from "@shared/shared.module";
import { AuthService } from "@shared/services/auth/auth.service";
import {
  MockAuthService,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";
import { SpinnerService } from "@shared/services/spinners/spinner-service";
import { RouterTestingModule } from "@angular/router/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("InterviewsHomeComponent", () => {
  let component: InterviewsHomeComponent;
  let fixture: ComponentFixture<InterviewsHomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        ...testUtilStubs,
        ...mostUsedServices,
        SpinnerService,
      ],
      declarations: [InterviewsHomeComponent],
      imports: [RouterTestingModule, SharedModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
