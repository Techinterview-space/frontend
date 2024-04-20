import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";
import { WorkIndustriesChartComponent } from "./work-industries-chart.component";

describe("WorkIndustriesChartComponent", () => {
  let component: WorkIndustriesChartComponent;
  let fixture: ComponentFixture<WorkIndustriesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkIndustriesChartComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkIndustriesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
