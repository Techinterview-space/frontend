import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";
import { SalariesAdminPaginatedTableComponent } from "./salaries-admin-paginated-table.component";

describe("SalariesAdminPaginatedTableComponent", () => {
  let component: SalariesAdminPaginatedTableComponent;
  let fixture: ComponentFixture<SalariesAdminPaginatedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalariesAdminPaginatedTableComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalariesAdminPaginatedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
