import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SkillsService } from "@services/skills.service";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";
import { SkillsPaginatedTableComponent } from "./skills-paginated-table.component";

describe("SkillsPaginatedTableComponent", () => {
  let component: SkillsPaginatedTableComponent;
  let fixture: ComponentFixture<SkillsPaginatedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkillsPaginatedTableComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, SkillsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsPaginatedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
