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

  it("does not request gif by default", fakeAsync(() => {
    component.ngOnDestroy();
    component.showGif = false;
    component.loadingUrl = "";

    component.ngOnInit();
    tick(2000);
    expect(component.loadingUrl).toBe("");

    component.ngOnDestroy();
  }));

  it("delays gif request until threshold when enabled", fakeAsync(() => {
    component.ngOnDestroy();
    component.showGif = true;
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
