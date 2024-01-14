import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserRole } from '@models/enums';
import { ApplicationUserExtended } from '@models/extended';
import { HealthCheckService } from '@shared/health-check/health-check.service';
import { AuthService } from '@shared/services/auth/auth.service';
import { SpinnerService } from '@shared/services/spinners/spinner-service';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';

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
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
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
    private readonly spinner: SpinnerService,
    private readonly healthService: HealthCheckService
  ) {}

  ngOnInit(): void {
    this.setupSubscribers();
    this.authService
      .getCurrentUser()
      //.pipe(untilDestroyed(this))
      .subscribe((currentUser) => {
        if (currentUser != null) {
          this.currentUser = currentUser;
        }

        this.renderNavbar();
      });

    this.healthService
      .appHealth()
      .pipe(untilDestroyed(this))
      .subscribe(
        (result) => {
          this.loginButtonAvailable = true;
        },
        (err) => {
          console.error(err);
          this.healthCheckError = true;
        }
      );
  }

  private setupSubscribers(): void {
    this.authService.loggedOutInvoked$.pipe(untilDestroyed(this)).subscribe(() => {
      this.currentUser = null;
      this.renderNavbar();
    });

    this.authService.loggedOut$.pipe(untilDestroyed(this)).subscribe(() => {
      this.currentUser = null;
      this.renderNavbar();
    });

    this.authService.loggedIn$.pipe(untilDestroyed(this)).subscribe((user) => {
      this.currentUser = user;
      this.renderNavbar();
    });
  }

  private renderNavbar(): void {
    const hasCurrentUser = this.currentUser != null;

    this.dropdowns = [
      {
        title: 'Interviews',
        show: hasCurrentUser && this.currentUser!.hasRole(UserRole.Interviewer),
        links: [
          {
            title: 'Start an interview',
            url: '/interviews/create',
            show: true
          },
          {
            title: 'My interviews',
            url: '/interviews/my',
            show: true
          }
        ]
      },
      {
        title: 'Templates',
        show: true,
        links: [
          {
            title: 'Create a template',
            url: '/interviews/templates/create',
            show: hasCurrentUser && this.currentUser!.hasRole(UserRole.Interviewer)
          },
          {
            title: 'My templates',
            url: '/interviews/templates/my',
            show: hasCurrentUser && this.currentUser!.hasRole(UserRole.Interviewer)
          },
          {
            title: 'Public templates',
            url: '/interviews/templates/public',
            show: true
          }
        ]
      },
      {
        title: 'Salaries',
        show: true,
        links: [
          {
            title: 'Salaries chart',
            url: '/salaries',
            show: true
          },
        ]
      }
    ];

    if (hasCurrentUser && this.currentUser!.organizations.length === 1) {
      const orgName = this.currentUser!.organizations[0].organization.name;
      const organizationId = this.currentUser!.organizations[0].organizationId;

      this.dropdowns.push({
        title: orgName,
        show: true,
        links: [
          {
            title: 'Open organization',
            url: `/organizations/${organizationId}`,
            show: true
          },
          {
            title: 'Recruitment pipeline board',
            url: `/boards/${organizationId}/recruitment-pipeline`,
            show: true
          },
          {
            title: 'Interviews',
            url: `/organizations/${organizationId}/interviews`,
            show: true
          },
          {
            title: 'Interview templates',
            url: `/organizations/${organizationId}/interview-templates`,
            show: true
          },
          {
            title: 'Candidate cards',
            url: `/organizations/${organizationId}/candidate-cards`,
            show: true
          },
          {
            title: 'Candidates',
            url: `/organizations/${organizationId}/candidates`,
            show: true
          },
          {
            title: 'Labels',
            url: `/organizations/${organizationId}/labels`,
            show: true
          }
        ]
      });
    }
  }

  ngOnDestroy(): void {}

  login(): void {
    if (!this.loginButtonAvailable) {
      return;
    }

    this.spinner.showTimer();
    this.authService.login().then();
  }

  logout(): void {
    this.spinner.showTimer();
    this.authService.signout();
  }
}
