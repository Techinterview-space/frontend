import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "../services/auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot | null,
    state: RouterStateSnapshot | null,
  ): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    if (state !== null && state.url != null) {
      // set expire date + 10 hours
      this.cookieService.set("url", state.url, Date.now(), "/");
    }

    this.router.navigateByUrl("/login");
    return false;
  }
}
