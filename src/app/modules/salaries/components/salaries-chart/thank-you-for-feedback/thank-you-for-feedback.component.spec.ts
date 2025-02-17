import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";
import { SurveyService } from "@services/salaries-survey.service";
import { ThankYouForFeedbackComponent } from "./thank-you-for-feedback.component";

describe("ThankYouForFeedbackComponent", () => {
  let component: ThankYouForFeedbackComponent;
  let fixture: ComponentFixture<ThankYouForFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThankYouForFeedbackComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, SurveyService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ThankYouForFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
