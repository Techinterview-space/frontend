import { Component, Input } from "@angular/core";
import { ConfirmMsg } from "@shared/components/dialogs/models/confirm-msg";
import { DialogMessage } from "@shared/components/dialogs/models/dialog-message";

@Component({
    selector: "app-confirm-dialog",
    templateUrl: "./confirm-dialog.component.html",
    styleUrls: ["./confirm-dialog.component.scss"],
    standalone: false
})
export class ConfirmDialogComponent {
  get showModal(): boolean {
    return this.message != null;
  }

  get text(): string | null {
    return this.message != null ? this.message.message.text : null;
  }

  @Input()
  message: DialogMessage<ConfirmMsg> | null = null;

  @Input()
  yesButtonCss = "outline-danger";

  @Input()
  noButtonCss = "outline-secondary";

  confirm(): void {
    this.message!.message.confirm();
    this.message = null;
  }

  close(): void {
    this.message!.close();
    this.message = null;
  }
}
