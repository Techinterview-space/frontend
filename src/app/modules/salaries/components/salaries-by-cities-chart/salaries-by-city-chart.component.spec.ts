import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";
import { SalariesByCityChartComponent } from "./salaries-by-city-chart.component";

describe("SalariesByCityChartComponent", () => {
  let component: SalariesByCityChartComponent;
  let fixture: ComponentFixture<SalariesByCityChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalariesByCityChartComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SalariesByCityChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
