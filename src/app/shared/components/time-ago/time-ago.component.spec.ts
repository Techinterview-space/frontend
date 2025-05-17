import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TimeAgoComponent } from "./time-ago.component";

describe("TimeAgoComponent", () => {
  let component: TimeAgoComponent;
  let fixture: ComponentFixture<TimeAgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeAgoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeAgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
