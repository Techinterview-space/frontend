import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PrivacyPolicyPageComponent } from "./privacy-policy-page.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  mostUsedImports,
  mostUsedServices,
  testUtilStubs,
} from "@shared/test-utils";

describe("PrivacyPolicyPageComponent", () => {
  let component: PrivacyPolicyPageComponent;
  let fixture: ComponentFixture<PrivacyPolicyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrivacyPolicyPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyPolicyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
