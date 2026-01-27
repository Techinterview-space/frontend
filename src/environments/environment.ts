export const environment = {
  production: false,
  staging: false,
  isUnderMaintenance: false,
  type: "dev",
  baseUrl: "http://localhost:4200",
  resourceApiURI: "https://api.techinterview.space",
  name: "dev",
  auth: {
    redirectUri: "http://localhost:4200/auth-callback",
    postLogoutRedirectUri: "http://localhost:4200/logout-callback",
  },
  googleAnalytics: {
    imports: [],
  },
};
