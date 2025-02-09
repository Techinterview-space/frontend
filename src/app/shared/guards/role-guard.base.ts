import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "@shared/services/auth/auth.service";
import { UserRole } from "@models/enums";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export abstract class RoleGuardBase implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  protected abstract roleToCheck(): UserRole;

  canActivate(
    route: ActivatedRouteSnapshot | null,
    state: RouterStateSnapshot | null,
  ): Observable<boolean> {
    return this.authService.getCurrentUser().pipe(
      map((user) => {
        const hasAdminPermissions =
          user != null && user.hasRole(this.roleToCheck());
        if (!hasAdminPermissions) {
          this.router.navigateByUrl("not-permission");
          return false;
        }
        return true;
      }),
    );
  }
}
