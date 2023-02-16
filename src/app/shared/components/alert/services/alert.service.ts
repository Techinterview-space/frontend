import { Injectable } from '@angular/core';
import { Alert } from '../models/alert.model';
import { Subject } from 'rxjs';
import { Router, NavigationStart, Event } from '@angular/router';
import { IAlertService } from './i-alert.service';
import { AlertType } from '../models/alert-type.model';

// copied from
// https://jasonwatmore.com/post/2019/07/05/angular-8-alert-toaster-notifications
@Injectable()
export class AlertService implements IAlertService {
  public readonly onAlert$: Subject<Alert> = new Subject();
  public readonly onAlertsClear$: Subject<void> = new Subject();

  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert messages
          this.clear();
        }
      }
    });
  }

  success(message: string, keepAfterRouteChange: boolean = false): void {
    this.alert(new Alert(message, AlertType.Success, keepAfterRouteChange));
  }

  error(message: string, keepAfterRouteChange: boolean = false): void {
    this.alert(new Alert(message, AlertType.Error, keepAfterRouteChange));
  }

  info(message: string, keepAfterRouteChange: boolean = false): void {
    this.alert(new Alert(message, AlertType.Info, keepAfterRouteChange));
  }

  warn(message: string, keepAfterRouteChange: boolean = false): void {
    this.alert(new Alert(message, AlertType.Warning, keepAfterRouteChange));
  }

  /**
   * main alert method
   * @param alert Alert instance
   */
  alert(alert: Alert): void {
    this.keepAfterRouteChange = alert.keepAfterRouteChange;
    this.onAlert$.next(alert);
  }

  /**
   * Clear all alerts.
   */
  clear(): void {
    this.onAlertsClear$.next();
  }
}
