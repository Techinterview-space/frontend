import { GoogleAnalyticsService } from "ngx-google-analytics";

export class MockGoogleAnalyticsService extends GoogleAnalyticsService {
    override gtag(...args: any[]): void {
        return;
    }
}
