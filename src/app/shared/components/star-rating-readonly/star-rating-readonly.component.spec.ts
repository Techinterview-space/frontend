import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StarRatingReadonlyComponent } from "./star-rating-readonly.component";

describe("StarRatingReadonlyComponent", () => {
  let component: StarRatingReadonlyComponent;
  let fixture: ComponentFixture<StarRatingReadonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StarRatingReadonlyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarRatingReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
