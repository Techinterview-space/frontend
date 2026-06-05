import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, convertToParamMap } from "@angular/router";
import { of } from "rxjs";
import {
  mostUsedImports,
  mostUsedServices,
  testUtilStubs,
} from "@shared/test-utils";
import { VacancyStatus } from "@models/vacancy.model";
import { VacanciesService } from "@services/vacancies.service";
import { CompaniesService } from "@services/companies.service";

import { VacancyEditPageComponent } from "./vacancy-edit-page.component";

describe("VacancyEditPageComponent", () => {
  let component: VacancyEditPageComponent;
  let fixture: ComponentFixture<VacancyEditPageComponent>;

  beforeEach(async () => {
    const vacanciesServiceSpy = jasmine.createSpyObj("VacanciesService", [
      "byId",
      "create",
      "update",
      "delete",
    ]);
    const companiesServiceSpy = jasmine.createSpyObj("CompaniesService", [
      "all",
    ]);
    companiesServiceSpy.all.and.returnValue(
      of({
        results: [],
        totalItems: 0,
        page: 1,
        pageSize: 50,
        totalPages: 0,
      } as any),
    );

    await TestBed.configureTestingModule({
      declarations: [VacancyEditPageComponent],
      imports: [...mostUsedImports],
      providers: [
        ...testUtilStubs.filter(
          (provider) => provider.provide !== ActivatedRoute,
        ),
        ...mostUsedServices,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({}) },
            queryParams: of({}),
          },
        },
        { provide: VacanciesService, useValue: vacanciesServiceSpy },
        { provide: CompaniesService, useValue: companiesServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(VacancyEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("starts in create mode with a Draft-status form", () => {
    expect(component.isEdit).toBeFalse();
    expect(component.loading).toBeFalse();
    expect(component.form).toBeTruthy();
    expect(component.form!.get("status")!.value).toBe(VacancyStatus.Draft);
  });
});
