import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PublicSurveysService } from "@services/public-surveys.service";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";

import { MySurveysPageComponent } from "./my-surveys-page.component";

describe("MySurveysPageComponent", () => {
  let component: MySurveysPageComponent;
  let fixture: ComponentFixture<MySurveysPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MySurveysPageComponent],
      imports: [...mostUsedImports],
      providers: [
        ...testUtilStubs,
        ...mostUsedServices,
        PublicSurveysService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MySurveysPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
