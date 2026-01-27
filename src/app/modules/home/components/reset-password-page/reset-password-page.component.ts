import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TitleService } from "@services/title.service";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { AuthService } from "@shared/services/auth/auth.service";

@Component({
  selector: "app-reset-password-page",
  templateUrl: "./reset-password-page.component.html",
  styleUrls: ["./reset-password-page.component.scss"],
  standalone: false,
})
export class ResetPasswordPageComponent implements OnInit, OnDestroy {
  token: string | null = null;
  newPassword = "";
  confirmPassword = "";
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private readonly titleService: TitleService,
    private readonly alertService: AlertService,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    this.titleService.setTitle("Reset Password");
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams["token"];
    if (!this.token) {
      this.errorMessage =
        "Invalid reset link. Please request a new password reset.";
    }
  }

  submit(): void {
    if (!this.token) {
      this.alertService.error("Invalid reset token");
      return;
    }

    if (!this.isFormValid()) {
      this.alertService.warn("Please fill in all fields correctly");
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.alertService.warn("Passwords do not match");
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.authService
      .resetPassword(this.token, this.newPassword)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.successMessage = "Password reset successfully!";
          setTimeout(() => {
            this.router.navigate(["/login"]);
          }, 2000);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage =
            err.error?.message ||
            "Failed to reset password. The link may have expired.";
        },
      });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  isFormValid(): boolean {
    return (
      this.newPassword.trim() !== "" &&
      this.confirmPassword.trim() !== "" &&
      this.newPassword.length >= 8 &&
      this.isPasswordStrong()
    );
  }

  isPasswordStrong(): boolean {
    const hasLower = /[a-z]/.test(this.newPassword);
    const hasUpper = /[A-Z]/.test(this.newPassword);
    const hasDigit = /\d/.test(this.newPassword);
    return hasLower && hasUpper && hasDigit;
  }

  getPasswordStrength(): "weak" | "medium" | "strong" {
    if (this.newPassword.length < 8) return "weak";
    const hasLower = /[a-z]/.test(this.newPassword);
    const hasUpper = /[A-Z]/.test(this.newPassword);
    const hasDigit = /\d/.test(this.newPassword);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(this.newPassword);
    const score = [hasLower, hasUpper, hasDigit, hasSpecial].filter(
      Boolean,
    ).length;
    if (score >= 4 && this.newPassword.length >= 12) return "strong";
    if (score >= 3) return "medium";
    return "weak";
  }

  ngOnDestroy(): void {
    this.titleService.resetTitle();
  }
}
