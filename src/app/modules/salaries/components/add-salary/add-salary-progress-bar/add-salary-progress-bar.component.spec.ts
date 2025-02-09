import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AddSalaryProgrssBarComponent } from "./add-salary-progress-bar.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";

describe("AddSalaryProgrssBarComponent", () => {
  let component: AddSalaryProgrssBarComponent;
  let fixture: ComponentFixture<AddSalaryProgrssBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSalaryProgrssBarComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AddSalaryProgrssBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
