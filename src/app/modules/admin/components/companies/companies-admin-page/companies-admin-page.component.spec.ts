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
});
