import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "@shared/services/auth/auth.service";
import {
  MockAuthService,
  mostUsedImports,
  mostUsedServices,
  testUtilStubs,
} from "@shared/test-utils";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ...mostUsedServices,
        { provide: AuthService, useClass: MockAuthService },
      ],
      imports: [RouterTestingModule, ...mostUsedImports],
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Tech.Interview'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual("Tech.Interview");
  });
});
