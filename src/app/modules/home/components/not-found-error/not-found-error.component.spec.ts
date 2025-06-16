import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { NotFoundErrorComponent } from "./not-found-error.component";
import { mostUsedImports } from "@shared/test-utils";
import { mostUsedServices, testUtilStubs } from "@shared/test-utils";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("NotFoundErrorComponent", () => {
  let component: NotFoundErrorComponent;
  let fixture: ComponentFixture<NotFoundErrorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NotFoundErrorComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
