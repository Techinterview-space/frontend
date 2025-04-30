import { Component, Input } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-go-back-button",
  templateUrl: "./go-back-button.component.html",
  styleUrls: ["./go-back-button.component.scss"],
  standalone: false,
})
export class GoBackButtonComponent {
  @Input()
  text: string = "Назад";

  @Input()
  routerLink: string = "";

  constructor(
    private readonly location: Location,
    private readonly router: Router,
  ) {}

  goBack(): void {
    if (this.routerLink) {
      this.router.navigate([this.routerLink]);
    } else {
      this.location.back();
    }
  }
}
