import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LabelsNgSelectComponent } from "./labels-ng-select.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  mostUsedImports,
  mostUsedServices,
  testUtilStubs,
} from "@shared/test-utils";

describe("LabelsNgSelectComponent", () => {
  let component: LabelsNgSelectComponent;
  let fixture: ComponentFixture<LabelsNgSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabelsNgSelectComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelsNgSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
