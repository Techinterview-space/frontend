import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';

export const environment = {
  production: true,
  staging: false,
  type: 'prod',
  baseUrl: 'http://techinterview.space',
  resourceApiURI: 'https://api.techinterview.space',
  identityApiURI: 'https://sso.techinterview.space',
  name: '',
  auth: {
    domain: 'dev-ake111aa.eu.auth0.com',
    authority: 'https://dev-ake111aa.eu.auth0.com',
    client_id: 'core_spa',
    redirect_uri: 'https://techinterview.space/auth-callback',
    post_logout_redirect_uri: 'https://techinterview.space/logout-callback',
    response_type: 'id_token token',
    scope: 'openid profile email core.api',
    filterProtocolClaims: true,
    loadUserInfo: true,
    automaticSilentRenew: true,
    silent_redirect_uri: 'https://techinterview.space/silent-refresh.html'
  },
  googleAnalytics: {
    imports: [NgxGoogleAnalyticsModule.forRoot('G-2FHW1CTS63'), NgxGoogleAnalyticsRouterModule]
  }
};
