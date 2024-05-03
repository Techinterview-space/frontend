import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GradeLabelComponent } from "./grade-label.component";

describe("GradeLabelComponent", () => {
  let component: GradeLabelComponent;
  let fixture: ComponentFixture<GradeLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GradeLabelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
