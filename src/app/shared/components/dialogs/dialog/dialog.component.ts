import { Component, Input, Output, EventEmitter } from "@angular/core";
import { DialogModalCallToAction } from "./dialog-modal-call-to-action";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
  standalone: false,
})
export class DialogComponent {
  @Input()
  show = false;

  @Input()
  header: string | null = null;

  @Input()
  callToAction: DialogModalCallToAction | null = null;

  @Input()
  additionalCss = "";

  @Output()
  closed: EventEmitter<void> = new EventEmitter();

  close(): void {
    this.show = false;
    this.closed.next();
  }

  onCallToActionClick(): void {
    const close = this.callToAction?.onClick() ?? true;

    if (close) {
      this.close();
    }
  }
}
