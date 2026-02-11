import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserRole } from "@models/enums";
import { ApplicationUserExtended } from "@models/extended";
import { AuthService } from "@shared/services/auth/auth.service";
import { ThemeService } from "@shared/services/theme/theme.service";

interface NavbarLink {
  title: string;
  url: string;
  show: boolean;
}

interface NavbarDropdown {
  title: string;
  links: NavbarLink[];
  show: boolean;
}

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  standalone: false,
})
export class NavbarComponent implements OnInit {
  loginButtonAvailable = false;
  healthCheckError = false;

  dropdowns: NavbarDropdown[] = [];

  get loginName(): string | null {
    return this.currentUser?.fullName ?? null;
  }

  private currentUser: ApplicationUserExtended | null = null;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    public readonly themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.setupSubscribers();
    this.loginButtonAvailable = true;

    this.authService.getCurrentUserFromStorage().subscribe((user) => {
      this.currentUser = user;
      this.renderNavbar();
    });
  }

  private setupSubscribers(): void {
    this.authService.loggedOutInvoked$.subscribe(() => {
      this.currentUser = null;
      this.renderNavbar();
    });

    this.authService.loggedOut$.subscribe(() => {
      this.currentUser = null;
      this.renderNavbar();
    });

    this.authService.loggedIn$.subscribe((user) => {
      this.currentUser = user;
      this.renderNavbar();
    });
  }

  private renderNavbar(): void {
    const hasCurrentUser = this.currentUser != null;

    this.dropdowns = [
      {
        title: "Заметки",
        show: hasCurrentUser && this.currentUser!.hasRole(UserRole.Interviewer),
        links: [
          {
            title: "Начать интервью",
            url: "/interviews/create",
            show: true,
          },
          {
            title: "Мои интервью",
            url: "/interviews/my",
            show: true,
          },
        ],
      },
      {
        title: "Шаблоны",
        show: true,
        links: [
          {
            title: "Создать шаблон",
            url: "/interviews/templates/create",
            show:
              hasCurrentUser && this.currentUser!.hasRole(UserRole.Interviewer),
          },
          {
            title: "Мои шаблоны",
            url: "/interviews/templates/my",
            show:
              hasCurrentUser && this.currentUser!.hasRole(UserRole.Interviewer),
          },
          {
            title: "Публичные шаблоны",
            url: "/interviews/templates/public",
            show: true,
          },
        ],
      },
      {
        title: "Отзывы",
        show: true,
        links: [
          {
            title: "Список компаний",
            url: "/companies",
            show: true,
          },
          {
            title: "Недавние отзывы",
            url: "/companies/recent-reviews",
            show: true,
          },
        ],
      },
      {
        title: "Зарплаты",
        show: true,
        links: [
          {
            title: "Статистика по зарплатам",
            url: "/salaries",
            show: true,
          },
          {
            title: "Исторические данные",
            url: "/salaries/historical-data",
            show: hasCurrentUser,
          },
          {
            title: "Курсы валют",
            url: "/salaries/currencies-chart",
            show: hasCurrentUser,
          },
        ],
      },
    ];
  }

  login(): void {
    this.router.navigate(["/login"]);
  }

  logout(): void {
    this.authService.signout();
    this.router.navigate(["/"]);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
