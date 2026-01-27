export const environment = {
  production: true,
  staging: true,
  isUnderMaintenance: false,
  type: "staging",
  baseUrl: "http://localhost:4200",
  resourceApiURI: "https://api.techinterview.space",
  name: "staging",
  auth: {
    redirectUri: "http://localhost:4200/auth-callback",
    postLogoutRedirectUri: "http://localhost:4200/logout-callback",
  },
  googleAnalytics: {
    imports: [],
  },
};
