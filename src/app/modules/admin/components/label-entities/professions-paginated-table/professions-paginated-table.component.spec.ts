import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";
import { ProfessionsPaginatedTableComponent } from "./professions-paginated-table.component";
import { ProfessionsService } from "@services/professions.service";

describe("ProfessionsPaginatedTableComponent", () => {
  let component: ProfessionsPaginatedTableComponent;
  let fixture: ComponentFixture<ProfessionsPaginatedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfessionsPaginatedTableComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, ProfessionsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionsPaginatedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
