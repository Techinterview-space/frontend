import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "@shared/services/auth/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { TotpService } from "@services/totp.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";

@Component({
  templateUrl: "./auth-callback.component.html",
  standalone: false,
})
export class AuthCallbackComponent implements OnInit, OnDestroy {
  private readonly urlToRedirectAfterLogin = "/me";

  showErrorBlock = false;
  showInfoblock = true;
  showMfaBlock = false;

  showTotpInvalid = false;
  totpCode = "";
  totpCodeSent = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly cookieService: CookieService,
    private readonly totpService: TotpService,
  ) {}

  ngOnInit(): void {
    // Debug logging
    console.log("[AuthCallback] Component initialized");
    console.log("[AuthCallback] Full URL:", window.location.href);
    console.log(
      "[AuthCallback] Query params:",
      this.route.snapshot.queryParams,
    );
    console.log("[AuthCallback] URL fragment:", this.route.snapshot.fragment);

    // Check for error in URL fragment
    if (
      this.route.snapshot.fragment &&
      this.route.snapshot.fragment.indexOf("error") >= 0
    ) {
      console.log("[AuthCallback] Error found in URL fragment");
      this.showErrorBlock = true;
      this.showMfaBlock = false;
      this.showInfoblock = false;
      return;
    }

    if (this.route.snapshot.queryParams == null) {
      // Tests are running
      return;
    }

    // Check for error in query params
    const error = this.route.snapshot.queryParams["error"];
    if (error) {
      console.log("[AuthCallback] Error found in query params:", error);
      this.showErrorBlock = true;
      this.showMfaBlock = false;
      this.showInfoblock = false;
      return;
    }

    // Try to get tokens from query params first
    let accessToken = this.route.snapshot.queryParams["access_token"];
    let refreshToken = this.route.snapshot.queryParams["refresh_token"];
    let expiresIn = this.route.snapshot.queryParams["expires_in"] ?? "3600";

    console.log("[AuthCallback] Tokens from query params:", {
      accessToken: !!accessToken,
      refreshToken: !!refreshToken,
      expiresIn,
    });

    // If not in query params, check URL fragment (hash)
    if (!accessToken && this.route.snapshot.fragment) {
      console.log("[AuthCallback] Checking URL fragment for tokens...");
      const fragmentParams = this.parseFragment(this.route.snapshot.fragment);
      console.log("[AuthCallback] Parsed fragment params:", fragmentParams);

      accessToken = fragmentParams["access_token"];
      refreshToken = fragmentParams["refresh_token"];
      expiresIn = fragmentParams["expires_in"] ?? "3600";

      console.log("[AuthCallback] Tokens from fragment:", {
        accessToken: !!accessToken,
        refreshToken: !!refreshToken,
        expiresIn,
      });
    }

    // Also check window.location.hash directly (Angular might not parse it)
    if (!accessToken && window.location.hash) {
      console.log(
        "[AuthCallback] Checking window.location.hash:",
        window.location.hash,
      );
      const hashParams = this.parseFragment(window.location.hash.substring(1));
      console.log("[AuthCallback] Parsed hash params:", hashParams);

      accessToken = hashParams["access_token"];
      refreshToken = hashParams["refresh_token"];
      expiresIn = hashParams["expires_in"] ?? "3600";
    }

    // Also check window.location.search directly
    if (!accessToken && window.location.search) {
      console.log(
        "[AuthCallback] Checking window.location.search:",
        window.location.search,
      );
      const searchParams = new URLSearchParams(window.location.search);
      console.log("[AuthCallback] Parsed search params:", searchParams);

      accessToken = searchParams.get("access_token") || null;
      refreshToken = searchParams.get("refresh_token") || null;
      expiresIn = searchParams.get("expires_in") || "3600";
      console.log("[AuthCallback] Tokens from search:", {
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresIn: expiresIn,
      });
    }

    if (accessToken && refreshToken && expiresIn) {
      console.log(
        "[AuthCallback] Valid tokens found, handling OAuth callback...",
      );
      this.handleOAuthTokens(
        accessToken,
        refreshToken,
        parseInt(expiresIn, 10),
      );
      return;
    }

    console.log("[AuthCallback] No tokens found, trying legacy flow...");
    // Legacy flow - check if tokens already exist
    this.authService
      .completeAuthentication()
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        console.log("[AuthCallback] completeAuthentication result:", x);
        if (x.isMfaEnabled) {
          this.showMfaBlock = true;
          this.showInfoblock = false;
        } else {
          this.showMfaBlock = false;
          this.showInfoblock = true;

          this.authService.getCurrentUserFromBackend().subscribe((_user) => {
            this.redirectToMainPageOrUrl();
          });
        }
      });
  }

  private parseFragment(fragment: string): { [key: string]: string } {
    const params: { [key: string]: string } = {};
    if (!fragment) return params;

    const pairs = fragment.split("&");
    for (const pair of pairs) {
      const [key, value] = pair.split("=");
      if (key && value) {
        params[decodeURIComponent(key)] = decodeURIComponent(value);
      }
    }
    return params;
  }

  private handleOAuthTokens(
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
  ): void {
    console.log(
      "[AuthCallback] handleOAuthTokens called with expiresIn:",
      expiresIn,
    );

    this.authService
      .handleOAuthCallback(accessToken, refreshToken, expiresIn)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (user) => {
          console.log(
            "[AuthCallback] handleOAuthCallback success, user:",
            user,
          );
          if (user) {
            // Check if MFA is required
            this.authService
              .completeAuthentication()
              .pipe(untilDestroyed(this))
              .subscribe((totpCheck) => {
                console.log("[AuthCallback] MFA check result:", totpCheck);
                if (totpCheck.isMfaEnabled) {
                  this.showMfaBlock = true;
                  this.showInfoblock = false;
                } else {
                  console.log("[AuthCallback] Redirecting to main page...");
                  this.redirectToMainPageOrUrl();
                }
              });
          } else {
            console.log("[AuthCallback] No user returned, showing error");
            this.showErrorBlock = true;
            this.showInfoblock = false;
          }
        },
        error: (err) => {
          console.error("[AuthCallback] handleOAuthCallback error:", err);
          this.showErrorBlock = true;
          this.showInfoblock = false;
        },
      });
  }

  validateTotp(): void {
    if (this.totpCode == null || this.totpCode.length !== 6) {
      this.showTotpInvalid = true;
      this.totpCodeSent = false;
      return;
    }

    this.totpService.verifyTotp(this.totpCode).subscribe((result) => {
      if (result.result) {
        this.showTotpInvalid = false;
        this.showInfoblock = true;
        this.totpCodeSent = true;

        this.authService.getCurrentUserFromBackend().subscribe((user) => {
          this.redirectToMainPageOrUrl();
        });
      }

      this.showInfoblock = false;
      this.showTotpInvalid = true;
      this.totpCodeSent = false;
    });
  }

  private redirectToMainPageOrUrl(): void {
    const urlInCookies = this.cookieService.get("url") ?? "";

    if (this.cookieService.check("url") || urlInCookies.length > 0) {
      this.cookieService.delete("url");

      if (urlInCookies.includes("?")) {
        this.router.navigateByUrl(urlInCookies);
      } else {
        this.router.navigate([urlInCookies]);
      }
    } else {
      this.router.navigate([this.urlToRedirectAfterLogin]);
    }
  }

  ngOnDestroy(): void {}
}
