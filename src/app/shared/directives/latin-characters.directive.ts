import { ElementRef, HostListener, Directive } from "@angular/core";

@Directive({
  selector: "[appLatin]",
  standalone: false,
})
export class LatinCharactersDirective {
  // Allow decimal numbers and latin characters values
  private readonly regex = new RegExp(/^[a-zA-Z0-9$@$!%*?&#^-_. +]+$/);

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

  constructor(private el: ElementRef) {}

  @HostListener("keydown", ["$event"]) onKeyDown(event: KeyboardEvent): void {
    const current = this.el.nativeElement.value as string;
    const next = current.concat(event.key);

    if (this.isNotLatin(next)) {
      event.preventDefault();
    }
  }

  // public is for test purposes
  isSpecialKey(event: KeyboardEvent): boolean {
    return this.specialKeys.indexOf(event.key) !== -1;
  }

  // public is for test purposes
  isNotLatin(value: string): boolean {
    return value != null && value !== "" && !String(value).match(this.regex);
  }
}
