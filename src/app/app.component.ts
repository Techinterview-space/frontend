import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: false,
})
export class AppComponent {
  get showAdminNavbar(): boolean {
    return this.router.url.startsWith("/admin");
  }

  constructor(private readonly router: Router) {}
}
