import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ViewportScroller } from "@angular/common";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";

import { CompanyPageComponent } from "./company-page.component";
import { CompaniesService } from "@services/companies.service";
import { Router } from "@angular/router";
import { MetaTagService } from "@services/meta-tags.service";

class RouterMock {
  getCurrentNavigation() {
    return { extras: { state: { message: "msg" } } };
  }
}

describe("CompanyPageComponent", () => {
  let component: CompanyPageComponent;
  let fixture: ComponentFixture<CompanyPageComponent>;
  let router: Router;
  let mockViewportScroller: jasmine.SpyObj<ViewportScroller>;

  beforeEach(async () => {
    const viewportScrollerSpy = jasmine.createSpyObj("ViewportScroller", [
      "scrollToAnchor",
    ]);

    await TestBed.configureTestingModule({
      declarations: [CompanyPageComponent],
      imports: [...mostUsedImports],
      providers: [
        ...testUtilStubs,
        ...mostUsedServices,
        CompaniesService,
        MetaTagService,
        { provide: Router, useClass: RouterMock },
        { provide: ViewportScroller, useValue: viewportScrollerSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    mockViewportScroller = TestBed.inject(
      ViewportScroller,
    ) as jasmine.SpyObj<ViewportScroller>;
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
