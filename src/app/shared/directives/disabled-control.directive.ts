import { NgControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appDisableControl]'
})
// The directive is purposed to avoid warnings about 'disable' attribute and reactive form usage.
// The source: https://netbasal.com/disabling-form-controls-when-working-with-reactive-forms-in-angular-549dd7b42110
export class DisableControlDirective {
  @Input('appDisableControl') set disableControl(condition: boolean) {
    const action = condition ? 'disable' : 'enable';

    // angular 9 fix: https://stackoverflow.com/a/60317062
    if (this.ngControl?.control) {
      this.ngControl.control[action]();
    }
  }

  constructor(private ngControl: NgControl) {}
}
