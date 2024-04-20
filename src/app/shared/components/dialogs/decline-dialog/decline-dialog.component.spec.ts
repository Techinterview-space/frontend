import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { DeclineDialogComponent } from "@shared/components/dialogs/decline-dialog/decline-dialog.component";
import { DialogMessage } from "../models/dialog-message";
import { DeclineFormMsg } from "../models/decline-msg";
import { DeclineForm } from "../models/decline-form";

describe("DeclineDialogComponent", () => {
  let component: DeclineDialogComponent;
  let fixture: ComponentFixture<DeclineDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DeclineDialogComponent],
      providers: [DeclineDialogComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclineDialogComponent);
    component = fixture.componentInstance;
    component.message = new DialogMessage(
      new DeclineFormMsg("Ololo", "Text", new DeclineForm(), () => {})
    );

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
