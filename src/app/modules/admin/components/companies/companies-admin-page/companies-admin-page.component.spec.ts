import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";

import { CompaniesAdminPageComponent } from "./companies-admin-page.component";
import { CompaniesService } from "@services/companies.service";
import { of } from "rxjs";
import { Company } from "@models/companies.model";
import { OpenAiChatResult } from "@models/open-ai.model";

describe("CompaniesAdminPageComponent", () => {
  let component: CompaniesAdminPageComponent;
  let fixture: ComponentFixture<CompaniesAdminPageComponent>;
  let companiesService: CompaniesService;

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
    companiesService = TestBed.inject(CompaniesService);
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

  it("should show AI analysis modal when showAiAnalysis is called", () => {
    const mockCompany: Company = {
      id: "1",
      name: "Test Company",
      slug: "test-company",
    } as Company;

    const mockAiResult: OpenAiChatResult = {
      isSuccess: true,
      choises: [
        {
          message: {
            role: "assistant",
            content: "Test analysis",
          },
        },
      ],
      model: "gpt-4o",
    };

    spyOn(companiesService, "getOpenAiAnalysis").and.returnValue(
      of(mockAiResult),
    );

    component.showAiAnalysis(mockCompany);

    expect(companiesService.getOpenAiAnalysis).toHaveBeenCalledWith(
      "test-company",
    );
    expect(component.aiAnalysisData).toEqual(mockAiResult);
    expect(component.aiAnalysisJsonContent).toContain("Test analysis");
  });

  it("should close AI analysis modal", () => {
    component.aiAnalysisData = {} as any;
    component.aiAnalysisJsonContent = "test content";

    component.onAiAnalysisModalClose();

    expect(component.aiAnalysisData).toBeNull();
    expect(component.aiAnalysisJsonContent).toBe("");
  });

  it("should create form with slug field for new company", () => {
    component.create();

    expect(component.editForm).toBeTruthy();
    expect(component.editForm!.get("slug")).toBeTruthy();
    expect(component.editForm!.get("slug")!.value).toBeNull();
  });

  it("should create form with slug field for existing company", () => {
    const mockCompany: Company = {
      id: "1",
      name: "Test Company",
      slug: "test-slug",
      description: "Description",
      links: ["https://example.com"],
      logoUrl: "",
    } as Company;

    component.edit(mockCompany);

    expect(component.editForm).toBeTruthy();
    expect(component.editForm!.get("slug")!.value).toBe("test-slug");
  });

  it("should submit create with slug when provided", () => {
    const createSpy = spyOn(companiesService, "create").and.returnValue(
      of(void 0),
    );

    component.create();
    component.editForm!.patchValue({
      name: "New Company",
      description: "Desc",
      slug: "custom-slug",
    });

    component.onEditFormSubmit();

    expect(createSpy).toHaveBeenCalled();
    const arg = createSpy.calls.first().args[0];
    expect(arg.slug).toBe("custom-slug");
  });

  it("should copy AI analysis content", () => {
    const mockInputElement = {
      select: jasmine.createSpy("select"),
      setSelectionRange: jasmine.createSpy("setSelectionRange"),
    };

    spyOn(document, "execCommand");

    component.copyAiAnalysis(mockInputElement);

    expect(mockInputElement.select).toHaveBeenCalled();
    expect(document.execCommand).toHaveBeenCalledWith("copy");
    expect(mockInputElement.setSelectionRange).toHaveBeenCalledWith(0, 0);
    expect(component.copyBtnTitle).toBe("Скопировано");
  });
});
