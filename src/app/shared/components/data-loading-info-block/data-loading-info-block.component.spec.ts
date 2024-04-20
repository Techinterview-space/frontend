import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DataLoadingInfoBlockComponent } from "./data-loading-info-block.component";

describe("DataLoadingInfoBlockComponent", () => {
  let component: DataLoadingInfoBlockComponent;
  let fixture: ComponentFixture<DataLoadingInfoBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataLoadingInfoBlockComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataLoadingInfoBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
