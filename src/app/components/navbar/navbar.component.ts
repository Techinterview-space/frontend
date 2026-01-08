import { Component, OnDestroy, OnInit, HostListener, ElementRef } from "@angular/core";
import { UserRole } from "@models/enums";
import { ApplicationUserExtended } from "@models/extended";
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
  standalone: false,
})
export class NavbarComponent implements OnInit, OnDestroy {
  loginButtonAvailable = false;
  healthCheckError = false;
  mobileMenuOpen = false;
  openDropdownIndex: number | null = null;

  dropdowns: NavbarDropdown[] = [];

  get loginName(): string | null {
    return this.currentUser?.fullName ?? null;
  }

  get visibleDropdowns(): NavbarDropdown[] {
    return this.dropdowns.filter((dropdown) => dropdown.show);
  }

  private currentUser: ApplicationUserExtended | null = null;

  constructor(
    private readonly authService: AuthService,
    private readonly spinner: SpinnerService,
    private readonly elementRef: ElementRef,
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

  ngOnDestroy(): void {}

  login(): void {
    this.spinner.showTimer();
    this.authService.login().pipe(untilDestroyed(this)).subscribe();
  }

  logout(): void {
    this.spinner.showTimer();
    this.authService.signout();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleDropdown(index: number): void {
    this.openDropdownIndex = this.openDropdownIndex === index ? null : index;
  }

  closeDropdowns(): void {
    this.openDropdownIndex = null;
  }

  isDropdownOpen(index: number): boolean {
    return this.openDropdownIndex === index;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInsideComponent = this.elementRef.nativeElement.contains(target);
    const clickedInsideDropdown = target.closest('.dropdown-container');

    // Close dropdown if:
    // 1. Click was outside this component entirely, OR
    // 2. Click was inside this component but outside any dropdown-container
    if (this.openDropdownIndex !== null &&
        (!clickedInsideComponent || (clickedInsideComponent && !clickedInsideDropdown))) {
      this.closeDropdowns();
    }
  }
}
