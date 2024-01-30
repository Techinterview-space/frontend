import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';

export const environment = {
  production: true,
  staging: false,
  type: 'dev',
  baseUrl: 'http://localhost:4200',
  resourceApiURI: 'https://api.techinterview.space',
  identityApiURI: 'https://techinterview-space.eu.auth0.com',
  name: '',
  auth: {
    domain: 'techinterview-space.eu.auth0.com',
    authority: 'https://techinterview-space.eu.auth0.com',
    client_id: 'juNFNVr0wy1yayFgM2KTbk8374oP8MDk',
    redirect_uri: 'http://localhost:4200/auth-callback',
    post_logout_redirect_uri: 'http://localhost:4200/logout-callback',
    response_type: 'id_token token',
    scope: 'openid profile name given_name family_name email nickname',
    filterProtocolClaims: true,
    loadUserInfo: true,
    automaticSilentRenew: true,
    silent_redirect_uri: 'http://localhost:4200/silent-refresh.html'
  },
  googleAnalytics: {
    imports: []
  }
};
