import { Directive, HostBinding } from "@angular/core";

@Directive({
  selector: "a[target=_blank]",
  standalone: false,
})
export class ExternalLinkDirective {
  @HostBinding("attr.rel")
  get relAttr(): string {
    return "noopener noreferrer";
  }
}
