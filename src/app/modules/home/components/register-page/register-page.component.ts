import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { TitleService } from "@services/title.service";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { RegisterRequest } from "@services/auth-api.service";
import { AuthService } from "@shared/services/auth/auth.service";

@Component({
  selector: "app-register-page",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.scss"],
  standalone: false,
})
export class RegisterPageComponent implements OnDestroy {
  email = "";
  password = "";
  confirmPassword = "";
  firstName = "";
  lastName = "";
  acceptTerms = false;
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;
  successMessage: string | null = null;

  constructor(
    private readonly titleService: TitleService,
    private readonly alertService: AlertService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.titleService.setTitle("Create Account");
  }

  register(): void {
    if (!this.isFormValid()) {
      this.alertService.warn("Please fill in all fields correctly");
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.alertService.warn("Passwords do not match");
      return;
    }

    if (!this.acceptTerms) {
      this.alertService.warn("Please accept the terms and conditions");
      return;
    }

    this.isLoading = true;

    const request: RegisterRequest = {
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
    };

    this.authService
      .register(request)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.successMessage =
            response.message ||
            "Registration successful! Please check your email to verify your account.";
        },
        error: (err) => {
          this.isLoading = false;
          const message =
            err.error?.message || "Registration failed. Please try again.";
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

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  isFormValid(): boolean {
    return (
      this.email.trim() !== "" &&
      this.password.trim() !== "" &&
      this.confirmPassword.trim() !== "" &&
      this.firstName.trim() !== "" &&
      this.lastName.trim() !== "" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email) &&
      this.password.length >= 8 &&
      this.isPasswordStrong()
    );
  }

  isPasswordStrong(): boolean {
    const hasLower = /[a-z]/.test(this.password);
    const hasUpper = /[A-Z]/.test(this.password);
    const hasDigit = /\d/.test(this.password);
    return hasLower && hasUpper && hasDigit;
  }

  getPasswordStrength(): "weak" | "medium" | "strong" {
    if (this.password.length < 8) return "weak";
    const hasLower = /[a-z]/.test(this.password);
    const hasUpper = /[A-Z]/.test(this.password);
    const hasDigit = /\d/.test(this.password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(this.password);
    const score = [hasLower, hasUpper, hasDigit, hasSpecial].filter(Boolean).length;
    if (score >= 4 && this.password.length >= 12) return "strong";
    if (score >= 3) return "medium";
    return "weak";
  }

  ngOnDestroy(): void {
    this.titleService.resetTitle();
  }
}
