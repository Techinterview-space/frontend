import { Injectable, PLATFORM_ID, Inject } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

export interface StoredTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

@Injectable({
  providedIn: "root",
})
export class TokenStorageService {
  private readonly ACCESS_TOKEN_KEY = "ti_access_token";
  private readonly REFRESH_TOKEN_KEY = "ti_refresh_token";
  private readonly EXPIRES_AT_KEY = "ti_expires_at";

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  setTokens(accessToken: string, refreshToken: string, expiresIn: number): void {
    if (!this.isBrowser) {
      return;
    }

    const expiresAt = Date.now() + expiresIn * 1000;
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(this.EXPIRES_AT_KEY, expiresAt.toString());
  }

  getAccessToken(): string | null {
    if (!this.isBrowser) {
      return null;
    }
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    if (!this.isBrowser) {
      return null;
    }
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  getExpiresAt(): number | null {
    if (!this.isBrowser) {
      return null;
    }
    const value = localStorage.getItem(this.EXPIRES_AT_KEY);
    return value ? parseInt(value, 10) : null;
  }

  getStoredTokens(): StoredTokens | null {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();
    const expiresAt = this.getExpiresAt();

    if (!accessToken || !refreshToken || !expiresAt) {
      return null;
    }

    return { accessToken, refreshToken, expiresAt };
  }

  clearTokens(): void {
    if (!this.isBrowser) {
      return;
    }
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.EXPIRES_AT_KEY);
  }

  isTokenExpired(): boolean {
    const expiresAt = this.getExpiresAt();
    if (!expiresAt) {
      return true;
    }
    // Consider token expired 60 seconds before actual expiry for safety
    return Date.now() >= expiresAt - 60000;
  }

  isTokenExpiringSoon(): boolean {
    const expiresAt = this.getExpiresAt();
    if (!expiresAt) {
      return true;
    }
    // Token is expiring soon if less than 5 minutes remain
    return Date.now() >= expiresAt - 300000;
  }

  hasValidToken(): boolean {
    return this.getAccessToken() !== null && !this.isTokenExpired();
  }
}
