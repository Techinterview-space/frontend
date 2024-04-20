import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EditSalaryComponent } from "./edit-salary.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";

describe("EditSalaryComponent", () => {
  let component: EditSalaryComponent;
  let fixture: ComponentFixture<EditSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditSalaryComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(EditSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
