import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";

import { VacanciesAdminPageComponent } from "./vacancies-admin-page.component";
import { VacanciesService } from "@services/vacancies.service";

describe("VacanciesAdminPageComponent", () => {
  let component: VacanciesAdminPageComponent;
  let fixture: ComponentFixture<VacanciesAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VacanciesAdminPageComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, VacanciesService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacanciesAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
