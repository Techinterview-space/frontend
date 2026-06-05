import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";

import { MyVacanciesPageComponent } from "./my-vacancies-page.component";
import { VacanciesService } from "@services/vacancies.service";

describe("MyVacanciesPageComponent", () => {
  let component: MyVacanciesPageComponent;
  let fixture: ComponentFixture<MyVacanciesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyVacanciesPageComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, VacanciesService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVacanciesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
