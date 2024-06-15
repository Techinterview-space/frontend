import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  mostUsedImports,
  mostUsedServices,
  testUtilStubs,
} from "@shared/test-utils";
import { HistoricalChartsService } from "@services/historical-charts.service";
import { HistoricalChartsPageComponent } from "./historical-charts-page.component";

describe("HistoricalChartsPageComponent", () => {
  let component: HistoricalChartsPageComponent;
  let fixture: ComponentFixture<HistoricalChartsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoricalChartsPageComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, HistoricalChartsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalChartsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
