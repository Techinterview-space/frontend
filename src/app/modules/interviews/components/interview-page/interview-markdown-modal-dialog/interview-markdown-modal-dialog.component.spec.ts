import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InterviewMarkdownModalDialogComponent } from "./interview-markdown-modal-dialog.component";

describe("InterviewMarkdownModalDialogComponent", () => {
  let component: InterviewMarkdownModalDialogComponent;
  let fixture: ComponentFixture<InterviewMarkdownModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterviewMarkdownModalDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewMarkdownModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
