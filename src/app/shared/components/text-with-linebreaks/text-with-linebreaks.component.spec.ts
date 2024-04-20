import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TextWithLinebreaksComponent } from "./text-with-linebreaks.component";

describe("TextWithLinebreaksComponent", () => {
  let component: TextWithLinebreaksComponent;
  let fixture: ComponentFixture<TextWithLinebreaksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextWithLinebreaksComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextWithLinebreaksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
