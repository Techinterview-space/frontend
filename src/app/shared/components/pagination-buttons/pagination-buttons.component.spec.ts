import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PaginationButtonsComponent } from "./pagination-buttons.component";

describe("PaginationButtonsComponent", () => {
  let component: PaginationButtonsComponent;
  let fixture: ComponentFixture<PaginationButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationButtonsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
