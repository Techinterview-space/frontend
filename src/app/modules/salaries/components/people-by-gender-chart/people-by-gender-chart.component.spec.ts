import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";
import { PeopleByGenderChartComponent } from "./people-by-gender-chart.component";

describe("PeopleByGenderChartComponent", () => {
  let component: PeopleByGenderChartComponent;
  let fixture: ComponentFixture<PeopleByGenderChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleByGenderChartComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PeopleByGenderChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
