import { NO_ERRORS_SCHEMA, PLATFORM_ID } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, convertToParamMap } from "@angular/router";
import { of } from "rxjs";
import {
  mostUsedImports,
  mostUsedServices,
  testUtilStubs,
} from "@shared/test-utils";
import { Vacancy, VacancyStatus } from "@models/vacancy.model";
import { VacanciesService } from "@services/vacancies.service";
import { MetaTagService } from "@services/meta-tags.service";

import { VacancyPageComponent } from "./vacancy-page.component";

function makeVacancy(overrides: Partial<Vacancy> = {}): Vacancy {
  return {
    id: "v1",
    title: "Backend Engineer",
    hrContact: null,
    description: "desc",
    status: VacancyStatus.Public,
    companyId: "c1",
    companyName: "Acme",
    companySlug: "acme",
    companyIsDeleted: false,
    // MockAuthService resolves the current user with id 1.
    authorId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    ...overrides,
  } as Vacancy;
}

describe("VacancyPageComponent", () => {
  let component: VacancyPageComponent;
  let fixture: ComponentFixture<VacancyPageComponent>;
  let mockActivatedRoute: any;
  let vacanciesServiceSpy: jasmine.SpyObj<VacanciesService>;

  function setup(): void {
    fixture = TestBed.createComponent(VacancyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  beforeEach(async () => {
    mockActivatedRoute = {
      data: of({ vacancyData: { vacancy: makeVacancy() } }),
      snapshot: { paramMap: convertToParamMap({ id: "v1" }) },
      paramMap: of(convertToParamMap({ id: "v1" })),
      queryParams: of({}),
    };
    vacanciesServiceSpy = jasmine.createSpyObj("VacanciesService", ["byId"]);
    const metaSpy = jasmine.createSpyObj("MetaTagService", [
      "setPageMetaTags",
      "returnDefaultMetaTags",
    ]);

    await TestBed.configureTestingModule({
      declarations: [VacancyPageComponent],
      imports: [...mostUsedImports],
      providers: [
        ...testUtilStubs.filter(
          (provider) => provider.provide !== ActivatedRoute,
        ),
        ...mostUsedServices,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: VacanciesService, useValue: vacanciesServiceSpy },
        { provide: MetaTagService, useValue: metaSpy },
        { provide: PLATFORM_ID, useValue: "browser" },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it("should create and render the resolved vacancy", () => {
    setup();

    expect(component).toBeTruthy();
    expect(component.vacancy?.id).toBe("v1");
    expect(component.notFound).toBeFalse();
  });

  it("allows editing for the owner of a non-deleted vacancy", () => {
    mockActivatedRoute.data = of({
      vacancyData: { vacancy: makeVacancy({ authorId: 1 }) },
    });

    setup();

    expect(component.canEdit).toBeTrue();
  });

  it("forbids editing for a non-owner", () => {
    mockActivatedRoute.data = of({
      vacancyData: { vacancy: makeVacancy({ authorId: 999 }) },
    });

    setup();

    expect(component.canEdit).toBeFalse();
  });

  it("forbids editing a deleted vacancy even for the owner", () => {
    mockActivatedRoute.data = of({
      vacancyData: {
        vacancy: makeVacancy({ authorId: 1, deletedAt: new Date() }),
      },
    });

    setup();

    expect(component.canEdit).toBeFalse();
  });

  it("re-fetches with auth in the browser when the resolver returns null", () => {
    mockActivatedRoute.data = of({ vacancyData: { vacancy: null } });
    vacanciesServiceSpy.byId.and.returnValue(of(makeVacancy({ id: "v2" })));

    setup();

    expect(vacanciesServiceSpy.byId).toHaveBeenCalledWith("v1");
    expect(component.vacancy?.id).toBe("v2");
    expect(component.notFound).toBeFalse();
  });
});
