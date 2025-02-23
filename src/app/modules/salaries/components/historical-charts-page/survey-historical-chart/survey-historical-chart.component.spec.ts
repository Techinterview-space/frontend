import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  mostUsedImports,
  mostUsedServices,
  testUtilStubs,
} from "@shared/test-utils";
import { SurveyHistoricalChartComponent } from "./survey-historical-chart.component";

describe("SurveyHistoricalChartComponent", () => {
  let component: SurveyHistoricalChartComponent;
  let fixture: ComponentFixture<SurveyHistoricalChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SurveyHistoricalChartComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyHistoricalChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
