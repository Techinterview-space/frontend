import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { NotFoundErrorComponent } from "./not-found-error.component";

describe("NotFoundErrorComponent", () => {
  let component: NotFoundErrorComponent;
  let fixture: ComponentFixture<NotFoundErrorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NotFoundErrorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
