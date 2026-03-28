import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { TitleService } from "@services/title.service";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { AuthService } from "@shared/services/auth/auth.service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
  standalone: false,
})
export class LoginPageComponent implements OnInit, OnDestroy {
  email = "";
  password = "";
  website = "";
  isLoading = false;
  showPassword = false;
  verifiedMessage = false;
  private formLoadedAt = 0;

  private readonly isBrowser: boolean;

  constructor(
    private readonly titleService: TitleService,
    private readonly alertService: AlertService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.titleService.setTitle("Sign In");
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.formLoadedAt = Date.now();
    }

    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/me"]);
      return;
    }

    this.route.queryParams.subscribe((params) => {
      if (params["verified"] === "true") {
        this.verifiedMessage = true;
        this.alertService.success(
          "Email verified successfully. You can now log in.",
        );
      }
    });
  }

  login(): void {
    if (!this.isFormValid()) {
      this.alertService.warn("Please fill in all fields with valid data");
      return;
    }

    this.isLoading = true;
    const elapsedSeconds = Math.floor((Date.now() - this.formLoadedAt) / 1000);

    this.authService
      .loginWithEmail(this.email, this.password, this.website, elapsedSeconds)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.authService
            .getCurrentUserFromBackend()
            .pipe(untilDestroyed(this))
            .subscribe({
              next: () => {
                this.router.navigate(["/me"]);
              },
              error: () => {
                this.router.navigate(["/me"]);
              },
            });
        },
        error: (err) => {
          this.isLoading = false;
          const message =
            err.error?.message ||
            "Login failed. Please check your credentials.";
          this.alertService.error(message);
        },
      });
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }

  loginWithGitHub(): void {
    this.authService.loginWithGithub();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  isFormValid(): boolean {
    return (
      this.email.trim() !== "" &&
      this.password.trim() !== "" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)
    );
  }

  ngOnDestroy(): void {
    this.titleService.resetTitle();
  }
}
