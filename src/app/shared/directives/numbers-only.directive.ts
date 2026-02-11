import { ElementRef, HostListener, Directive } from "@angular/core";

@Directive({
  selector: "[appOnlyNumber]",
  standalone: false,
})
// soure: https://www.bennettnotes.com/angular-4-input-numbers-directive/
export class OnlyNumberDirective {
  // Allow decimal numbers and negative values
  private readonly onlyDigitsRegex = new RegExp(/^-?[0-9]+(\.[0-9]*){0,1}$/g);

  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = [
    "Backspace",
    "Tab",
    "End",
    "Home",
    "Delete",
    "Down",
    "ArrowDown",
    "Up",
    "ArrowUp",
    "Left",
    "ArrowLeft",
    "Right",
    "ArrowRight",
  ];

  constructor(private el: ElementRef | null) {}

  @HostListener("keydown", ["$event"]) onKeyDown(event: KeyboardEvent): void {
    // Allow Backspace, tab, end, and home keys
    if (this.isSpecialKey(event)) {
      return;
    }

    const current = this.el!.nativeElement.value as string;
    const next = current.concat(event.key);

    if (!this.isDigit(next)) {
      event.preventDefault();
    }
  }

  // public is for test purposes
  isSpecialKey(event: KeyboardEvent): boolean {
    return this.specialKeys.indexOf(event.key) !== -1;
  }

  // public is for test purposes
  isDigit(value: string): boolean {
    if (value == null || value === "") {
      return false;
    }

    return value.match(this.onlyDigitsRegex) != null;
  }
}
