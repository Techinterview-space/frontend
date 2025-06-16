import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";

import { NotAuthorizedErrorComponent } from "./not-authorized-error.component";
import { mostUsedImports } from "@shared/test-utils";
import { mostUsedServices, testUtilStubs } from "@shared/test-utils";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("NotAuthorizedErrorComponent", () => {
  let component: NotAuthorizedErrorComponent;
  let fixture: ComponentFixture<NotAuthorizedErrorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NotAuthorizedErrorComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotAuthorizedErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
