import { Directive, forwardRef, Input } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appYearRange]',
  providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => YearRangeValidator), multi: true }]
})
export class YearRangeValidator implements Validator {
  @Input() min: number | null = null;
  @Input() max: number | null = null;

  validate(c: AbstractControl): ValidationErrors | null {
    if (c != null && c.value != null) {
      const year = Number(c.value);
      if (!isNaN(year)) {
        if (this.checkIfYearRangeInvalid(year)) {
          return {
            yearRange: true,
            yearRangeError: `Year should be in range ${this.min} to  ${this.max}`
          };
        }
      }

      return null;
    }

    return null;
  }

  public checkIfYearRangeInvalid(year: number): boolean {
    if (!isNaN(this.min!) && !isNaN(this.max!)) {
      return this.min! > year || this.max! < year;
    }
    return false;
  }
}
