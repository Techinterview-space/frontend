import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { UnsibscribeMeComponent } from "./unsubscribe-me.component";

describe("UnsibscribeMeComponent", () => {
  let component: UnsibscribeMeComponent;
  let fixture: ComponentFixture<UnsibscribeMeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UnsibscribeMeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsibscribeMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
