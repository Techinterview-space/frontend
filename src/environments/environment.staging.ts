export const environment = {
  production: false,
  staging: true,
  type: 'staging',
  baseUrl: 'http://qa.techinterview.space',
  resourceApiURI: 'https://qa.api.techinterview.space',
  identityApiURI: 'https://dev-ake111aa.eu.auth0.com',
  name: 'staging',
  auth: {
    domain: 'dev-ake111aa.eu.auth0.com',
    authority: 'https://dev-ake111aa.eu.auth0.com',
    client_id: 'Gedxkv33zdFpw4a0ZMlNJab5rkq3BLch',
    redirect_uri: 'https://qa.techinterview.space/auth-callback',
    post_logout_redirect_uri: 'https://qa.techinterview.space/logout-callback',
    response_type: 'id_token token',
    scope: 'openid profile name given_name family_name email nickname',
    filterProtocolClaims: true,
    loadUserInfo: true,
    automaticSilentRenew: true,
    silent_redirect_uri: 'https://qa.techinterview.space/silent-refresh.html'
  },
  googleAnalytics: {
    imports: []
  }
};
