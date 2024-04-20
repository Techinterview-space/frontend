import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "../services/auth/auth.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApplicationUserExtended } from "@models/extended";

@Injectable()
export class ActiveUserGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService
      .getCurrentUser()
      .pipe(map((user) => this.canActiveteInternal(user)));
  }

  // public for test purpose
  canActiveteInternal(user: ApplicationUserExtended | null): boolean {
    return user != null && user.isActive;
  }
}
