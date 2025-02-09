import { Component, Input } from "@angular/core";
import { ApplicationUser } from "@models/application-user";

@Component({
    selector: "app-user-link",
    templateUrl: "./user-link.component.html",
    standalone: false
})
export class UserLinkComponent {
  @Input()
  user: ApplicationUser | null = null;

  @Input()
  css = "";
}
