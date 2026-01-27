import { Component, OnDestroy } from "@angular/core";
import { TitleService } from "@services/title.service";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { AuthService } from "@shared/services/auth/auth.service";

@Component({
  selector: "app-forgot-password-page",
  templateUrl: "./forgot-password-page.component.html",
  styleUrls: ["./forgot-password-page.component.scss"],
  standalone: false,
})
export class ForgotPasswordPageComponent implements OnDestroy {
  email = "";
  isLoading = false;
  successMessage: string | null = null;

  constructor(
    private readonly titleService: TitleService,
    private readonly alertService: AlertService,
    private readonly authService: AuthService
  ) {
    this.titleService.setTitle("Forgot Password");
  }

  submit(): void {
    if (!this.isEmailValid()) {
      this.alertService.warn("Please enter a valid email address");
      return;
    }

    this.isLoading = true;
    this.successMessage = null;

    this.authService
      .forgotPassword(this.email)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.successMessage = response.message || "If an account exists with this email, you will receive a password reset link.";
        },
        error: (err) => {
          this.isLoading = false;
          // Don't reveal if email exists or not for security
          this.successMessage = "If an account exists with this email, you will receive a password reset link.";
        },
      });
  }

  isEmailValid(): boolean {
    return this.email.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
  }

  ngOnDestroy(): void {
    this.titleService.resetTitle();
  }
}
