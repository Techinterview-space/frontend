export const environment = {
  production: false,
  staging: false,
  isUnderMaintenance: false,
  type: "local",
  baseUrl: "http://localhost:4200",
  resourceApiURI: "https://localhost:5001",
  name: "local",
  auth: {
    redirectUri: "http://localhost:4200/auth-callback",
    postLogoutRedirectUri: "http://localhost:4200/logout-callback",
  },
  googleAnalytics: {
    imports: [],
  },
};
