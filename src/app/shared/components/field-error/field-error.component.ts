import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, AbstractControl, ValidationErrors } from "@angular/forms";

@Component({
  selector: "app-field-error",
  templateUrl: "./field-error.component.html",
  styleUrls: ["./field-error.component.scss"],
})
export class FieldErrorComponent implements OnInit {
  @Input() field: AbstractControl | null = null;
  @Input() max: string | number | null = null;
  @Input() min: string | number | null = null;

  constructor() {}

  ngOnInit(): void {}

  get shouldShowError(): boolean {
    if (this.field == null) {
      return false;
    }

    return this.tryReturnValid();
  }

  get errors(): ValidationErrors | null {
    return this.field?.errors ?? null;
  }

  private tryReturnValid(): boolean {
    try {
      return (
        this.field != null &&
        this.field.invalid &&
        (this.field.dirty || this.field.touched)
      );
    } catch (e) {
      throw Error("Cannot get valid property from the field");
    }
  }
}
