import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";
import { SalariesSurveyBlockComponent } from "./salaries-survey-block.component";
import { SurveyService } from "@services/salaries-survey.service";

describe("SalariesSurveyBlockComponent", () => {
  let component: SalariesSurveyBlockComponent;
  let fixture: ComponentFixture<SalariesSurveyBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalariesSurveyBlockComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, SurveyService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SalariesSurveyBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
