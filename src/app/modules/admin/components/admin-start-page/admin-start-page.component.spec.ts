import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AdminStartPageComponent } from "./admin-start-page.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  mostUsedImports,
  mostUsedServices,
  testUtilStubs,
} from "@shared/test-utils";

describe("AdminStartPageComponent", () => {
  let component: AdminStartPageComponent;
  let fixture: ComponentFixture<AdminStartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminStartPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
