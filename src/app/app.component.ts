import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./shared/services/auth/auth.service";
import { untilDestroyed } from "./shared/subscriptions/until-destroyed";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: false,
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  title = "Techinterview.space";

  get showAdminNavbar(): boolean {
    return this.router.url.startsWith("/admin");
  }

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
