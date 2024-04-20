import { ComponentFixture, TestBed } from "@angular/core/testing";

import { VisibilityLabelComponent } from "./visibility-label.component";

describe("VisibilityLabelComponent", () => {
  let component: VisibilityLabelComponent;
  let fixture: ComponentFixture<VisibilityLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisibilityLabelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisibilityLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
