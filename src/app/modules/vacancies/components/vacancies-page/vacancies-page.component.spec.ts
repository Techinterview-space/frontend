import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { Subject, of } from "rxjs";
import {
  mostUsedImports,
  mostUsedServices,
  testUtilStubs,
} from "@shared/test-utils";
import { VacanciesService } from "@services/vacancies.service";
import { MetaTagService } from "@services/meta-tags.service";

import { VacanciesPageComponent } from "./vacancies-page.component";

describe("VacanciesPageComponent", () => {
  let component: VacanciesPageComponent;
  let fixture: ComponentFixture<VacanciesPageComponent>;
  let queryParams$: Subject<any>;
  let mockActivatedRoute: any;
  let vacanciesServiceSpy: jasmine.SpyObj<VacanciesService>;

  const pageResult = {
    results: [],
    totalItems: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0,
  } as any;

  beforeEach(async () => {
    queryParams$ = new Subject<any>();
    mockActivatedRoute = {
      queryParams: queryParams$.asObservable(),
      snapshot: { queryParams: {} },
      paramMap: of(new Map()),
      data: of({}),
      fragment: of(null),
    };
    vacanciesServiceSpy = jasmine.createSpyObj("VacanciesService", ["search"]);
    vacanciesServiceSpy.search.and.returnValue(of(pageResult));
    const metaSpy = jasmine.createSpyObj("MetaTagService", [
      "setPageMetaTags",
      "returnDefaultMetaTags",
    ]);

    await TestBed.configureTestingModule({
      declarations: [VacanciesPageComponent],
      imports: [...mostUsedImports],
      providers: [
        ...testUtilStubs.filter(
          (provider) => provider.provide !== ActivatedRoute,
        ),
        ...mostUsedServices,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: VacanciesService, useValue: vacanciesServiceSpy },
        { provide: MetaTagService, useValue: metaSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(VacanciesPageComponent);
    component = fixture.componentInstance;
    // ngOnInit subscribes to queryParams; the Subject has no initial value, so
    // no load happens until a test emits.
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("clamps a non-numeric page param to 1", () => {
    queryParams$.next({ page: "abc" });

    expect(component.currentPage).toBe(1);
    expect(vacanciesServiceSpy.search).toHaveBeenCalledWith(
      jasmine.objectContaining({ page: 1 }),
    );
  });

  it("clamps a page below 1 to 1", () => {
    queryParams$.next({ page: "0" });

    expect(component.currentPage).toBe(1);
  });

  it("does not skip the next queryParams change after clearing with no active params", () => {
    // snapshot.queryParams is empty, so clearSearch must not arm the skip-flag.
    component.clearSearch();
    vacanciesServiceSpy.search.calls.reset();

    queryParams$.next({ page: "2" });

    expect(component.currentPage).toBe(2);
    expect(vacanciesServiceSpy.search).toHaveBeenCalledWith(
      jasmine.objectContaining({ page: 2 }),
    );
  });
});
