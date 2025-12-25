import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppSpinnerComponent } from "./app-spinner.component";
import { SpinnerService } from "@shared/services/spinners/spinner-service";
import { BehaviorSubject } from "rxjs";

describe("AppSpinnerComponent", () => {
  let component: AppSpinnerComponent;
  let fixture: ComponentFixture<AppSpinnerComponent>;
  let spinnerService: jasmine.SpyObj<SpinnerService>;
  let visibilitySubject: BehaviorSubject<boolean>;

  beforeEach(async () => {
    visibilitySubject = new BehaviorSubject<boolean>(false);
    spinnerService = jasmine.createSpyObj("SpinnerService", ["getVisibility$"]);
    spinnerService.getVisibility$.and.returnValue(visibilitySubject.asObservable());

    await TestBed.configureTestingModule({
      declarations: [AppSpinnerComponent],
      providers: [{ provide: SpinnerService, useValue: spinnerService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppSpinnerComponent);
    component = fixture.componentInstance;
    component.name = "test";
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should show spinner when visible", () => {
    visibilitySubject.next(true);
    fixture.detectChanges();
    expect(component.isVisible).toBe(true);
  });

  it("should hide spinner when not visible", () => {
    visibilitySubject.next(false);
    fixture.detectChanges();
    expect(component.isVisible).toBe(false);
  });
});

