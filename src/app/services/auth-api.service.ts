import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";

export interface AuthTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export interface AuthResult {
  success: boolean;
  message: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  deviceInfo?: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthApiService {
  constructor(private readonly api: ApiService) {}

  register(request: RegisterRequest): Observable<AuthResult> {
    return this.api.post<AuthResult>("/api/auth/register", request);
  }

  login(request: LoginRequest): Observable<AuthTokenResponse> {
    return this.api.post<AuthTokenResponse>("/api/auth/login", {
      ...request,
      deviceInfo: this.getDeviceInfo(),
    });
  }

  forgotPassword(email: string): Observable<AuthResult> {
    return this.api.post<AuthResult>("/api/auth/forgot-password", { email });
  }

  resetPassword(token: string, newPassword: string): Observable<AuthResult> {
    return this.api.post<AuthResult>("/api/auth/reset-password", {
      token,
      newPassword,
    });
  }

  refreshToken(refreshToken: string): Observable<AuthTokenResponse> {
    return this.api.post<AuthTokenResponse>("/api/auth/refresh", {
      refreshToken,
      deviceInfo: this.getDeviceInfo(),
    });
  }

  logout(refreshToken: string): Observable<void> {
    return this.api.post<void>("/api/auth/logout", { refreshToken });
  }

  resendVerification(email: string): Observable<AuthResult> {
    return this.api.post<AuthResult>("/api/auth/resend-verification", {
      email,
    });
  }

  /**
   * Get the URL to initiate Google OAuth flow.
   * @param returnUrl - The frontend URL to redirect to after OAuth completes (with tokens)
   */
  getGoogleAuthUrl(returnUrl?: string): string {
    const baseUrl = this.api.getBaseUrl();
    const params = returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : "";
    return `${baseUrl}/api/auth/google${params}`;
  }

  /**
   * Get the URL to initiate GitHub OAuth flow.
   * @param returnUrl - The frontend URL to redirect to after OAuth completes (with tokens)
   */
  getGitHubAuthUrl(returnUrl?: string): string {
    const baseUrl = this.api.getBaseUrl();
    const params = returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : "";
    return `${baseUrl}/api/auth/github${params}`;
  }

  private getDeviceInfo(): string {
    return navigator.userAgent;
  }
}
