import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";

import { CompanyReviewBlockComponent } from "./company-review-block.component";

describe("CompanyReviewBlockComponent", () => {
  let component: CompanyReviewBlockComponent;
  let fixture: ComponentFixture<CompanyReviewBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyReviewBlockComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyReviewBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
