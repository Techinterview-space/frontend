import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  mostUsedImports,
  mostUsedServices,
  testUtilStubs,
} from "@shared/test-utils";

import { HealthCheckTableComponent } from "./health-check-table.component";

describe("HealthCheckTableComponent", () => {
  let component: HealthCheckTableComponent;
  let fixture: ComponentFixture<HealthCheckTableComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [HealthCheckTableComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthCheckTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
