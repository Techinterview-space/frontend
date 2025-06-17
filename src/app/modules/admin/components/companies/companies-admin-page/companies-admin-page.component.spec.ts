import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InterviewsService } from "@services/interviews.service";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";

import { CompaniesAdminPageComponent } from "./companies-admin-page.component";
import { CompaniesService } from "@services/companies.service";

describe("CompaniesAdminPageComponent", () => {
  let component: CompaniesAdminPageComponent;
  let fixture: ComponentFixture<CompaniesAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompaniesAdminPageComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, CompaniesService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should enable search button when query is long enough", () => {
    component.searchQuery = "te";
    expect(component.searchButtonShouldBeEnabled).toBeTruthy();
  });

  it("should disable search button when query is too short", () => {
    component.searchQuery = "t";
    expect(component.searchButtonShouldBeEnabled).toBeFalsy();
  });

  it("should clear search query and reload data", () => {
    component.searchQuery = "test";
    spyOn(component, "loadData");

    component.clearSearch();

    expect(component.searchQuery).toBe("");
    expect(component.currentPage).toBe(1);
    expect(component.loadData).toHaveBeenCalledWith(1);
  });

  it("should trigger search on Enter key press", () => {
    component.searchQuery = "test";
    spyOn(component, "search");

    const event = new KeyboardEvent("keyup", { key: "Enter" });
    component.onKeyupEvent(event);

    expect(component.search).toHaveBeenCalled();
  });
});
