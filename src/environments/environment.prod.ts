import {
  NgxGoogleAnalyticsModule,
  NgxGoogleAnalyticsRouterModule,
} from "ngx-google-analytics";

export const environment = {
  production: true,
  staging: false,
  isUnderMaintenance: false,
  type: "prod",
  baseUrl: "https://techinterview.space",
  resourceApiURI: "https://api.techinterview.space",
  name: "",
  auth: {
    redirectUri: "https://techinterview.space/auth-callback",
    postLogoutRedirectUri: "https://techinterview.space/logout-callback",
  },
  googleAnalytics: {
    imports: [
      NgxGoogleAnalyticsModule.forRoot("G-6GS9Y7GJD3"),
      NgxGoogleAnalyticsRouterModule,
    ],
  },
};
