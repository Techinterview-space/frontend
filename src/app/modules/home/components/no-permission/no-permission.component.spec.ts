import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";

import { NoPermissionComponent } from "./no-permission.component";
import { mostUsedImports } from "@shared/test-utils";
import { mostUsedServices, testUtilStubs } from "@shared/test-utils";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("NoPermissionComponent", () => {
  let component: NoPermissionComponent;
  let fixture: ComponentFixture<NoPermissionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NoPermissionComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
