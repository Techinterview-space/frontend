import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  mostUsedImports,
  mostUsedServices,
  testUtilStubs,
} from "@shared/test-utils";
import { HistoricalSalariesChartComponent } from "./historical-charts-page.component";

describe("HistoricalSalariesChartComponent", () => {
  let component: HistoricalSalariesChartComponent;
  let fixture: ComponentFixture<HistoricalSalariesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoricalSalariesChartComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalSalariesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
