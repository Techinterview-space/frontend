import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "@shared/services/auth/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { TotpService } from "@services/totp.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";

@Component({
  templateUrl: "./auth-callback.component.html",
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
    private readonly totpService: TotpService
  ) {}

  ngOnInit(): void {
    // TODO Maxim: check for implementation. What should we do if no error exists?
    // check for error
    if (
      this.route.snapshot.fragment &&
      this.route.snapshot.fragment.indexOf("error") >= 0
    ) {
      this.showErrorBlock = true;
      this.showMfaBlock = false;
      this.showInfoblock = false;
      return;
    }

    this.authService
      .completeAuthentication()
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        if (x.isMfaEnabled) {
          this.showMfaBlock = true;
          this.showInfoblock = false;
        } else {
          this.showInfoblock = true;

          this.authService.getCurrentUser().subscribe((user) => {
            this.redirectToMainPageOrUrl();
          });
        }
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

        this.authService.getCurrentUser().subscribe((user) => {
          this.redirectToMainPageOrUrl();
        });
      }

      this.showInfoblock = false;
      this.showTotpInvalid = true;
      this.totpCodeSent = false;
    });
  }

  private redirectToMainPageOrUrl(): void {
    if (this.cookieService.check("url")) {
      const url = this.cookieService.get("url") ?? "";
      this.cookieService.delete("url");

      if (url.includes("?")) {
        this.router.navigateByUrl(url);
      } else {
        this.router.navigate([url]);
      }
    } else {
      this.router.navigate([this.urlToRedirectAfterLogin]);
    }
  }

  ngOnDestroy(): void {}
}
