import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  AdminDashboardResponse,
  AdminDashboardService,
} from "@modules/admin/services/admin-dashboard.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";

@Component({
  templateUrl: "./admin-start-page.component.html",
  styleUrls: ["./admin-start-page.component.scss"],
  standalone: false,
})
export class AdminStartPageComponent implements OnInit, OnDestroy {
  dashboardData: AdminDashboardResponse | null = null;

  constructor(private dashboardService: AdminDashboardService) {}

  ngOnInit(): void {
    this.dashboardService
      .getDashboard()
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.dashboardData = x;
      });
  }

  ngOnDestroy(): void {
    // ignore
  }
}
