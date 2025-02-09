import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "app-submit-button",
    templateUrl: "./submit-button.component.html",
    styleUrls: ["./submit-button.component.scss"],
    standalone: false
})
export class SubmitButtonComponent {
  @Input()
  css = "btn btn-primary btn-block";

  @Input()
  title = "";

  @Input()
  additionalCss = "";

  waitingResponse = false;
  timeout: NodeJS.Timeout | null = null;

  @Output() btnSubmit = new EventEmitter<void>();

  preventDoubleSubmit(): void {
    this.waitingResponse = true;

    this.btnSubmit.emit();

    // the value of 3000 is a random value. We think that each webrequest would be executed within the 3 seconds.
    this.timeout = setTimeout(() => {
      this.waitingResponse = false;
    }, 1200);
  }
}
