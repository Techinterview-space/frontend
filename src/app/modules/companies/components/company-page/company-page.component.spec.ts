import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InterviewsService } from "@services/interviews.service";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";

import { CompanyPageComponent } from "./company-page.component";
import { CompaniesService } from "@services/companies.service";
import { Router } from "@angular/router";

class RouterMock {
  getCurrentNavigation() {
    return { extras: { state: { message: "msg" } } };
  }
}

describe("CompanyPageComponent", () => {
  let component: CompanyPageComponent;
  let fixture: ComponentFixture<CompanyPageComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyPageComponent],
      imports: [...mostUsedImports],
      providers: [
        ...testUtilStubs,
        ...mostUsedServices,
        CompaniesService,
        { provide: Router, useClass: RouterMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
