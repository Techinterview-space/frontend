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

  ngOnDestroy(): void {}

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
        return "bg-green-50 border-green-400 text-green-800";
      case AlertType.Error:
        return "bg-red-50 border-red-400 text-red-800";
      case AlertType.Info:
        return "bg-cyan-50 border-cyan-400 text-cyan-800";
      case AlertType.Warning:
        return "bg-amber-50 border-amber-400 text-amber-800";
    }
  }

  clearTimeout(): void {
    window.clearTimeout(this.timer!);
  }
}
