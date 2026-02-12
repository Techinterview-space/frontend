import { Directive, HostBinding } from "@angular/core";

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: "a[target=_blank]",
  standalone: false,
})
export class ExternalLinkDirective {
  @HostBinding("attr.rel")
  get relAttr(): string {
    return "noopener noreferrer";
  }
}
