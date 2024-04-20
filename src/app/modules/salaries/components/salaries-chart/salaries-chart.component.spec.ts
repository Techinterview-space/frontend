import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SalariesChartComponent } from "./salaries-chart.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";
import { GoogleAnalyticsService } from "ngx-google-analytics";

describe("SalariesChartComponent", () => {
  let component: SalariesChartComponent;
  let fixture: ComponentFixture<SalariesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalariesChartComponent],
      imports: [...mostUsedImports],
      providers: [
        ...testUtilStubs,
        ...mostUsedServices,
        GoogleAnalyticsService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SalariesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
