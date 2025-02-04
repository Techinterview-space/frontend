import { Component, OnDestroy, OnInit } from "@angular/core";
import { UserRole } from "@models/enums";
import { ApplicationUserExtended } from "@models/extended";
import { HealthCheckService } from "@shared/health-check/health-check.service";
import { AuthService } from "@shared/services/auth/auth.service";
import { SpinnerService } from "@shared/services/spinners/spinner-service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";

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
})
export class NavbarComponent implements OnInit, OnDestroy {
  loginButtonAvailable = false;
  healthCheckError = false;

  dropdowns: NavbarDropdown[] = [];

  get loginName(): string | null {
    return this.currentUser?.fullName ?? null;
  }

  private currentUser: ApplicationUserExtended | null = null;

  constructor(
    private readonly authService: AuthService,
    private readonly spinner: SpinnerService
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
        title: "Зарплаты",
        show: true,
        links: [
          {
            title: "Статистика по зарплатам",
            url: "/salaries",
            show: true,
          },
          {
            title: "Опрос о пользе статистики",
            url: "/salaries/survey",
            show: hasCurrentUser,
          },
          {
            title: "Исторические данные",
            url: "/salaries/historical-data",
            show: hasCurrentUser,
          },
        ],
      },
    ];
  }

  ngOnDestroy(): void {}

  login(): void {
    this.spinner.showTimer();
    this.authService.login().pipe(untilDestroyed(this)).subscribe();
  }

  logout(): void {
    this.spinner.showTimer();
    this.authService.signout();
  }
}
