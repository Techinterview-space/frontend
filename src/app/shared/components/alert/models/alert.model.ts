import { AlertType } from './alert-type.model';

export class Alert {
  constructor(
    public readonly message: string,
    public readonly type: AlertType,
    public readonly keepAfterRouteChange: boolean = false
  ) {}
}
