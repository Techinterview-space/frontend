import { Injectable, inject } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateFn,
} from "@angular/router";
import { AuthService } from "../services/auth/auth.service";
import { CookieService } from "ngx-cookie-service";

// https://stackoverflow.com/a/76107558
@Injectable({
  providedIn: "root",
})
export class PermissionsService {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    if (state !== null && state.url != null) {
      // set expire date + 10 hours
      console.log("Url to redirect", state.url);
      this.cookieService.set("url", state.url, Date.now(), "/");
    }

    this.router.navigateByUrl("/login");
    return false;
  }
}

// TODO mgorbatyuk: replace with this implementation
export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): boolean => {
  return inject(PermissionsService).canActivate(next, state);
};
