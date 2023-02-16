export const environment = {
  production: false,
  staging: false,
  type: 'dev',
  baseUrl: 'http://localhost:4200',
  resourceApiURI: 'https://localhost:5001',
  identityApiURI: 'https://dev-ake111aa.eu.auth0.com',
  name: 'dev',
  auth: {
    domain: 'dev-ake111aa.eu.auth0.com',
    authority: 'https://dev-ake111aa.eu.auth0.com',
    client_id: 'Gedxkv33zdFpw4a0ZMlNJab5rkq3BLch',
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
