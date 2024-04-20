import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";
import { GradesMinMaxChartComponent } from "./grades-min-max-chart.component";

describe("GradesMinMaxChartComponent", () => {
  let component: GradesMinMaxChartComponent;
  let fixture: ComponentFixture<GradesMinMaxChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GradesMinMaxChartComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(GradesMinMaxChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
