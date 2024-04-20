import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AdminNavbarComponent } from "./admin-navbar.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  mostUsedImports,
  mostUsedServices,
  testUtilStubs,
} from "@shared/test-utils";

describe("AdminNavbarComponent", () => {
  let component: AdminNavbarComponent;
  let fixture: ComponentFixture<AdminNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminNavbarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
