import { IAlertService } from './i-alert.service';
import { Subject } from 'rxjs';
import { Alert } from '../models/alert.model';

export class AlertStubService implements IAlertService {
  readonly onAlert$: Subject<Alert>;
  readonly onAlertsClear$: Subject<void>;

  success(message: string, keepAfterRouteChange: boolean): void {
    console.log(message);
  }

  error(message: string, keepAfterRouteChange: boolean): void {
    console.log(message);
  }

  info(message: string, keepAfterRouteChange: boolean): void {
    console.log(message);
  }

  warn(message: string, keepAfterRouteChange: boolean): void {
    console.log(message);
  }

  alert(alert: Alert): void {}
  clear(): void {}
}
