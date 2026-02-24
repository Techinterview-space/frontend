import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PublicSurveysService } from "@services/public-surveys.service";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";

import { SurveyCreatePageComponent } from "./survey-create-page.component";

describe("SurveyCreatePageComponent", () => {
  let component: SurveyCreatePageComponent;
  let fixture: ComponentFixture<SurveyCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SurveyCreatePageComponent],
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
    fixture = TestBed.createComponent(SurveyCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize form with 1 question and 2 empty options", () => {
    expect(component.formGroup).toBeTruthy();
    expect(component.formGroup!.questionsCount).toBe(1);
    expect(component.formGroup!.getOptionsCount(0)).toBe(2);
  });
});
