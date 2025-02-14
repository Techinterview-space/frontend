import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";
import { UsefulnessRatingComponent } from "./usefulness-rating.component";
import { SurveyService } from "@services/salaries-survey.service";

describe("UsefulnessRatingComponent", () => {
  let component: UsefulnessRatingComponent;
  let fixture: ComponentFixture<UsefulnessRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsefulnessRatingComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, SurveyService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(UsefulnessRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
