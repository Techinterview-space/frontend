import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ThemeService } from "@shared/services/theme/theme.service";

@Component({
  selector: "app-navbar-actions",
  templateUrl: "./navbar-actions.component.html",
  styleUrls: ["./navbar-actions.component.scss"],
  standalone: false,
})
export class NavbarActionsComponent {
  @Input() loginName: string | null = null;
  @Input() loginButtonAvailable = false;

  @Output() loginClick = new EventEmitter<void>();
  @Output() logoutClick = new EventEmitter<void>();

  constructor(public readonly themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  login(): void {
    this.loginClick.emit();
  }

  logout(): void {
    this.logoutClick.emit();
  }
}