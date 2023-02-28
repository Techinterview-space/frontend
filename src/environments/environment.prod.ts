import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';

export const environment = {
  production: true,
  staging: false,
  type: 'prod',
  baseUrl: 'http://techinterview.space',
  resourceApiURI: 'https://api.techinterview.space',
  identityApiURI: 'https://techinterview-space.eu.auth0.com',
  name: '',
  auth: {
    domain: 'techinterview-space.eu.auth0.com',
    authority: 'https://techinterview-space.eu.auth0.com',
    client_id: 'juNFNVr0wy1yayFgM2KTbk8374oP8MDk',
    redirect_uri: 'https://techinterview.space/auth-callback',
    post_logout_redirect_uri: 'https://techinterview.space/logout-callback',
    response_type: 'id_token token',
    scope: 'openid profile name given_name family_name email nickname',
    filterProtocolClaims: true,
    loadUserInfo: true,
    automaticSilentRenew: true,
    silent_redirect_uri: 'https://techinterview.space/silent-refresh.html'
  },
  googleAnalytics: {
    imports: [NgxGoogleAnalyticsModule.forRoot('G-2FHW1CTS63'), NgxGoogleAnalyticsRouterModule]
  }
};
