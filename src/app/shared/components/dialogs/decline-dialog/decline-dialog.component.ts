import { Component, Input } from "@angular/core";
import { DeclineFormMsg } from "@shared/components/dialogs/models/decline-msg";
import { DialogMessage } from "@shared/components/dialogs/models/dialog-message";
import Assertion from "@shared/validation/assertion";
import { DeclineForm } from "../models/decline-form";

@Component({
    selector: "app-decline-dialog",
    templateUrl: "./decline-dialog.component.html",
    styleUrls: ["./decline-dialog.component.scss"],
    standalone: false
})
export class DeclineDialogComponent {
  get showModal(): boolean {
    return this.message != null;
  }

  get text(): string | null {
    return this.showModal ? this.message!.message.text : null;
  }

  get declineForm(): DeclineForm | null {
    return this.showModal ? this.message!.message.declineForm : null;
  }

  @Input()
  message: DialogMessage<DeclineFormMsg> | null = null;

  get messageSubject(): string {
    return this.message?.subject ?? "";
  }

  decline(): void {
    Assertion.notNull(this.message, "message");
    this.message!.message.declineForm.markAllAsTouched();
    if (this.message!.message.declineForm.valid) {
      this.message!.message.confirm();
      this.message = null;
    }
  }

  close(): void {
    Assertion.notNull(this.message, "message");
    this.message!.close();
    this.message = null;
  }
}
