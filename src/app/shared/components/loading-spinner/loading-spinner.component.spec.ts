import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";

import { LoadingSpinnerComponent } from "./loading-spinner.component";

describe("LoadingSpinnerComponent", () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingSpinnerComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("delays gif request until threshold", fakeAsync(() => {
    component.ngOnDestroy();
    component.delayMs = 500;
    component.loadingUrl = "";

    component.ngOnInit();
    tick(499);
    expect(component.loadingUrl).toBe("");

    tick(1);
    expect(component.loadingUrl).not.toBe("");

    component.ngOnDestroy();
  }));
});
