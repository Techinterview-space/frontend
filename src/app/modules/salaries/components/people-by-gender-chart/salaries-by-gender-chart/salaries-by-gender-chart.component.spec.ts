import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";
import { SalariesByGenderChartComponent } from "./salaries-by-gender-chart.component";

describe("SalariesByGenderChartComponent", () => {
  let component: SalariesByGenderChartComponent;
  let fixture: ComponentFixture<SalariesByGenderChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalariesByGenderChartComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SalariesByGenderChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
