import { Alert } from '../models/alert.model';
import { Subject } from 'rxjs';

export interface IAlertService {
  readonly onAlert$: Subject<Alert>;
  readonly onAlertsClear$: Subject<void>;

  success(message: string, keepAfterRouteChange: boolean): void;
  error(message: string, keepAfterRouteChange: boolean): void;
  info(message: string, keepAfterRouteChange: boolean): void;
  warn(message: string, keepAfterRouteChange: boolean): void;
  alert(alert: Alert): void;
  clear(): void;
}
