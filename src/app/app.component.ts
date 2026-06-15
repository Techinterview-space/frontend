import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { WebMcpService } from "@services/web-mcp.service";
import { VisitorAnalyticsService } from "@services/visitor-analytics.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: false,
})
export class AppComponent implements OnInit {
  get showAdminNavbar(): boolean {
    return this.router.url.startsWith("/admin");
  }

  constructor(
    private readonly router: Router,
    private readonly webMcp: WebMcpService,
    private readonly visitorAnalytics: VisitorAnalyticsService,
  ) {}

  ngOnInit(): void {
    this.webMcp.register();
    this.visitorAnalytics.init();
  }
}
