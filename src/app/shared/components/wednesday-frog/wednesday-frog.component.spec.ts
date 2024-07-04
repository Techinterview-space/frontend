import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { WednesdayFrogComponent } from "./wednesday-frog.component";

describe("WednesdayFrogComponent", () => {
  let component: WednesdayFrogComponent;
  let fixture: ComponentFixture<WednesdayFrogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WednesdayFrogComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WednesdayFrogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
