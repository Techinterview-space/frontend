import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";

import { NoPermissionComponent } from "./no-permission.component";

describe("NoPermissionComponent", () => {
  let component: NoPermissionComponent;
  let fixture: ComponentFixture<NoPermissionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NoPermissionComponent],
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
