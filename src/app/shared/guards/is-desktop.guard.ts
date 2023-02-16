import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CheckDeviceService } from '@shared/services/check-device/check-device.service';

@Injectable({
  providedIn: 'root'
})
export class IsDesktopGuard implements CanActivate {
  constructor(private readonly checkDevice: CheckDeviceService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !this.checkDevice.isMobile();
  }
}
