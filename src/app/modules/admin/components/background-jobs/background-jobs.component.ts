import { Component, OnInit } from "@angular/core";
import { TitleService } from "@services/title.service";
import { HealthCheckService } from "@shared/health-check/health-check.service";
import { AuthService } from "@shared/services/auth/auth.service";
import { HealthCheckItem } from "../health-check-table/health-check-item";
import { JobItem } from "../jobs-table/job-item";

@Component({
  selector: "app-background-jobs",
  templateUrl: "./background-jobs.component.html",
  styleUrls: ["./background-jobs.component.scss"],
})
export class BackgroundJobsComponent implements OnInit {
  authorizationToken: string | null = null;
  healthCheckItems: Array<HealthCheckItem> = [];

  constructor(
    private readonly authService: AuthService,
    private readonly titleService: TitleService,
    private readonly healthCheckService: HealthCheckService
  ) {}

  ngOnInit(): void {
    this.authorizationToken = this.authService.getAuthorizationHeaderValue();

    this.healthCheckItems = [
      new HealthCheckItem("API", "API для запросов", () =>
        this.healthCheckService.backend()
      ),
    ];

    this.titleService.setTitle("Инструменты");
    this.checkHealth();
  }

  checkHealth(): void {
    this.healthCheckItems.forEach((x) => x.execute());
  }
}
