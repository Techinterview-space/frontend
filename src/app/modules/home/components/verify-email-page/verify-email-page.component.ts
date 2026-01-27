import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TitleService } from "@services/title.service";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { AuthService } from "@shared/services/auth/auth.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";

@Component({
  selector: "app-verify-email-page",
  templateUrl: "./verify-email-page.component.html",
  styleUrls: ["./verify-email-page.component.scss"],
  standalone: false,
})
export class VerifyEmailPageComponent implements OnInit, OnDestroy {
  isLoading = true;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  email = "";
  canResend = false;
  isResending = false;

  constructor(
    private readonly titleService: TitleService,
    private readonly alertService: AlertService,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly http: HttpClient,
  ) {
    this.titleService.setTitle("Verify Email");
  }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParams["token"];
    if (token) {
      this.verifyEmail(token);
    } else {
      this.isLoading = false;
      this.errorMessage = "Invalid verification link.";
      this.canResend = true;
    }
  }

  private verifyEmail(token: string): void {
    this.http
      .get<{ success: boolean; message: string }>(
        `${environment.resourceApiURI}/api/auth/verify-email/${token}`,
      )
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.successMessage =
            "Email verified successfully! Redirecting to sign in...";
          setTimeout(() => {
            this.router.navigate(["/login"], {
              queryParams: { verified: "true" },
            });
          }, 2000);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage =
            err.error?.message ||
            "Verification failed. The link may have expired.";
          this.canResend = true;
        },
      });
  }

  resendVerification(): void {
    if (!this.isEmailValid()) {
      this.alertService.warn("Please enter a valid email address");
      return;
    }

    this.isResending = true;

    this.authService
      .resendVerification(this.email)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (response) => {
          this.isResending = false;
          this.alertService.success(
            response.message || "Verification email sent!",
          );
          this.errorMessage = null;
          this.successMessage =
            "A new verification email has been sent. Please check your inbox.";
        },
        error: (err) => {
          this.isResending = false;
          this.alertService.error(
            err.error?.message || "Failed to resend verification email.",
          );
        },
      });
  }

  isEmailValid(): boolean {
    return (
      this.email.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)
    );
  }

  ngOnDestroy(): void {
    this.titleService.resetTitle();
  }
}
