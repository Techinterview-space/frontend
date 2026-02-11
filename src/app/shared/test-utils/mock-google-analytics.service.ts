import { Injectable } from "@angular/core";
import { GoogleAnalyticsService } from "ngx-google-analytics";

@Injectable()
export class MockGoogleAnalyticsService extends GoogleAnalyticsService {
  override gtag(..._args: any[]): void {
    return;
  }
}
