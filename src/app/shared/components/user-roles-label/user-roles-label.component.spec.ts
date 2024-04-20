import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UserRolesLabelComponent } from "./user-roles-label.component";

describe("UserRolesLabelComponent", () => {
  let component: UserRolesLabelComponent;
  let fixture: ComponentFixture<UserRolesLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserRolesLabelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRolesLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
