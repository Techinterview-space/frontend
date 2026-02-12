import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PublicSurveysService } from "@services/public-surveys.service";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";

import { SurveyResultsPageComponent } from "./survey-results-page.component";

describe("SurveyResultsPageComponent", () => {
  let component: SurveyResultsPageComponent;
  let fixture: ComponentFixture<SurveyResultsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SurveyResultsPageComponent],
      imports: [...mostUsedImports],
      providers: [
        ...testUtilStubs,
        ...mostUsedServices,
        PublicSurveysService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyResultsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
