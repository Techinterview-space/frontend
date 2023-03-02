import { Injectable } from '@angular/core';
import { AuthService, IdToken, User } from '@auth0/auth0-angular';
import { environment } from '@environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OidcUserManager {
  constructor(private readonly auth: AuthService) {}

  signout(): Promise<void> {
    return this.auth.logout({
      logoutParams: { returnTo: environment.auth.post_logout_redirect_uri }
    }).toPromise();
  }

  login(): Promise<void> {
    return this.auth.loginWithRedirect().toPromise();
  }

  completeAuthentication(): Observable<IdToken | null | undefined> {
    return this.auth!.idTokenClaims$;
  }
}
