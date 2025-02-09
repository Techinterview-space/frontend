import { Directive, forwardRef, Attribute } from "@angular/core";
import { Validator, AbstractControl, NG_VALIDATORS } from "@angular/forms";
import Assertion from "@shared/validation/assertion";

@Directive({
    selector: "[appDateRange]",
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => DateRangeValidator),
            multi: true,
        },
    ],
    standalone: false
})
export class DateRangeValidator implements Validator {
  constructor(@Attribute("appDateRange") public validateDateRange: string) {
    Assertion.notNull(validateDateRange, "validateDateRange");
  }

  validate(c: AbstractControl): { [key: string]: any } | null {
    let to;
    let from;

    const control = c.root.get(this.validateDateRange);
    if (control == null) {
      throw Error("Control is null");
    }

    if (control.errors != null && control.errors["dateRange"]) {
      control.setErrors(null);
    }
    if (
      this.validateDateRange === "startDate" ||
      this.validateDateRange === "from"
    ) {
      to = c.value;
      from = control.value;
    }
    if (
      this.validateDateRange === "endDate" ||
      this.validateDateRange === "to"
    ) {
      from = c.value;
      to = control.value;
    }
    if (to != null && from != null) {
      const startDate = new Date(from.month + "/" + from.day + "/" + from.year);
      const endDate = new Date(to.month + "/" + to.day + "/" + to.year);

      if (this.checkIfDateRangeInvalid(startDate, endDate)) {
        return {
          dateRange: true,
        };
      }
    }

    return null;
  }

  public checkIfDateRangeInvalid(startDate: Date, endDate: Date): boolean {
    return endDate < startDate;
  }
}
