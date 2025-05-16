import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FormProgressBarComponent } from "./form-progress-bar.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";

describe("FormProgressBarComponent", () => {
  let component: FormProgressBarComponent;
  let fixture: ComponentFixture<FormProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormProgressBarComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FormProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
