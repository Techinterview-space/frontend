import { Component, OnInit, OnDestroy } from "@angular/core";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { Alert } from "../models/alert.model";
import { AlertType } from "../models/alert-type.model";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"],
  standalone: false,
})
export class AlertComponent implements OnInit, OnDestroy {
  alerts: Array<Alert> = [];
  private timer: number | null = null;

  constructor(private readonly alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.onAlert$.pipe(untilDestroyed(this)).subscribe((x) => {
      this.alerts.push(x);
      this.timer = window.setTimeout(() => this.removeAlert(x), 3000);
    });

    this.alertService.onAlertsClear$
      .pipe(untilDestroyed(this))
      .subscribe(() => (this.alerts = []));
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnDestroy(): void {
    // Required for untilDestroyed
  }

  removeAlert(alert: Alert): void {
    // remove specified alert from array
    this.alerts = this.alerts.filter((x) => x !== alert);
  }

  cssClass(alert: Alert): string {
    if (!alert) {
      return "";
    }

    // return css class based on alert type
    switch (alert.type) {
      case AlertType.Success:
        return "alert-success";
      case AlertType.Error:
        return "alert-danger";
      case AlertType.Info:
        return "alert-info";
      case AlertType.Warning:
        return "alert-warning";
    }
  }

  clearTimeout(): void {
    window.clearTimeout(this.timer!);
  }
}
